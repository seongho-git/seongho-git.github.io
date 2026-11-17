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

/** GET with up to three attempts, so one transient network error does not drop a source. */
async function fetchText(url, attempts = 3) {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "seongho-git.github.io conference updater" } })
      if (!res.ok) throw new Error(`${res.status} ${url}`)
      return res.text()
    } catch (err) {
      if (i >= attempts || /^404 /.test(err.message)) throw err
      await new Promise((r) => setTimeout(r, 1000 * i))
    }
  }
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
  let m = t.match(/^([A-Za-z]+)\.? (\d{1,2})(?!\d) ?- ?([A-Za-z]+)\.? (\d{1,2})(?!\d)/)
  if (m && MONTH_IDX[m[1].toLowerCase()] !== undefined && MONTH_IDX[m[3].toLowerCase()] !== undefined) {
    return { start: iso(y, MONTH_IDX[m[1].toLowerCase()], +m[2]), end: iso(y, MONTH_IDX[m[3].toLowerCase()], +m[4]) }
  }
  // "Month D-D, YYYY" or "Month D, YYYY"
  m = t.match(/^([A-Za-z]+)\.? (\d{1,2})(?!\d)(?: ?- ?(\d{1,2})(?!\d))?/)
  if (m && MONTH_IDX[m[1].toLowerCase()] !== undefined) {
    const mi = MONTH_IDX[m[1].toLowerCase()]
    return { start: iso(y, mi, +m[2]), end: iso(y, mi, +(m[3] || m[2])) }
  }
  // "Month YYYY" or "Month-Month, YYYY"
  m = t.match(/^([A-Za-z]+)(?:\.? ?- ?([A-Za-z]+))?,? \d{4}\b/)
  if (m && MONTH_IDX[m[1].toLowerCase()] !== undefined) {
    const mi = MONTH_IDX[m[1].toLowerCase()]
    const me = m[2] && MONTH_IDX[m[2].toLowerCase()] !== undefined ? MONTH_IDX[m[2].toLowerCase()] : mi
    return { start: iso(y, mi, 1), end: iso(y, me, new Date(y, me + 1, 0).getDate()), approximate: true }
  }
  return { start: null, end: null }
}

const cleanLocation = (s) => (typeof s === "string" && s.trim() && !/^(tb[ad]|online only)$/i.test(s.trim()) ? s.trim().replace(/\.$/, "") : null)
const isIsoDate = (s) => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s)
const dateOnly = (s) => (typeof s === "string" && /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(0, 10) : null)

// Deadline time zones
const IANA = {
  PT: "America/Los_Angeles", PST: "America/Los_Angeles", PDT: "America/Los_Angeles",
  MT: "America/Denver", CT: "America/Chicago", ET: "America/New_York", EST: "America/New_York", EDT: "America/New_York",
  CET: "Europe/Paris", CEST: "Europe/Paris", BST: "Europe/London", KST: "Asia/Seoul", JST: "Asia/Tokyo",
}

/** Normalizes a time zone label: "UTC+0" -> "UTC", "utc-12" -> "AoE", "pt" -> "PT". */
function normalizeTz(tz) {
  if (!tz) return null
  const t = String(tz).trim()
  if (/^(aoe|anywhere on earth)$/i.test(t)) return "AoE"
  const m = t.match(/^(?:UTC|GMT)\s*([+-])\s*(\d{1,2})(?::?(\d{2}))?$/i)
  if (m) {
    const mins = +m[2] * 60 + +(m[3] || 0)
    if (mins === 0) return "UTC"
    if (m[1] === "-" && mins === 720) return "AoE"
    return `UTC${m[1]}${+m[2]}${m[3] && m[3] !== "00" ? `:${m[3]}` : ""}`
  }
  if (/^(UTC|GMT|Z)$/i.test(t)) return "UTC"
  if (IANA[t.toUpperCase()]) return t.toUpperCase()
  return null
}

