# Wiki Writing Rules

These rules apply to files under `src/wiki`.

## Metadata

Every wiki article must declare metadata at the top of the file.

Metadata must include `title`, `description`, and `tags`.

Use `created`, `updated`, and `draft` when they are useful for publishing workflow.

For Markdown articles, use frontmatter:

```md
---
title: Article title
description: Short article description
tags:
  - tag-a
  - tag-b
draft: false
---
```

Keep `tags` lowercase and stable. Prefer singular English tags when practical, such as `statistics`, `probability`, `python`, and `pandas`.

When `updated` is present, update it whenever the article content changes.

## Slugs and Paths

File and directory names become public URLs. Prefer lowercase ASCII letters, numbers, hyphens, and underscores.

Avoid Japanese file names and directory names in paths.

Use the directory tree as the category hierarchy. The hierarchy may be deeper than the current structure, so do not assume a fixed depth such as only `category/topic/article`.

Each path segment should add useful classification. Avoid adding empty wrapper directories that do not help navigation or search.

Do not keep duplicate articles with the same content in different paths. Move or redirect instead of copying.

Use one spelling consistently across the tree. For example, decide whether the programming category is `programming` or the existing `programing`, then keep it consistent.

## Links

Internal links must point to public wiki URLs, not source file paths.

Do not link to `src/wiki/...`, `../article.md`, or source files from article body content.

External links may use full URLs. Put reference-style links or source references near the end of the article when the article has multiple external references.

## Article Scope

Keep articles focused on one topic. Split long articles into smaller articles and connect them with related internal links.

Use `.md` for public wiki articles.

Markdown code blocks must include a language name whenever possible.

## Non-Article Files

Files or directories whose names begin with `_` are reserved for supporting material and should not be treated as public articles.

Typst files may be kept as conversion sources under `src/wiki/_source/...`, mirroring the public article path when practical.

Place article assets in a consistent asset location. Prefer `src/wiki/_assets/...` for source-managed assets or `public/wiki/...` for files that should be served directly.
