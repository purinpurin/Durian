var babel = require("@babel/core");
var fs = require("fs");

var template = fs.readFileSync("./userscript/template.js").toString();
var code = babel.transformFileSync("./app/scripts/app.js").code;

var nano = function (template, data) {
	return template.replace(/\{([\w\.]*)\}/g, function (str, key) {
		let keys = key.split("."),
			v = data[keys.shift()];
		for (let i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
		return (typeof v !== "undefined" && v !== null) ? v : "";
	});
};

var renderOut = function (outFile, dependencies) {
	var ujs = nano(template, {
		dependencies: dependencies,
		code: code,
		time: (+new Date())
	});

	fs.writeFile(outFile, ujs, function (err) {
		if (err) {
			return console.log(err);
		}
		return console.log('build-out:' + outFile);
	});
};

var dependencies = `// @require      https://ajax.googleapis.com/ajax/libs/myanmar-tools/1.1.3/zawgyi_detector.min.js
// @require      https://ajax.googleapis.com/ajax/libs/myanmar-tools/1.1.3/zawgyi_converter.min.js`;

var dependencies_gf = `// @require      https://ajax.googleapis.com/ajax/libs/myanmar-tools/1.1.3/zawgyi_detector.js
// @require      https://ajax.googleapis.com/ajax/libs/myanmar-tools/1.1.3/zawgyi_converter.js`;

renderOut('./userscript/release/durian.user.js', dependencies);
// //greasyfork version
renderOut('./userscript/release/durian.gf.user.js', dependencies_gf);	