/** Offset of a time zone label from UTC in minutes at the given local date, or null when unknown. */
function tzOffsetMinutes(tz, date) {
  if (tz === "AoE") return -720
  if (tz === "UTC") return 0
  const m = tz.match(/^UTC([+-])(\d{1,2})(?::(\d{2}))?$/)
  if (m) return (m[1] === "-" ? -1 : 1) * (+m[2] * 60 + +(m[3] || 0))
  const zone = IANA[tz]
  if (!zone) return null
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: zone, timeZoneName: "longOffset" }).formatToParts(new Date(`${date}T12:00:00Z`))
  const off = parts.find((p) => p.type === "timeZoneName")?.value.match(/GMT([+-])(\d{2}):(\d{2})/)
  return off ? (off[1] === "-" ? -1 : 1) * (+off[2] * 60 + +off[3]) : 0
}

/**
 * Fills cycle.deadlineAt (UTC ISO instant) from deadline + deadlineTime + timezone.
 * Without a time zone the deadline is left as a date, which the site reads as 23:59 AoE.
 */
/** "Cycle-1" -> "Cycle 1", "R2" -> "Round 2", "fall" -> "Fall"; drops leftover notes such as "CFP March 30". */
function tidyCycleName(name) {
  if (!name) return null
  const s = String(name).trim().replace(/^(cycle|round)-(\d)/i, "$1 $2").replace(/^R(\d)$/, "Round $1")
  if (!s || /^CFP\b/i.test(s)) return null
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function normalizeCycle(c) {
  const out = { ...c }
  out.name = tidyCycleName(out.name)
  out.timezone = out.deadline ? normalizeTz(out.timezone) : null
  if (out.deadlineTime && !/^\d{2}:\d{2}$/.test(out.deadlineTime)) out.deadlineTime = null
  if (out.deadline && out.timezone) {
    const time = out.deadlineTime || "23:59"
    const off = tzOffsetMinutes(out.timezone, out.deadline)
    if (off !== null) {
      const [y, mo, d] = out.deadline.split("-").map(Number)
      const [h, mi] = time.split(":").map(Number)
      const sec = mi === 59 ? 59 : 0
      out.deadlineAt = new Date(Date.UTC(y, mo - 1, d, h, mi, sec) - off * 60000).toISOString()
      out.deadlineTime = time
    }
  }
  if (!out.deadlineAt) {
    delete out.deadlineAt
    out.deadlineTime = null
  }
  return out
}

/** Instant of a cycle deadline; date-only deadlines count as 23:59:59 AoE. */
const deadlineMs = (c) => (c.deadlineAt ? Date.parse(c.deadlineAt) : Date.parse(`${c.deadline}T23:59:59-12:00`))

/** Shortens ccf-deadlines timeline comments into cycle names ("Cycle 1; rebuttal ..." -> "Cycle 1"). */
function cleanCycleName(comment) {
  if (!comment) return null
  let s = String(comment).split(";")[0].trim()
  s = s
    .replace(/^schedule for\s+/i, "")
    .replace(/^(tches)\s+volume\s+/i, "$1 ")
    .replace(/^(tches|tosc),?\s+volume\s+(\d{4}),?\s+issue\s+(\d)/i, (_, j, y, i) => `${j.toUpperCase() === "TOSC" ? "ToSC" : "TCHES"} ${y}/${i}`)
    .replace(/\s*(paper\s+)?submission\s+deadline$/i, "")
    .replace(/\s+deadline$/i, "")
    .replace(/^submission\s+/i, "")
    .trim()
  if (!s || /^(optional abstract|abstract optional|registration|initial cutoff|full-paper dates|regular research paper|full papers?|paper|submission|deadline|tbd)\b/i.test(s)) return null
  return s
}

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
    fullName: main.fullName?.replace(/\s*\((oral|spotlight|poster)\)\s*$/i, "").replace(/\s+/g, " ") || null,
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
      const startDate = isIsoDate(yd.start_date) ? yd.start_date : parsed.start
      let endDate = isIsoDate(yd.finish_date) ? yd.finish_date : parsed.end
      // "March 30-3, 2025" means March 30 - April 3: an end before the start rolls into the next month.
      if (startDate && endDate && endDate < startDate) {
        const [ey, em, ed] = endDate.split("-").map(Number)
        endDate = iso(em === 12 ? ey + 1 : ey, em % 12, ed)
      }
      editions.push({
        year,
        dateText: yd.date && !/^tb[ad]$/i.test(yd.date) ? yd.date : null,
        startDate,
        endDate,
        approximateDate: parsed.approximate || false,
        location: cleanLocation(yd.location),
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
/** Venues whose ccf-deadlines file could not be fetched this run. */
const ccfFailed = new Set()

async function venuesFromCcf() {
  const docs = await Promise.all(
    config.extraFromCcf.map((extra) =>
      fetchText(SRC.ccf + extra.path)
        .then((text) => YAML.parse(text)[0])
        .catch((err) => {
          console.warn(`warn: ${extra.name}: ${err.message}; keeping last week's data`)
          ccfFailed.add(extra.name)
          return null
        }),
    ),
  )
  const out = []
  for (const [i, extra] of config.extraFromCcf.entries()) {
    const doc = docs[i]
    if (!doc) continue
    try {
      const editions = (doc.confs || []).map((c) => {
        const parsed = parseDateRange(c.date, c.year)
        const cycles = (c.timeline || [])
          .map((t) => {
            const deadline = dateOnly(t.deadline)
            const time = typeof t.deadline === "string" ? (t.deadline.match(/ (\d{2}:\d{2})/) || [])[1] : null
            return {
              name: cleanCycleName(t.comment),
              deadline,
              abstractDeadline: dateOnly(t.abstract_deadline),
              notification: null,
              estimated: false,
              verified: true,
              // ccf-deadlines writes AoE midnight as 23:59:59; keep other times as given.
              deadlineTime: deadline ? time || "23:59" : null,
              timezone: c.timezone || null,
            }
          })
          .filter((cy) => cy.deadline || cy.abstractDeadline)
        return {
          year: c.year,
          dateText: c.date || null,
          startDate: parsed.start,
          endDate: parsed.end,
          approximateDate: parsed.approximate || false,
          location: cleanLocation(c.place),
          url: c.link || null,
          cycles,
        }
      })
      editions.sort((a, b) => a.year - b.year)
      out.push({
        name: extra.name,
        fullName: extra.fullName || null,
        description: doc.description || null,
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

// 4. Estimates
const shiftYears = (date, n) => (date ? `${Number(date.slice(0, 4)) + n}${date.slice(4)}` : null)

/**
 * When every known deadline of a venue has passed, adds an estimated next edition by shifting the
 * latest edition with deadlines forward by the venue's cadence. An announced next edition without
 * deadlines (e.g. "TBD") keeps its dates and gets estimated cycles.
 */
function addEstimatedEdition(venue, now) {
  const withDeadlines = venue.editions.filter((e) => e.cycles.some((c) => c.deadline))
  if (!withDeadlines.length) return
  if (venue.editions.some((e) => e.cycles.some((c) => c.deadline && deadlineMs(c) > now))) return
  const base = withDeadlines.at(-1)
  const step = config.cadenceYears?.[venue.name] || 1
  const year = base.year + step
  const cycles = base.cycles
    .filter((c) => c.deadline)
    .map((c) =>
      normalizeCycle({
        ...c,
        deadline: shiftYears(c.deadline, step),
        abstractDeadline: shiftYears(c.abstractDeadline, step),
        notification: shiftYears(c.notification, step),
        estimated: true,
        verified: false,
      }),
    )
  const existing = venue.editions.find((e) => e.year === year)
  if (existing) {
    // Keep partial announcements (e.g. an abstract date with the paper deadline still TBD) untouched.
    if (!existing.cycles.some((c) => c.deadline || c.abstractDeadline)) existing.cycles = cycles
    return
  }
  venue.editions.push({
    year,
    dateText: null,
    startDate: shiftYears(base.startDate, step),
    endDate: shiftYears(base.endDate, step),
    approximateDate: false,
    location: null,
    url: venue.homepage || null,
    cycles,
  })
  venue.editions.sort((a, b) => a.year - b.year)
}

// 5. Merge
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
  const now = Date.now()
  const categoryOf = new Map()
  config.categories.forEach((cat) => cat.venues.forEach((v) => categoryOf.set(v, { name: cat.name })))
  const heelimOrder = new Map(order.map((v, i) => [config.renames[v] || v, i]))

  const hidden = new Set(config.hiddenVenues || [])
  let venues = [...venuesFromHeelim(cfp, info), ...ccfVenues].filter((v) => !hidden.has(v.name))
  venues = venues.map((v) => {
    const tier = lookupTier(tiers, v.name)
    const cat = categoryOf.get(v.name)
    const merged = {
      id: v.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: v.name,
      fullName: v.fullName || tier?.fullName || v.description || null,
      category: cat?.name || "Other",
      domains: v.domains,
      keywords: v.keywords,
      // Tier list wins when it has a row for the venue; otherwise fall back to heelim values.
      kiise: tier ? tier.kiise : v.kiise ?? null,
      bk21plus: tier ? tier.bk21plus : v.bk21plus ?? null,
      tierVariants: tier?.variants,
      lists: tier ? { kaist: tier.kaist, snu: tier.snu, postech: tier.postech } : undefined,
      dblp: tier?.dblp || null,
      url: null,
      editions: v.editions,
      source: v.source,
    }
    // Drop editions that ended before last year; the cutoff changes only once a year, so weekly runs stay stable.
    const cutoff = `${new Date().getFullYear() - 1}-01-01`
    merged.editions = merged.editions.filter((e) => (e.endDate || `${e.year}-12-31`) >= cutoff)
    // Overrides: `editions` is keyed by year and merged into the matching edition; other fields replace.
    const { editions: editionOverrides, ...venueOverrides } = overrides[v.name] || {}
    if (editionOverrides) {
      merged.editions = merged.editions.map((e) =>
        editionOverrides[e.year] ? deepMerge(e, editionOverrides[e.year]) : e,
      )
    }
    const out = deepMerge(merged, venueOverrides)
    // Overrides may add editions the sources do not have yet.
    for (const [year, patch] of Object.entries(editionOverrides || {})) {
      if (out.editions.some((e) => e.year === Number(year))) continue
      const { start, end, approximate } = parseDateRange(patch.dateText, Number(year))
      out.editions.push({
        year: Number(year),
        dateText: null,
        startDate: start,
        endDate: end,
        approximateDate: approximate || false,
        location: null,
        url: null,
        cycles: [],
        ...patch,
      })
    }
    out.editions.sort((a, b) => a.year - b.year)
    out.editions.forEach((e) => {
      e.cycles = e.cycles.map(normalizeCycle).sort((a, b) => (a.deadline || "9999").localeCompare(b.deadline || "9999"))
    })
    addEstimatedEdition(out, now)
    // Links of estimated editions are guesses (the previous edition's site, or a not-yet-existing URL).
    // When the venue has a `homepage` override, link such editions there unless an override names the edition's URL.
    if (out.homepage) {
      out.editions.forEach((e) => {
        const estimated = e.cycles.length > 0 && e.cycles.every((c) => c.estimated)
        if (estimated && !editionOverrides?.[e.year]?.url) e.url = out.homepage
      })
    }
    // The venue link is the latest edition's link unless overridden.
    out.url = out.url || [...out.editions].reverse().find((e) => e.url)?.url || out.homepage || null
    delete out.description
    return out
  })

  // A venue whose source file failed to download keeps last week's entry instead of disappearing.
  const previous = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, "utf8")).venues : []
  for (const name of ccfFailed) {
    const old = previous.find((v) => v.name === name)
    if (old && !venues.some((v) => v.name === name)) venues.push(old)
  }

  // Row order: category order from the config. Categories with "sortBy": "rank" list venues by BK21+ IF (high first),
  // then KIISE tier (최우수, 우수, none), then config order; other categories follow the config order.
  const kiiseRank = (k) => (k === "최우수" ? 0 : k === "우수" ? 1 : 2)
  config.categories.forEach((cat, ci) => {
    const idx = (v) => cat.venues.indexOf(v.name)
    const members = venues.filter((v) => v.category === cat.name)
    members.sort(
      cat.sortBy === "rank"
        ? (a, b) => (b.bk21plus || 0) - (a.bk21plus || 0) || kiiseRank(a.kiise) - kiiseRank(b.kiise) || idx(a) - idx(b)
        : (a, b) => idx(a) - idx(b),
    )
    members.forEach((v, i) => (v.sortKey = ci * 1000 + i))
  })
  venues.filter((v) => v.category === "Other").forEach((v) => (v.sortKey = 999000 + (heelimOrder.get(v.name) ?? 999)))
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
