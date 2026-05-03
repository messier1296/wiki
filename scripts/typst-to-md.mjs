#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";

const START = "PANDOC_FRAME_START";
const END = "PANDOC_FRAME_END";

const [, , inputPath, outputPath] = process.argv;

if (!inputPath || !outputPath) {
	console.error("Usage: node scripts/typst-to-md.mjs <input.typ> <output.md>");
	process.exit(1);
}

const source = readFileSync(inputPath, "utf8");
const preprocessed = stripRenderSetup(markFrames(source));
const tempTypst = join(dirname(inputPath), `.${basename(inputPath)}.pandoc-frame.typ`);

try {
	writeFileSync(tempTypst, preprocessed);

	const markdown = execFileSync(
		"pandoc",
			[
				"--from=typst",
				"--to=markdown+tex_math_dollars",
				"--wrap=preserve",
				tempTypst,
			],
		{ encoding: "utf8" },
	);

	writeFileSync(outputPath, normalizeDisplayMath(restoreFrames(markdown)));
} finally {
	rmSync(tempTypst, { force: true });
}

function markFrames(text) {
	let output = "";
	let cursor = 0;

	while (cursor < text.length) {
		const frameIndex = text.indexOf("#frame", cursor);
		if (frameIndex === -1) {
			output += text.slice(cursor);
			break;
		}

		const parsed = parseFrame(text, frameIndex);
		if (!parsed) {
			output += text.slice(cursor, frameIndex + "#frame".length);
			cursor = frameIndex + "#frame".length;
			continue;
		}

		output += text.slice(cursor, frameIndex);
		output += `\n${START}: ${parsed.title ?? ""}\n\n`;
		output += markFrames(parsed.body);
		output += `\n\n${END}\n`;
		cursor = parsed.endIndex;
	}

	return output;
}

function stripRenderSetup(text) {
	return text
		.replace(/^#import\s+["'][^"']*template\.typ["']:[^\n]*\n/gm, "")
		.replace(/^#show:\s*setup\s*\n/gm, "")
		.replace(/^#cut\(\)\s*\n/gm, "")
		.replace(/#h\([^)]*\)/g, "");
}

function parseFrame(text, startIndex) {
	let cursor = startIndex + "#frame".length;
	cursor = skipWhitespace(text, cursor);

	let title = null;
	if (text[cursor] === "(") {
		const args = readBalanced(text, cursor, "(", ")");
		if (!args) return null;
		title = parseTitle(args.content);
		cursor = skipWhitespace(text, args.endIndex);
	}

	if (text[cursor] !== "[") return null;

	const body = readBalanced(text, cursor, "[", "]");
	if (!body) return null;

	return {
		body: body.content,
		endIndex: body.endIndex,
		title,
	};
}

function parseTitle(args) {
	const stringMatch = args.match(/title\s*:\s*"((?:[^"\\]|\\.)*)"/s);
	if (stringMatch) return unescapeTypstString(stringMatch[1]);

	const contentMatch = args.match(/title\s*:\s*\[((?:[^\]\\]|\\.)*)\]/s);
	if (contentMatch) return contentMatch[1].trim();

	return null;
}

function unescapeTypstString(value) {
	return value.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
}

function readBalanced(text, startIndex, open, close) {
	let depth = 0;
	let inString = false;
	let escaped = false;

	for (let index = startIndex; index < text.length; index++) {
		const char = text[index];

		if (inString) {
			escaped = char === "\\" && !escaped;
			if (char === '"' && !escaped) inString = false;
			if (char !== "\\") escaped = false;
			continue;
		}

		if (char === '"') {
			inString = true;
			continue;
		}

		if (char === open) depth++;
		if (char === close) depth--;

		if (depth === 0) {
			return {
				content: text.slice(startIndex + 1, index),
				endIndex: index + 1,
			};
		}
	}

	return null;
}

function skipWhitespace(text, index) {
	while (index < text.length && /\s/.test(text[index])) index++;
	return index;
}

function restoreFrames(markdown) {
	const lines = markdown.split("\n");
	const output = [];

	for (const line of lines) {
		const startMatch = line.match(new RegExp(`^${START}:\\s*(.*)$`));
		if (startMatch) {
			output.push('<div class="frame">');
			const title = startMatch[1].trim();
			if (title) {
				output.push(`  <div class="frame-title">${escapeHtml(title)}</div>`);
			}
			output.push("");
			continue;
		}

		if (line.trim() === END) {
			output.push("</div>");
			output.push("");
			continue;
		}

		output.push(line);
	}

	return output.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
}

function normalizeDisplayMath(markdown) {
	return markdown.replace(/\$\$([^\n][\s\S]*?[^\n])\$\$/g, (_, content) => {
		if (!/[\\&]|\\\\|\\begin|\\end/.test(content)) return `$$${content}$$`;
		return `$$\n${content.trim()}\n$$`;
	});
}

function escapeHtml(value) {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}
