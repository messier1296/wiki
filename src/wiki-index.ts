import type { AstroComponentFactory } from "astro/runtime/server/index.js";

type WikiModule = {
	default?: AstroComponentFactory;
	Content?: AstroComponentFactory;
	frontmatter?: {
		title?: string;
	};
};

export type WikiEntry = {
	content?: string;
	module?: WikiModule;
	slug: string;
	title: string;
	type: "html" | "md";
};

const modules = import.meta.glob<WikiModule>("./wiki/**/*.md", {
	eager: true,
});

const htmlSources = import.meta.glob<string>("./wiki/**/*.html", {
	eager: true,
	query: "?raw",
	import: "default",
});

export function getWikiEntries(): WikiEntry[] {
	const contentEntries = Object.entries(modules)
		.filter(([path]) => {
			const segments = path.split("/");
			return (
				!path.endsWith("/AGENTS.md") &&
				!segments.includes("draft") &&
				segments.every((segment) => !segment.startsWith("_"))
			);
		})
		.map(([path, module]) => {
			const match = path.match(/^\.\/wiki\/(.+)\.md$/);
			if (!match) {
				throw new Error(`Unexpected wiki path: ${path}`);
			}

			const slug = match[1];
			const title =
				module.frontmatter?.title ??
				slug.split("/").at(-1)?.replaceAll("_", " ") ??
				slug;

			return {
				module,
				slug,
				title,
				type: "md" as const,
			};
		});

	const htmlEntries = Object.entries(htmlSources)
		.filter(([path]) => {
			const segments = path.split("/");
			return (
				!segments.includes("draft") &&
				segments.every((segment) => !segment.startsWith("_"))
			);
		})
		.map(([path, content]) => {
			const match = path.match(/^\.\/wiki\/(.+)\.html$/);
			if (!match) {
				throw new Error(`Unexpected wiki HTML path: ${path}`);
			}

			const slug = match[1];
			const titleMatch = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
			const title =
				titleMatch?.[1].replace(/<[^>]+>/g, "") ??
				slug.split("/").at(-1)?.replaceAll("_", " ") ??
				slug;

			return {
				content,
				slug,
				title,
				type: "html" as const,
			};
		});

	const entries = [...contentEntries, ...htmlEntries];

	return Array.from(
		entries
			.reduce((bySlug, entry) => {
				if (!bySlug.has(entry.slug)) bySlug.set(entry.slug, entry);
				return bySlug;
			}, new Map<string, WikiEntry>())
			.values(),
	);
}
