# DYAA Problem Solving — Modular Version

This folder is a direct modular split of `DYAAPS.html`. The page design and JavaScript logic have not been intentionally changed.

## Main files

- `index.html` — page structure only
- `css/styles.css` — all page styling
- `js/01-config.js` — heroes, levels, cloud URL and storage configuration
- `js/02-state-dom.js` — application state and DOM references
- `js/03-utils.js` — shared maths and answer helpers
- `js/generators/` — year-specific and shared question generators
- `js/problem-solving/` — problem-solving banks split by topic
- `js/04-question-engine.js` — routes selected skills to the correct bank
- `js/05-progress-storage.js` — saved progress and mistake migration
- `js/06-audio-effects.js` — sound and visual rewards
- `js/07-ui-gameplay.js` — missions, status and question interaction
- `js/08-student-cloud-records.js` — student records and Google Sheet uploads
- `js/09-game-review.js` — game completion and mistake review
- `js/10-events-init.js` — event listeners and startup
- `js/11-pdf-export.js` — generates the selected 50-question printable PDF worksheet

## Maintenance examples

- Change fraction problem wording: edit `js/problem-solving/03-fractions.js`
- Add or change work-rate questions: edit `js/problem-solving/06-speed-work-rate.js`
- Change Beginner/Intermediate/Advanced labels: edit `js/01-config.js`
- Change layout or colours: edit `css/styles.css`
- Change Google Sheet Web App URL: edit `js/01-config.js`
- Change the 50-question PDF layout: edit `js/11-pdf-export.js`

## GitHub Pages

Upload the complete folder structure. Keep all file and folder names unchanged because GitHub Pages paths are case-sensitive.

The `<script>` order in `index.html` is important. Do not rearrange it unless dependencies are also reviewed.

## Worksheet tools

- **Test 100 Questions** checks the current level, selected problem types and question structure.
- **Export Selected 50 Questions to PDF** generates 50 unique questions from the current selection and opens the browser print dialog. Choose **Save as PDF** to create the PDF. An answer key is included on a separate page.
