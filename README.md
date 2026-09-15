# seongho-git.github.io

Personal academic homepage of Seongho Kim, built with Next.js 15 (static export), React 19, Tailwind CSS, and shadcn/ui.

- Live site: https://seongho-git.github.io
- Conferences: https://seongho-git.github.io/conferences/ (calendar) and https://seongho-git.github.io/conferences/deadlines/

## Structure

```
app/
  layout.tsx                 # metadata (Open Graph, JSON-LD), fonts, theme provider
  page.tsx                   # homepage, composed of sections
  icon.svg                   # favicon
  conferences/page.tsx       # submission-to-conference calendar (default view)
  conferences/deadlines/     # deadlines table
  deadlines/                 # legacy redirect to /conferences/deadlines
components/
  sections/                  # Hero, About, Publications, Education, Experience, Honors, Projects, Service, Contact
  conferences/               # shell (tabs + filters), deadlines table, calendar, tier badges, filter state
  site-header.tsx, site-footer.tsx, entry.tsx, section-heading.tsx
lib/
  data.ts                    # all homepage content (edit this to update the CV)
  conferences.ts             # typed access to data/conferences.json
data/
  conferences.json           # generated conference dataset (do not edit by hand)
  conference-config.json     # categories, extra venues, name aliases
  conference-overrides.json  # manual corrections merged after each update
scripts/
  update-conferences.mjs     # fetches sources and regenerates data/conferences.json
```

## Local development

```bash
npm install --legacy-peer-deps
npm run dev                 # http://localhost:3000
```

Preview the exact static export that GitHub Pages serves:

```bash
npm run build               # writes ./out
npm run preview             # serves ./out at http://localhost:3000
```

## Updating content

- Homepage text, publications, experience: edit `lib/data.ts`.
- Title shown across the site: `personalInfo.role` in `lib/data.ts`.
- Conference list, categories, aliases: `data/conference-config.json`, then run `npm run update:conferences`.
- One-off corrections to conference data: `data/conference-overrides.json` (survives automatic updates).

## Conference data pipeline

`scripts/update-conferences.mjs` merges three public sources into `data/conferences.json`:

1. `profile.heelim.com` (`cfp.json`, `conf_info.json`, `conf_order.json`): deadlines, notification dates, conference dates, domains.
2. `ccfddl/ccf-deadlines`: additional venues listed under `extraFromCcf` in the config (cryptography and privacy venues).
3. Pusnow's "CS 분야 우수 학술대회 목록" gist: KIISE 2024 tier (최우수/우수), BK21+ IF (2018), and KAIST/SNU/POSTECH lists.

The GitHub Actions workflow `.github/workflows/update-conferences.yml` runs the script every Monday (09:00 KST) and commits `data/conferences.json` if anything changed, which triggers a redeploy. It can also be run manually from the Actions tab.

Deadlines are date-only in the sources and are treated as 23:59 Anywhere on Earth (UTC−12).

## Deployment

Pushes to `main` build and deploy to GitHub Pages via `.github/workflows/deploy.yml`. Pull requests only build.
