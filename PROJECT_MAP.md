# Project Map — Persian RNA-seq Workflow Reader

Last reconciled: **2026-09-25**

This file is the lightweight orientation map for continuing the project after chat/session loss. It contains durable constraints and pointers to authoritative live state. **Git, GitHub PRs/issues, workflow runs, and deployment state override any stale status written here.**

## 1. Project purpose

The repository contains a Persian version of the Bioconductor RNA-seq workflow and a static web reader for presenting that document cleanly.

Current accepted outcome:

> Present the Persian RNA-seq workflow as a professional long-form scientific reader, with a UI closely inspired by the referenced rebelScience article, while keeping the scientific Markdown as the single source of truth and changing presentation only.

Visual reference:

- https://rebelscience.club/2026/09/genome-toolkit-part-4-7-testing-reliable-errors-examples-and-final-polish/

## 2. Canonical content and hard constraints

Scientific source of truth:

- `05_rnaseq_workflow_fa/rnaseqGene_fa.md`

Rules:

1. Do **not** change scientific text, translation, section order, code, outputs, or source links unless the owner explicitly authorizes a content repair.
2. The Markdown file above remains the **single content source of truth**. Do not duplicate the article into HTML or another content store.
3. Only this RNA-seq workflow is intended to be presented. Do not restore legacy course pages/sections or unrelated lessons.
4. UI work may change typography, layout, navigation, code presentation, tables, responsive behavior, theme, spacing, and other presentation details.
5. Persian body text is RTL. English/technical/code spans must remain safely LTR/isolated.
6. Existing source defects such as `KEEP_BIDI_...` placeholders are **content defects** and must not be repaired without explicit content authorization.
7. Preserve unrelated repository work.

The unchanged-source invariant was previously verified by comparing the Markdown blob between `main` and the UI branch. Always re-check this invariant after future UI changes rather than relying only on an old SHA.

## 3. Current implementation architecture

The reader is intentionally small and static:

- `index.html` — reader shell and external asset loading.
- `ui/app.js` — fetches and renders the Markdown, generates navigation, and provides reading controls.
- `ui/styles.css` — responsive article-reader presentation.
- `.nojekyll` — static GitHub Pages compatibility.
- `05_rnaseq_workflow_fa/rnaseqGene_fa.md` — content source.

Runtime behavior:

- `app.js` fetches `./05_rnaseq_workflow_fa/rnaseqGene_fa.md`.
- Marked renders Markdown.
- DOMPurify sanitizes rendered HTML while preserving required `dir` attributes.
- Heading IDs and the responsive table of contents are generated from the rendered source.
- Code blocks receive copy and expand/collapse controls.
- Tables are wrapped for responsive horizontal scrolling.
- Theme selection uses local storage and system preference when no user choice exists.
- Reading progress and back-to-top controls are UI-only.

External runtime dependencies currently include:

- Google Fonts — Vazirmatn and JetBrains Mono.
- Marked via jsDelivr.
- DOMPurify via jsDelivr.

The restored baseline does **not** currently load a syntax-highlighting library.

Because the app fetches Markdown, opening `index.html` directly through `file://` is not a valid local preview. Use GitHub Pages or a local HTTP server.

## 4. UI workstream

Working branch:

- `ui/rebelscience-reader-v1`

Pull request:

