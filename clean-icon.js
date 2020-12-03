#!/bin/env node
/*
Author: Somebody else , not me
Language: NodeJS
Purpose: Clean unused icons, images etc. to reduce the app size.
*/
const path = require("path"),
	replace = require("replace-in-file"),
	fs = require("fs");
let iconNames = [];
const uniqueArray = (myArray) => myArray.filter((elem, pos) => myArray.indexOf(elem) == pos && !elem.used);
const fromDir = (startPath, filter, callback) => {
	if (!fs.existsSync(startPath)) {
		console.log("no dir ", startPath);
		return;
	}
	const files = fs.readdirSync(startPath);
	for (let i = 0; i < files.length; i++) {
		const filename = path.join(startPath, files[i]);
		const stat = fs.lstatSync(filename);
		if (stat.isDirectory()) {
			fromDir(filename, filter, callback); //recurse
		} else if (filter.test(filename)) {
			callback(filename, files[i]);
		}
	}
};

const justPrint = (filePath, fileName) => {
	console.log("-- found: " + filePath, fileName.split(".")[0]);
};

const addTolist = (filePath, fileName) => {
	iconNames.push({
		iconName: fileName.split(".")[0],
		filePath,
		used: false,
	});
};
const checkIfUnsused = (filePath, fileName) => {
	const data = fs.readFileSync(filePath);
	console.log("working on " + fileName + "\\n");
	iconNames.forEach((icon, index, iconList) => {
		if (icon.iconName.includes("active")) {
			console.log(icon.iconName);
			iconList[index].used = true;
		}

		if (data.includes(`${icon.iconName}`)) {
			console.log("--- icon used", icon.iconName);
			iconList[index].used = true;
		}
	});
};
fromDir("www", /\.svg$/, justPrint);
fromDir("www", /\.svg$/, addTolist);
fromDir("www", /\.jpg$/, justPrint);
fromDir("www", /\.jpg$/, addTolist);
fromDir("www", /\.jpeg$/, justPrint);
fromDir("www", /\.jpeg$/, addTolist);
fromDir("www", /\.ttf$/, justPrint);
fromDir("www", /\.ttf$/, addTolist);
fromDir("www", /\.png$/, justPrint);
fromDir("www", /\.png$/, addTolist);
fromDir("www", /\.(js|css|html|scss|ts)$/, checkIfUnsused);
const tempIcons = [...iconNames];
iconNames = uniqueArray(tempIcons);
iconNames.forEach((icon) => {
	if (!icon.used) {
		console.log("--- will delete unused icon", icon.iconName);
		fs.unlink(icon.filePath, (err) => {
			if (err) {
				console.error(err);
			}
		});
	}
});
