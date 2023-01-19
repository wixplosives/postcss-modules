import type { Plugin } from "postcss";
declare type GenerateScopedNameFunction = (name: string, filename: string, css: string) => string;

declare type LocalsConventionFunction = (
	originalClassName: string,
	generatedClassName: string,
	inputFile: string
) => string;

declare class Loader {
	constructor(root: string, plugins: Plugin[]);

	fetch(file: string, relativeTo: string, depTrace: string): Promise<{ [key: string]: string }>;

	finalSource?: string | undefined;
}

declare interface Options {
	getJSON?(cssFilename: string, json: { [name: string]: string }, outputFilename?: string): void;

	localsConvention?:
		| "camelCase"
		| "camelCaseOnly"
		| "dashes"
		| "dashesOnly"
		| LocalsConventionFunction;

	scopeBehaviour?: "global" | "local";
	globalModulePaths?: RegExp[];

	generateScopedName?: string | GenerateScopedNameFunction;

	hashPrefix?: string;
	exportGlobals?: boolean;
	root?: string;
	fs: {
		writeFile: (path: string, data: any, callback: (e?: Error | null) => void) => void;
		readFile: (
			path: string,
			encoding: "utf-8",
			callback: (e?: Error | null, data?: string) => string
		) => void;
	};
	Loader?: typeof Loader;

	resolve?: (file: string, importer: string) => string | null | Promise<string | null>;
}

declare interface PostcssModulesPlugin {
	(options: Options): Plugin;
	postcss: true;
}

declare const PostcssModulesPlugin: PostcssModulesPlugin;

export = PostcssModulesPlugin;
