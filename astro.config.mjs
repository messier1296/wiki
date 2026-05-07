// @ts-check
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://messier1296.github.io",
	base: "/wiki",
	trailingSlash: "always",

	markdown: {
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeRaw, rehypeKatex],
	},

	vite: {
		plugins: [tailwindcss()],
	},
});
