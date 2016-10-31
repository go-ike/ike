const fs         = require("fs");
const log        = apprequire('helpers/log.js');
const decamelize = require('decamelize');
const normalize  = apprequire('helpers/normalize');

function makeViews(controllerName, routes) {
	const baseView  = fs.readFileSync(basePath + 'app/views/sample/index.html', 'utf-8');
	const controllerViewsPath = normalize.viewDirPath(controllerName);

	fs.mkdirSync(controllerViewsPath);
	log('create', 'app/views/' + normalize.controllerName(controllerName));

	for(route of routes) {
		let view = (JSON.parse(JSON.stringify(baseView)));
		let viewPath = normalize.viewFilePath(route, controllerName);

		view = view.replace('Hello world!', 'Hello ' + route + '!');
		fs.writeFileSync(viewPath, view);
		log('create', route + '.html', 1);
	}
}

module.exports = makeViews;
