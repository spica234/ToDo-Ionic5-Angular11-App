#!/bin/env node
/*
Author: Anukool Naik
Language: NodeJS
Purpose: It optimizes all node packages for Angular10 to make optimize it less in size.
*/
const path = require("path"),
	replace = require("replace-in-file"),
	fs = require("fs");
const findPackageJson = (startDirPath) => {
	const filter = "package.json";
	if (!fs.existsSync(startDirPath)) {
		console.log(`no such dir as ${startDirPath}`);
		return;
	}
	const files = fs.readdirSync(startDirPath);
	for (let i = 0; i < files.length; i++) {
		const filename = path.join(startDirPath, files[i]);
		const stat = fs.lstatSync(filename);
		if (stat.isDirectory()) {
			findPackageJson(filename); //recurse
		} else if (filename.indexOf(filter) >= 0) {
			console.log(
				`********** Working on ${filename} **********`
			);
			const content = fs.readFileSync(filename);
			if (content.includes("sideEffects")) return
			else {
				readAndReplace(filename);
			}
		}
	}
};
const readAndReplace = (someFile) => {
	fs.readFile(someFile, "utf8", function (err, data) {
		if (err) {
			return console.log(err);
		}
		const result = data.replace(/(\"description\": \"[^\"]+\",)/g, '$1\n\t\"sideEffects\": false,');
		fs.writeFile(someFile, result, "utf8", function (errR) {
			if (errR) return console.log(errR);
		});
	});
}
findPackageJson("node_modules/../");
