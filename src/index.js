// import { readFile, writeFile } from "fs";
import { setFileSystem } from "./fs";
import { makePlugin } from "./pluginFactory";

module.exports = (opts = {}) => {
	if (typeof opts.fs?.readFile !== "function" || typeof opts.fs?.writeFile !== "function") {
		throw new Error("must pass in options.fs in this fork");
	} else if (typeof opts.getJSON !== "function") {
		throw new Error("must pass in options.getJSON in this fork");
	} else if (typeof opts.generateScopedName !== "function") {
		throw new Error("must pass in options.generateScopedName in this fork");
	} else if (typeof opts.resolve !== "function") {
		throw new Error("must pass in options.resolve in this fork");
	}

	setFileSystem({ readFile: opts.fs.readFile, writeFile: opts.fs.writeFile });

	return makePlugin(opts);
};
module.exports.postcss = true;
