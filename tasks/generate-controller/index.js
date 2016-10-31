const fs                 = require('fs');
const pluralize          = require('pluralize');
const chalk              = require('chalk');
const log                = apprequire('helpers/log');
const normalize          = apprequire('helpers/normalize');
const validateController = require('./validate.js');
const makeController     = require('./make-controller.js');
const makeRoutes         = require('./make-routes.js');
const makeView           = require('./make-views.js');

function generateController(args) {
	const controllerName     = normalize.controllerClassName(args._[2]);
	const controllerFileName = normalize.controllerFileName(args._[2]);
	const controllerFilePath = normalize.controllerFilePath(args._[2]);
	const routesFilePath     = normalize.routesFilePath();
	const functionsArray     = args._.slice(3);

	if(!validateController(controllerName, functionsArray, args)) return;

	const controllerCode = makeController(controllerName, functionsArray);
	fs.writeFileSync(controllerFilePath, controllerCode);
	log('create', 'app/controllers/' + controllerFileName);

	const amendedRoutes = makeRoutes(controllerName, functionsArray);
	fs.writeFileSync(routesFilePath, amendedRoutes);
	log('modified', 'config/routes.js');

	makeView(controllerName, functionsArray);
}

function normalizeControllerName(name) {
	return name[0].toUpperCase() + name.substring(1).toLowerCase();
}

function normalizeFileName(name) {
	return name.toLowerCase() + '.controller.js';
}

module.exports = generateController;