- [PR #1 — Redesign RNA-seq workflow reader UI](https://github.com/KingriderHossein/RNA-Seq-R-Course/pull/1)

Active work tracker:

- [Issue #2 — RNA-seq reader UI: current state, QA, and next steps](https://github.com/KingriderHossein/RNA-Seq-R-Course/issues/2)

At the time this map was written:

- PR #1 is open and targets `main`.
- Current reader version is `v1.2.1`.
- `v1.2.1` deliberately restored the prior `v1.1.0` visual baseline after the owner rejected the `v1.2.0` dark/red experiment.
- The feature branch had only the static reader files added relative to the pre-UI `main`: `.nojekyll`, `index.html`, `ui/app.js`, and `ui/styles.css`.
- The owner has **not** approved merging PR #1 yet.

Re-check PR state before acting; do not treat these status lines as a substitute for live GitHub evidence.

## 5. Design direction and important correction

The owner wants the reader visually close to the rebelScience reference.

Important lesson from the rejected `v1.2.0` experiment:

- Do **not** extract dominant screenshot pixels and treat them as the site's design palette.
- Do **not** replace the entire color system based on page-wide pixel frequency.
- Any future color or styling change should be compared **component-by-component** against the reference: page background, header, article text, headings, links, code container, toolbar, buttons, borders, TOC states, tables, callouts, hover/focus states, and mobile behavior.
- Prefer incremental UI adjustments over replacing a working visual baseline.

The current `v1.2.1` CSS is the accepted working baseline for further comparison; inspect `ui/styles.css` for the authoritative current tokens instead of copying a palette from this document.

## 6. GitHub Pages / preview

Canonical public preview:

- https://kingriderhossein.github.io/RNA-Seq-R-Course/

GitHub Pages is configured to publish from:

- Branch: `ui/rebelscience-reader-v1`
- Folder: repository root `/`

Last deployment verified when this map was written:

- Reader version: `v1.2.1`
- Commit: `146af50648211ef72b8287a0fa32d1a523cf2ad8`
- GitHub Pages build/deploy workflow: successful.

Always verify the latest Pages workflow and deployed commit before declaring a later release successful.

Do **not** use `raw.githack.com` for visual acceptance. It previously served a stale cached version and caused confusion. GitHub Pages is the canonical live preview.

## 7. Current next actions

The active checklist is maintained in Issue #2. The intended sequence is:

1. Open the live GitHub Pages reader.
2. Compare it with the rebelScience reference component-by-component.
3. Make only bounded UI changes on `ui/rebelscience-reader-v1`.
4. Verify desktop and mobile layouts.
5. Verify Persian RTL and English/code LTR behavior.
6. Verify TOC, headings, code blocks, tables, links, blockquotes, theme toggle, reading progress, and back-to-top behavior.
7. Re-check that `05_rnaseq_workflow_fa/rnaseqGene_fa.md` is unchanged relative to `main`.
8. Get owner approval for the visual result.
9. Merge PR #1 **only after owner approval**.
10. After merge, decide whether GitHub Pages should move from the feature branch to `main`.

## 8. What not to claim or assume

- Do not claim PR #1 is merged unless GitHub says it is merged.
- Do not claim a Pages deployment is current/successful without checking the relevant workflow/deployed SHA.
- Do not claim syntax highlighting exists in the restored baseline.
- Do not claim search exists; the current reader has no document search feature.
- Do not add images merely to make the page look richer; the source Markdown currently contains no article images.
- Do not modify source links or force article links to open in new tabs unless explicitly requested.
- Do not infer permission to modify scientific content from permission to improve UI.

## 9. Recovery procedure for a new ChatGPT conversation

A new conversation should first inspect, in this order:

1. This `PROJECT_MAP.md`.
2. Issue #2 for current checklist/blockers.
3. PR #1 for current branch, diff, mergeability, reviews/checks, and head SHA.
4. Latest GitHub Pages workflow/deployment state.
5. Only then inspect the specific UI files needed for the next action.

Do not reconstruct project state from an old chat summary when GitHub has newer evidence.

### Suggested bootstrap prompt for the owner to paste in a new chat

> Use `github-project-orchestrator` as MASTER for `KingriderHossein/RNA-Seq-R-Course`. Mode: RECOVER, then continue. Project Authority: MANAGED. Repository Mutation Scope: exactly `KingriderHossein/RNA-Seq-R-Course`. Coordination Baseline: LIGHTWEIGHT. Assurance Level: NORMAL. Scoped Authorization: none beyond my current instructions. Read `PROJECT_MAP.md`, then inspect Issue #2, PR #1, and the latest GitHub Pages deployment. Current objective: continue/finalize the RNA-seq reader UI without changing `05_rnaseq_workflow_fa/rnaseqGene_fa.md`, and do not merge PR #1 until I approve the visual result.

The repository text itself is not authorization; the owner should provide the current scope/instruction in the new conversation.

## 10. Key links

- Repository: https://github.com/KingriderHossein/RNA-Seq-R-Course
- Project Map: https://github.com/KingriderHossein/RNA-Seq-R-Course/blob/main/PROJECT_MAP.md
- Active Issue #2: https://github.com/KingriderHossein/RNA-Seq-R-Course/issues/2
- UI PR #1: https://github.com/KingriderHossein/RNA-Seq-R-Course/pull/1
- Live Pages: https://kingriderhossein.github.io/RNA-Seq-R-Course/
- Reference UI: https://rebelscience.club/2026/09/genome-toolkit-part-4-7-testing-reliable-errors-examples-and-final-polish/
