const fs = require("fs");
const log = apprequire('helpers/log.js');
const decamelize = require('decamelize');

function makeViews(controllerName, routes) {
	const baseView  = fs.readFileSync(basePath + 'app/views/sample/index.html', 'utf-8');
	const viewsPath = process.cwd() + '/app/views/';
	const controllerViewsPath = viewsPath + controllerName.toLowerCase() + '/';

	fs.mkdirSync(controllerViewsPath);
	log('create', 'app/views/' + controllerName.toLowerCase());

	for(route of routes) {
		let view = (JSON.parse(JSON.stringify(baseView)));
		let viewPath = controllerViewsPath + normalizeViewFileName(route) + '.html';

		view = view.replace('Hello world!', 'Hello ' + route + '!');
		fs.writeFileSync(viewPath, view);
		log('create', route + '.html', 1);
	}
}

function normalizeViewFileName(name) {
	return decamelize(name);
}

module.exports = makeViews;
