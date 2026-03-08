# Touch-Board – Komponentdokumentation

## Teknologier der er brugt
- React 19 (UI)
- TypeScript (typer og sikkerhed i koden)
- Vite (dev-server og build)
- Sass/SCSS (styling af cards)
- ESLint + TypeScript ESLint (linting)
- Contentful API (hentning af entries og assets)

## Teknologier på tværs af branches
Nedenfor er en samlet oversigt over de teknologier, der er brugt i de andre branches i repoet (sammen med denne løsning):

- `main`
	- Grundopsætning af projektstruktur (baseline branch)

- `kortet`
	- React frontend
	- Leaflet kort (`leaflet`) i `Leaflet-build`
	- CSS styling + statiske assets (ikoner/favicon/frontpage)

- `min-frontend-styling`
	- React + TypeScript + Vite
	- Contentful integration (`contentful`)
	- Leaflet (`leaflet`) i Touch-Board-delen
	- Sass (`sass`) og mere frontend-struktur (UI-komponenter, hooks, services, typer)

### Samlet tech stack i hele repoet
- React
- TypeScript
- Vite
- Sass/SCSS
- Contentful
- Leaflet
- ESLint

## NPM scripts
- `npm run dev` – starter lokal udviklingsserver
- `npm run build` – bygger projektet til produktion (`tsc -b && vite build`)
- `npm run lint` – kører linting
- `npm run preview` – preview af build lokalt

## Contentful integration (kort overblik)
- Data hentes fra Contentful CDN Entries API via `fetch`.
- Entries gemmes og rendres i en grid-visning.
- Assets fra `includes.Asset` mappes på `sys.id`, så linked billeder kan vises i cards.
- Rich text fra Contentful håndteres og vises som læsbar tekst i card-indhold.

## Vigtige filer i denne del
- `src/components/ContentfulEntries.tsx` – henter data fra Contentful og sender entries/assets videre
- `src/components/ContentfulCard.tsx` – renderer card-indhold, inkl. billede og tekstfelter
- `src/components/ContentfulCard.scss` – styling af cards og grid-layout

## Installation
1. Installer dependencies:

	`npm install`

2. (Hvis nødvendigt) installer Contentful SDK:

	`npm install contentful`

## Status
Den aktuelle løsning viser cards med:
- Titel
- Undertitel (hvis felt findes)
- Beskrivelse/body
- Billede (hvis der er linked asset)
- Øvrige felter i et læsbart format
