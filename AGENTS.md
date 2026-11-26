# ARLECO — agent instructions and accepted design boundaries
Updated: 2026-11-22.

## Read first
Before editing any visual or motion code in this repo, read:
- `https://github.com/oyourich/portfolio/blob/main/AGENTS.md`
- `https://github.com/oyourich/portfolio/blob/main/.ai/portfolio-design-director/SKILL.md`
- `https://github.com/oyourich/portfolio/blob/main/.ai/motion-art-direction/SKILL.md`
- `https://github.com/oyourich/portfolio/blob/main/.ai/ui-motion-director/SKILL.md`
- `https://github.com/oyourich/portfolio/blob/main/.ai/ux-ui-foundations/SKILL.md`
- `https://github.com/oyourich/portfolio/blob/main/.ai/visual-qa/SKILL.md`
- `https://github.com/oyourich/portfolio/blob/main/library/motion/production-foundations.md`
- `https://github.com/oyourich/portfolio/blob/main/library/transitions/README.md`

Useful examples are `library/blocks/podpis/01-hero.html` (layered text blending) and `library/blocks/mts/05-brand-flip.html` (controlled pseudo-3D); these are references for mechanics, **not** permission to copy their appearance.

## Non-negotiable source priority
1. The user's current uploaded screenshot, exact SVG, photos, dimensions, and instructions.
2. The most recently user-approved ARLEKO version and source assets.
3. Verified rendering of the existing project.
4. Historical project notes and drafts, clearly labeled as such.

Do not replace original SVG with a hand-drawn CSS approximation, crop an image differently without authorization, synthesize alternate logos, introduce placeholder artwork into a final preview, or modify an accepted element to solve an unrelated task.

## Current scope and decisions
- Work only on the requested loader, hero, and the specifically supplied second block. Do not invent catalogue, material, project, footer, or other sections.
- **Loader:** The previously approved black-screen logo with three different wood-texture states, short controlled 3D rotations, and Ubuntu Medium caption. **Preserve** its accepted appearance and behavior; do not replace with a generic rotating square or recreate it from memory. Verify original images before working.
- **Hero:** Black background. Existing corporate logo/header and Ubuntu Regular hero headline; 64px, line-height 90%, letter-spacing -6% in the supplied desktop design. User-provided actual green-logo SVG and dark stacked-logs photo are mandatory assets. Graphic is an intentional overlapping composition, not two generic floating photos. Subtle pointer response; pseudo-3D motion only on the green graphic, with controlled depth and no gimmicks.
- **Second screen:** User supplied a precise screenshot of a large white editorial paragraph on black. Text must use `mix-blend-mode: exclusion` where it genuinely crosses the artwork; motion enters on scroll and requires a designed visual seam with the hero. Do not invent extra copy, images or layout.
- **REJECTED**: cursor-trail / infinitely duplicated photos. A previous `hero.js` in this repo still implements this rejected idea: it is **legacy/unapproved**, not the current design target. Do not reuse it as approved baseline.
- A prior standalone HTML preview with a recreated logo and modified loader is rejected. Do not treat it as an approved source.
- Image uploads and accepted loader assets from the conversation may **not exist in this repository**. Confirm paths and actual bytes rather than claiming inclusion.

## Before changing code
1. Locate and inspect actual uploaded assets and current repo source.
2. Describe in one concise paragraph the visual contract: stationary layers, moving layers, start frame, scroll interaction, end frame, mobile behavior, exact blend mode and z-index.
3. Build a pixel-comparable static first frame using the exact SVG and photos. No animation until the static composition is correct.
4. Design the motion beats: loader exit → hero reveal → pointer response → scroll handoff to second block. One dominant moving focal point at a time.
5. Keep transforms independent: for example an outer reveal wrapper and an inner pointer-motion wrapper. Do not let competing JavaScript animations overwrite the same `transform`.
6. Work on the exact requested section only. Preserve every unrelated accepted element.

## Motion discipline
- Prefer restrained, intentional motion with pauses where artwork needs to be read. No generic fade/stagger on everything.
- Preserve shared object identity through transitions. Do not duplicate/teleport a photo or graphic without an explicit transition design.
- Cursor effects should be low amplitude and smoothly return to rest. Pause unnecessary animation when out of view or the page is hidden.
- Scroll scenes must work in both directions, including fast scrolling, resizing and reduced-motion mode; use `requestAnimationFrame` rather than multiple competing scroll loops.
- Keep typography, object and background layering explicit. `mix-blend-mode: exclusion` requires testing with the actual pixels and parent stacking contexts.
- Don't let the header be covered by the loader/hero artwork after loader exit.

## Quality gate — do not claim visual verification based on code alone
Check in an actual browser:
- 1728×1079, 1440×900, ~390×844 and a narrow mobile viewport.
- First, middle and end states of loader, hero, second block, and their seams.
- Pointer movement/leave, scroll forward/backwards, refresh, resize, reduced-motion, missing/slow image loading.
- Fidelity of SVG outlines, image crops, typographic metrics, title line breaks, `exclusion` crossing, and no unintended overlays or placeholders.

State QA level explicitly: `source reviewed`, `syntax checked`, `browser visually checked`, or `not verified`. No claim of readiness while original assets are absent or the render has not been inspected.

## Handoff between conversations
At the start of each new task, consult this file and current approved references; **do not assume the latest GitHub commit is the accepted design**. Explicitly record approvals, rejections, asset paths, and known unverified states. Keep the original loader intact unless the user specifically asks to edit it.


## Reference library
- The reference catalog is maintained in `docs/references/README.md`.
- Before a visual-design task, review the relevant reference documents there.
- Keep reference notes evidence-based: distinguish what was seen in user screenshots from what was verified on the original page. If Behance is inaccessible, save the URL and mark the analysis as pending rather than guessing.
- References inform individual design decisions; they do not override the user's current brief, approved assets, or the scope boundaries above.

## Landing structure baseline (user-provided archive, 2026-11-26)
- The user explicitly designated the uploaded `dist.zip` prototype as the **structural baseline** for the future ARLEKO landing page.
- Review `references/landing-structure/README.md` before proposing sitemap, categories, catalogue components, product detail modals, planning pages, or CTA sequences.
- This is a structure/UX reference, **not approved branding, assets or copy**: the archive is titled “Дерево и камень”, and it contains concepts and unverified claims.
- The original archive is ~79.2 MB, and full binary transfer to GitHub is not yet complete. The repository currently contains an inventory and three HTML source documents only. Do not claim that the complete archive has been uploaded.
- Preserve the existing site files until a specific user request asks to integrate or migrate sections from this reference.
