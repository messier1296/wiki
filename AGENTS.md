# Repository Guidelines

## Project Structure & Module Organization

This is an Astro wiki site. Application code lives under `src/`.

- `src/pages/` contains route files, including the wiki article route at `src/pages/[...slug].astro`.
- `src/components/` contains reusable Astro components.
- `src/layouts/` contains shared page layouts.
- `src/styles/global.css` defines Tailwind theme tokens and global styling.
- `src/wiki/` contains wiki content. Public articles are `.md` or `.html`; supporting material should live in underscore-prefixed folders such as `src/wiki/_source/` or `src/wiki/_assets/`.
- `scripts/typst-to-md.mjs` converts Typst source files to Markdown with wiki frame markup.
- `public/` contains static files served as-is. `dist/` is generated build output and should not be edited.

## Build, Test, and Development Commands

Use `pnpm`.

- `pnpm dev` starts the local Astro dev server.
- `pnpm build` creates the production static site in `dist/`.
- `pnpm preview` previews the built site locally.
- `pnpm check` runs `astro check` for type and Astro diagnostics.
- `pnpm lint` runs Biome checks.
- `pnpm format` formats with Biome and Prettier for Astro files.
- `pnpm typst:md <input.typ> <output.md>` converts Typst source to Markdown, preserving `#frame(...)` as HTML frame blocks.

## Coding Style & Naming Conventions

Biome uses tabs and double quotes for JavaScript and TypeScript. Astro files are formatted by Prettier. Prefer existing Tailwind utility patterns and theme tokens from `src/styles/global.css`.

Use lowercase ASCII paths for wiki URLs, with hyphens or underscores when needed, for example `src/wiki/programming/python/pandas.md`.

## Testing Guidelines

There is no dedicated unit test suite yet. For changes, run at least:

```sh
pnpm check
pnpm build
```

For content or styling changes, inspect the affected generated page in the dev server or preview build.

## Commit & Pull Request Guidelines

The repository has minimal commit history, so no strict convention is established. Use short, imperative commit messages such as `Add wiki frame styles` or `Remove Typst rendering support`.

Pull requests should include a concise summary, affected paths or pages, verification commands run, and screenshots for visible UI changes. Link related issues when available.

## Agent-Specific Instructions

Follow narrower `AGENTS.md` files when present, such as `src/wiki/AGENTS.md` for wiki content rules. Keep Typst files as conversion sources only; do not add Typst rendering back into the Astro app unless explicitly requested.
