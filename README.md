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
- Corrections to conference data: `data/conference-overrides.json` (survives automatic updates). An override can fix venue
  fields (`fullName`, `homepage`, `sponsor`) or an edition by year (`dateText`, `startDate`, `endDate`, `location`, `url`, `cycles`).
  `cycles` replaces the edition's whole list; give each cycle `deadline`, `deadlineTime` and `timezone`
  (`AoE`, `UTC`, `UTC-7`, `PT`, `ET`, `JST`, ...) as stated in the official call for papers. An override for a year the
  sources do not have adds that edition.

## Conference data pipeline

`scripts/update-conferences.mjs` merges three public sources into `data/conferences.json`:

1. `profile.heelim.com` (`cfp.json`, `conf_info.json`, `conf_order.json`): deadlines, notification dates, conference dates, domains.
2. `ccfddl/ccf-deadlines`: additional venues listed under `extraFromCcf` in the config (security, cryptography, systems,
   networking, design automation, and other venues heelim does not track), including deadline times and time zones.
3. Pusnow's "CS 분야 우수 학술대회 목록" gist: KIISE 2024 tier (최우수/우수), BK21+ IF (2018), and KAIST/SNU/POSTECH lists.
4. `data/conference-overrides.json`: corrections checked against official conference websites, merged last.

When every known deadline of a venue has passed, the script adds an estimated next edition (previous dates shifted by one
year, or by `cadenceYears` for biennial venues such as HotOS, ICCV and ECCV).

The GitHub Actions workflow `.github/workflows/update-conferences.yml` runs the script every Monday (09:00 KST), commits
`data/conferences.json` if anything changed, and then starts the deploy workflow. A push made with the workflow's
`GITHUB_TOKEN` does not trigger other workflows, so the deploy is dispatched explicitly. Both workflows can also be run
manually from the Actions tab. If a ccf-deadlines file cannot be downloaded, that venue keeps the previous week's data.

Venue order on the site follows the `categories` list in the config. Categories marked `"sortBy": "rank"` are ordered by
BK21+ IF, then KIISE tier. The calendar can also order rows by each venue's next deadline. The default view lists venues
that have a BK21+ IF or a KIISE tier; unranked venues are behind a toggle. `sponsor` (ACM, IEEE, ACM/IEEE, USENIX, or another organizing body) is kept in the overrides and was checked
against each venue's official site.

Deadlines with a known time and time zone are stored as an exact instant (`deadlineAt`); date-only deadlines are treated as
23:59 Anywhere on Earth (UTC−12). The site shows each deadline in its official time zone and in the viewer's local time.

## Deployment

Pushes to `main` build and deploy to GitHub Pages via `.github/workflows/deploy.yml`. Pull requests only build.
