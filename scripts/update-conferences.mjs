#!/usr/bin/env node
/**
 * Builds data/conferences.json from public sources.
 *
 *   node scripts/update-conferences.mjs            fetch and write the file if it changed
 *   node scripts/update-conferences.mjs --check    fetch only; exit 1 if the file would change
 *
 * Sources, applied in this order:
 *   1. profile.heelim.com: cfp.json, conf_info.json, conf_order.json (deadlines, dates, domains, display order)
 *   2. ccfddl/ccf-deadlines: one YAML per venue, for venues listed under extraFromCcf in data/conference-config.json
 *   3. Pusnow gist "CS 분야 우수 학술대회 목록": KIISE 2024 tier, BK21+ IF (2018), KAIST/SNU/POSTECH lists, full names
 *   4. data/conference-overrides.json: manual corrections, merged last
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import YAML from "yaml"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const dataDir = path.join(root, "data")
const outFile = path.join(dataDir, "conferences.json")
const checkOnly = process.argv.includes("--check")

const SRC = {
  heelim: "https://profile.heelim.com/",
  ccf: "https://raw.githubusercontent.com/ccfddl/ccf-deadlines/main/conference/",
  tiers:
    "https://gist.githubusercontent.com/Pusnow/6eb933355b5cb8d31ef1abcb3c3e1206/raw/CS%20%EB%B6%84%EC%95%BC%20%EC%9A%B0%EC%88%98%20%ED%95%99%EC%88%A0%EB%8C%80%ED%9A%8C%20%EB%AA%A9%EB%A1%9D.csv",
}

const config = JSON.parse(fs.readFileSync(path.join(dataDir, "conference-config.json"), "utf8"))
const overrides = JSON.parse(fs.readFileSync(path.join(dataDir, "conference-overrides.json"), "utf8"))

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": "seongho-git.github.io conference updater" } })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.text()
}
const fetchJson = async (url) => JSON.parse(await fetchText(url))

// Helpers
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const MONTH_IDX = Object.fromEntries(MONTHS.flatMap((m, i) => [[m.toLowerCase(), i], [m.slice(0, 3).toLowerCase(), i]]))
MONTH_IDX.sept = 8

const pad = (n) => String(n).padStart(2, "0")
const iso = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`

/** Parses "Oct 31 - Nov 4, 2027", "June 5-11, 2027", or "June 2027" into ISO {start, end}; nulls when unparseable. */
function parseDateRange(text, year) {
  if (!text) return { start: null, end: null }
  const t = text.replace(/–|—/g, "-").replace(/\s+/g, " ").trim()
  if (/^tb[ad]$/i.test(t)) return { start: null, end: null }
  const y = (t.match(/(\d{4})/) || [])[1] ? Number(t.match(/(\d{4})/)[1]) : year
  // "Month D - Month D, YYYY"
  let m = t.match(/^([A-Za-z]+)\.? (\d{1,2}) ?- ?([A-Za-z]+)\.? (\d{1,2})/)
  if (m && MONTH_IDX[m[1].toLowerCase()] !== undefined && MONTH_IDX[m[3].toLowerCase()] !== undefined) {
    return { start: iso(y, MONTH_IDX[m[1].toLowerCase()], +m[2]), end: iso(y, MONTH_IDX[m[3].toLowerCase()], +m[4]) }
  }
  // "Month D-D, YYYY" or "Month D, YYYY"
  m = t.match(/^([A-Za-z]+)\.? (\d{1,2})(?: ?- ?(\d{1,2}))?/)
  if (m && MONTH_IDX[m[1].toLowerCase()] !== undefined) {
    const mi = MONTH_IDX[m[1].toLowerCase()]
    return { start: iso(y, mi, +m[2]), end: iso(y, mi, +(m[3] || m[2])) }
  }
  // "Month YYYY" or "Month-Month, YYYY"
  m = t.match(/^([A-Za-z]+)(?:\.?-([A-Za-z]+))?,? \d{4}$/)
  if (m && MONTH_IDX[m[1].toLowerCase()] !== undefined) {
    const mi = MONTH_IDX[m[1].toLowerCase()]
    const me = m[2] && MONTH_IDX[m[2].toLowerCase()] !== undefined ? MONTH_IDX[m[2].toLowerCase()] : mi
    return { start: iso(y, mi, 1), end: iso(y, me, new Date(y, me + 1, 0).getDate()), approximate: true }
  }
  return { start: null, end: null }
}

const isIsoDate = (s) => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s)
const dateOnly = (s) => (typeof s === "string" ? s.slice(0, 10) : null)

function parseCsv(text) {
  const rows = []
  let row = [], field = "", quoted = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++ }
      else if (c === '"') quoted = false
      else field += c
    } else if (c === '"') quoted = true
    else if (c === ",") { row.push(field); field = "" }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = "" }
    else if (c !== "\r") field += c
  }
  if (field || row.length) { row.push(field); rows.push(row) }
  const [head, ...body] = rows
  return body.filter((r) => r.length === head.length).map((r) => Object.fromEntries(head.map((h, i) => [h.trim(), r[i].trim()])))
}

