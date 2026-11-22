<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- Stack is TanStack Start (not Next.js) — the brief's Next.js/next-intl/Vercel choices are mapped onto this platform's equivalents.
- i18n: all UI text lives in `src/lib/i18n/messages.ts` (`en` + `ar` with identical keys, typed by `Messages`); components read it via `useI18n().t`. Why: one typed source, no extra library.
- Language and theme are stored in cookies and read in the root `beforeLoad` via `getPreferences` (isomorphic). Why: the server must render `<html lang dir class>` correctly on first paint (no RTL flash).
- Use logical spacing (`ms-/me-/ps-/pe-/start-/end-`) and `rtl:` variants for directional icons. Why: every page must mirror cleanly in Arabic.
- Learning content (paths, levels, goals) lives in data files under `src/content/` with `{ en, ar }` strings. Why: lessons must be easy to add without touching components.
- Kids styling is the `.theme-kids` token override in `src/styles.css`, applied as a class. Why: brighter look without one-off colors in components.
- Never merge a custom utility named `text-*` through `cn()` — tailwind-merge drops it as a font-size conflict; heading style is `display-heading`.
- Build in phases and stop for user approval after each phase.
- Placement questions live per level in `src/content/question-bank/*.ts`; `options[0]` is always the correct answer and the UI shuffles deterministically. Why: easy editing and simple, testable scoring.
- The server re-scores every test from question ids (`assessPlacement`) and never trusts a browser score; the AI may shift the score level by at most one step (`clampToNeighbour`). Why: protects against tampering and prompt injection via the writing sample.
- AI calls go through `@lovable.dev/ai-gateway` only in `*.server.ts` files loaded inside server-function handlers. Why: keeps the key and prompts off the client.
- Learner test progress, result, review and joined courses are stored in localStorage via `learnerStorage` until accounts exist. Why: no backend yet; move to the database when accounts are added.
