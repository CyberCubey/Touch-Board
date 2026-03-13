**Touch-Board — Kort & Nyheder (Webprojekt)**

- **Formål:** Interaktivt kort med aktiviteter og et nyhedsfeed hentet fra Contentful. Kortet viser markører fra aktiviteter (automatisk synkronisering), og nyheder vises i en sidebar (2 ad gangen, roterer hvert 10. minut).

**Hurtigstart**
- **Installer dependencies:** `npm install` i projektmappen `Touch-Board/Touch-Board`.
- **Kør udvikling:** `npm run dev`.

**Vigtige scripts** (fra `package.json`)
- **dev:** `vite` — kør udviklingsserver.
- **build:** `tsc -b && vite build` — byg til produktion.
- **preview:** `vite preview` — preview bygget app.

**Environment / Contentful**
- Opret en `.env` med følgende variabler (brug dine Contentful nøgler):
	- `VITE_CONTENTFUL_SPACE_ID`
	- `VITE_CONTENTFUL_ACCESS_TOKEN`

**Nøglefiler & hvor ting sker**
- **Hook / data:** [Touch-Board/src/hooks/useContentfulData.ts](Touch-Board/src/hooks/useContentfulData.ts) — henter `nyheder`, `aktiviteter` og `information` fra Contentful og resolver linked assets.
- **Service:** [Touch-Board/src/services/contentful.ts](Touch-Board/src/services/contentful.ts) — lavere-niveau Contentful-forespørgsler + `getImageUrl()`.
- **Map:** [Touch-Board/src/components/map/Map.tsx](Touch-Board/src/components/map/Map.tsx) — opsætter Leaflet + cluster.
- **Markers:** [Touch-Board/src/components/map/MarkerList.tsx](Touch-Board/src/components/map/MarkerList.tsx) — genererer markører ud fra `aktiviteter` (brug `fields.location.lat`/`lon`).
- **News:** [Touch-Board/src/components/news/NewsList.tsx](Touch-Board/src/components/news/NewsList.tsx) + [Touch-Board/src/components/news/NewsList.scss](Touch-Board/src/components/news/NewsList.scss) — viser thumbnails (absolut placeret i kort), to nyheder ad gangen, skifter hvert 10. minut.
- **Activity modal:** [Touch-Board/src/components/activities/ActivityModal.tsx](Touch-Board/src/components/activities/ActivityModal.tsx) + [Touch-Board/src/components/activities/ActivityModal.scss](Touch-Board/src/components/activities/ActivityModal.scss) — åben når en markør klikkes; viser titel, meta, billede og beskrivelse.
- **Information (Info-knap):** [Touch-Board/src/components/info/InformationModal.tsx](Touch-Board/src/components/info/InformationModal.tsx) — åbnes fra Info-knappen og viser `information` entries fra API.
- **Typer:** [Touch-Board/src/types/contentful.ts](Touch-Board/src/types/contentful.ts) — forventet struktur for `Nyhed` og `Aktivitet`.

**Adfærd / vigtige detaljer**
- Markører skabes dynamisk fra `useContentful().aktiviteter` og opdateres ved ændringer i API'et.
- Thumbnails i `NewsList` er absolut placeret i toppen af hvert kort; SCSS sørger for at billeder ikke overskrider boksen (`object-fit: cover`).
- News rotation: `NewsList.tsx` viser 2 items (konstant) og roterer hvert 10. minut. Juster `pageSize` og `intervalMs` i komponenten for andre værdier.
- Activity-modal bruger en reference-aktivitet (`Byens mini-Olympiade`) til at sætte billedbox-størrelsen (CSS-variabler `--activity-image-width` / `--activity-image-height`). Du kan ændre størrelsen ved at redigere `ActivityModal.scss` eller ændre referenceaktiviteten i Contentful.