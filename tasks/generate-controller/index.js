
const fs = require('fs');
const pluralize = require('pluralize');
const chalk = require('chalk');
const log = require('../../helpers/log.js');

const makeController = require('./make-controller.js');
const makeRoutes = require('./make-routes.js');
const makeView = require('./make-views.js');

function generateController(args) {
	let ignorePluralWarning = args.i;
	let controllerName = normalizeControllerName(args._[2]);
	let functionsArray = args._.slice(3);

	let controllerFileName = normalizeFileName(controllerName);
	let controllerFilePath = process.cwd() + '/app/controllers/' + controllerFileName;
	
	let routesFilePath = process.cwd() + '/config/routes.js';

	// Controller plural warning
	if(pluralize(controllerName) !== controllerName && !ignorePluralWarning) {
		console.log(chalk.red.bold('Controllers should always be a plural'));
		console.log('Try: ' + chalk.underline('ike g controller ' + pluralize(controllerName).toLowerCase()));
		console.log('To ignore this, use -i option');
		return;
	}

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