// 1. Tier list (KIISE / BK21+ / KAIST / SNU / POSTECH)
function buildTierIndex(csvText) {
  const rows = parseCsv(csvText)
  const col = (r, prefix) => Object.entries(r).find(([k]) => k.startsWith(prefix))?.[1] ?? ""
  const entries = rows.map((r) => ({
    key: r["약자"],
    base: r["약자"].replace(/\s*\((oral|spotlight|poster)\)\s*$/i, ""),
    variant: (r["약자"].match(/\((oral|spotlight|poster)\)/i) || [])[1]?.toLowerCase() || null,
    kiise: col(r, "한국정보과학회") || null,
    bk21plus: col(r, "BK21") ? Number(col(r, "BK21")) : null,
    kaist: col(r, "KAIST") === "O",
    snu: col(r, "SNU") === "O",
    postech: col(r, "POSTECH") || null,
    fullName: r["학회명"]?.replace(/&#38;/g, "&").replace(/&amp;/g, "&") || null,
    dblp: r["DBLP Key"] || null,
  }))
  const byBase = new Map()
  for (const e of entries) {
    const list = byBase.get(e.base.toUpperCase()) || []
    list.push(e)
    byBase.set(e.base.toUpperCase(), list)
  }
  const byAcronymInName = entries.map((e) => ({ e, acr: (e.fullName?.match(/\(([^()]+)\)\s*(?:\((?:oral|spotlight|poster)\))?$/) || [])[1] }))
  return { byBase, byAcronymInName }
}

function lookupTier(index, name) {
  const alias = config.tierAliases[name] || name
  let list = index.byBase.get(alias.toUpperCase()) || index.byBase.get(name.toUpperCase())
  if (!list) {
    const hit = index.byAcronymInName.filter(({ acr }) => acr && acr.toUpperCase() === alias.toUpperCase()).map(({ e }) => e)
    if (hit.length) list = hit
  }
  if (!list || !list.length) return null
  // Use the plain row, else the "oral" row; keep per-variant values (oral/spotlight/poster) alongside.
  const plain = list.find((e) => !e.variant)
  const oral = list.find((e) => e.variant === "oral")
  const main = plain || oral || list[0]
  const variants = list.filter((e) => e.variant).map((e) => ({ variant: e.variant, kiise: e.kiise, bk21plus: e.bk21plus }))
  return {
    kiise: main.kiise,
    bk21plus: main.bk21plus,
    kaist: main.kaist,
    snu: main.snu,
    postech: main.postech,
    fullName: main.fullName?.replace(/\s*\((oral|spotlight|poster)\)\s*$/i, "") || null,
    dblp: main.dblp,
    variants: variants.length ? variants : undefined,
  }
}

// 2. profile.heelim.com data
const SHARED_KEYS = new Set(["date", "start_date", "finish_date", "url", "location"])

function venuesFromHeelim(cfp, info) {
  const venues = []
  for (const [rawName, years] of Object.entries(cfp)) {
    const name = config.renames[rawName] || rawName
    const meta = info[rawName] || {}
    const editions = []
    for (const [yearStr, yd] of Object.entries(years)) {
      const year = Number(yearStr)
      const parsed = parseDateRange(yd.date, year)
      const cycles = []
      for (const [key, c] of Object.entries(yd)) {
        if (SHARED_KEYS.has(key) || typeof c !== "object") continue
        cycles.push({
          name: key === "none" ? null : key.replace(/^Estimated\s*\(?|\)$/g, "").trim() || null,
          deadline: isIsoDate(c.deadline) ? c.deadline : null,
          abstractDeadline: isIsoDate(c.abstract_deadline) ? c.abstract_deadline : null,
          notification: isIsoDate(c.notification) ? c.notification : null,
          estimated: /estimated/i.test(key) || c.is_verified === false,
          verified: c.is_verified === true,
        })
      }
      cycles.sort((a, b) => (a.deadline || "9999").localeCompare(b.deadline || "9999"))
      editions.push({
        year,
        dateText: yd.date && !/^tb[ad]$/i.test(yd.date) ? yd.date : null,
        startDate: isIsoDate(yd.start_date) ? yd.start_date : parsed.start,
        endDate: isIsoDate(yd.finish_date) ? yd.finish_date : parsed.end,
        approximateDate: parsed.approximate || false,
        location: yd.location || null,
        url: yd.url || null,
        cycles,
      })
    }
    editions.sort((a, b) => a.year - b.year)
    venues.push({
      name,
      fullName: null,
      domains: meta.domains || [],
      keywords: meta.keywords || [],
      kiise: meta.kiise || null,
      bk21plus: meta.bk21plus ? Number(meta.bk21plus) : null,
      url: editions.at(-1)?.url || null,
      editions,
      source: "heelim",
    })
  }
  return venues
}

// 3. ccf-deadlines extras
async function venuesFromCcf() {
  const out = []
  for (const extra of config.extraFromCcf) {
    try {
      const doc = YAML.parse(await fetchText(SRC.ccf + extra.path))[0]
      const editions = (doc.confs || []).map((c) => {
        const parsed = parseDateRange(c.date, c.year)
        const cycles = (c.timeline || []).map((t) => ({
          name: t.comment || null,
          deadline: dateOnly(t.deadline),
          abstractDeadline: dateOnly(t.abstract_deadline),
          notification: null,
          estimated: false,
          verified: true,
          timezone: c.timezone || null,
        }))
        return {
          year: c.year,
          dateText: c.date || null,
          startDate: parsed.start,
          endDate: parsed.end,
          approximateDate: parsed.approximate || false,
          location: c.place || null,
          url: c.link || null,
          cycles,
        }
      })
      out.push({
        name: extra.name,
        fullName: extra.fullName || doc.description || null,
        domains: extra.domains || [],
        keywords: [],
        kiise: null,
        bk21plus: null,
        url: editions.at(-1)?.url || null,
        editions,
        source: "ccf-deadlines",
        ccfRank: doc.rank || null,
      })
    } catch (err) {
      console.warn(`warn: skipping ${extra.name}: ${err.message}`)
    }
  }
  return out
}

// 4. Merge
function deepMerge(target, patch) {
  if (Array.isArray(patch) || typeof patch !== "object" || patch === null) return patch
  const out = { ...target }
  for (const [k, v] of Object.entries(patch)) {
    if (k === "$comment") continue
    out[k] = typeof v === "object" && v !== null && !Array.isArray(v) && typeof out[k] === "object" ? deepMerge(out[k], v) : v
  }
  return out
}

async function main() {
  const [cfp, info, order, updated, tiersCsv, ccfVenues] = await Promise.all([
    fetchJson(SRC.heelim + "cfp.json"),
    fetchJson(SRC.heelim + "conf_info.json"),
    fetchJson(SRC.heelim + "conf_order.json").catch(() => []),
    fetchText(SRC.heelim + "last.updated").then((s) => s.trim()).catch(() => null),
    fetchText(SRC.tiers),
    venuesFromCcf(),
  ])

  const tiers = buildTierIndex(tiersCsv)
  const categoryOf = new Map()
  config.categories.forEach((cat, ci) => cat.venues.forEach((v, vi) => categoryOf.set(v, { name: cat.name, order: ci * 1000 + vi })))
  const heelimOrder = new Map(order.map((v, i) => [config.renames[v] || v, i]))

  let venues = [...venuesFromHeelim(cfp, info), ...ccfVenues]
  venues = venues.map((v) => {
    const tier = lookupTier(tiers, v.name)
    const cat = categoryOf.get(v.name)
    const merged = {
      id: v.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: v.name,
      fullName: v.fullName || tier?.fullName || null,
      category: cat?.name || "Other",
      domains: v.domains,
      keywords: v.keywords,
      // Tier list wins when it has a row for the venue; otherwise fall back to heelim values.
      kiise: tier ? tier.kiise : v.kiise ?? null,
      bk21plus: tier ? tier.bk21plus : v.bk21plus ?? null,
      tierVariants: tier?.variants,
      lists: tier ? { kaist: tier.kaist, snu: tier.snu, postech: tier.postech } : undefined,
      dblp: tier?.dblp || null,
      url: v.url,
      editions: v.editions,
      source: v.source,
      sortKey: (cat?.order ?? 99999) * 1000 + (heelimOrder.get(v.name) ?? 999),
    }
    // Drop editions that ended before last year; the cutoff changes only once a year, so weekly runs stay stable.
    const cutoff = `${new Date().getFullYear() - 1}-01-01`
    merged.editions = merged.editions.filter((e) => (e.endDate || `${e.year}-12-31`) >= cutoff)
    return overrides[v.name] ? deepMerge(merged, overrides[v.name]) : merged
  })
  venues.sort((a, b) => a.sortKey - b.sortKey || a.name.localeCompare(b.name))

  const result = {
    generatedAt: new Date().toISOString(),
    sources: {
      heelim: { url: SRC.heelim, lastUpdated: updated },
      ccfDeadlines: "https://github.com/ccfddl/ccf-deadlines",
      tiers: "https://gist.github.com/Pusnow/6eb933355b5cb8d31ef1abcb3c3e1206",
    },
    categories: config.categories.map((c) => c.name),
    venues,
  }

  const next = JSON.stringify(result, null, 2) + "\n"
  const prev = fs.existsSync(outFile) ? fs.readFileSync(outFile, "utf8") : ""
  const strip = (s) => s.replace(/"generatedAt": "[^"]+",\n/, "")
  const changed = strip(prev) !== strip(next)

  const missingTier = venues.filter((v) => !v.kiise && !v.bk21plus).map((v) => v.name)
  const uncategorized = venues.filter((v) => v.category === "Other").map((v) => v.name)
  console.log(`venues: ${venues.length}, changed: ${changed}`)
  if (missingTier.length) console.log(`no KIISE/BK tier found: ${missingTier.join(", ")}`)
  if (uncategorized.length) console.log(`uncategorized: ${uncategorized.join(", ")}`)

  if (checkOnly) process.exit(changed ? 1 : 0)
  if (changed || !prev) {
    fs.writeFileSync(outFile, next)
    console.log(`wrote ${path.relative(root, outFile)}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
