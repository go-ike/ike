
const fs = require('fs');
const pluralize = require('pluralize');
const chalk = require('chalk');
const makeController = require('./make-controller.js');

function generateController(args) {
	let ignorePluralWarning = args.i;
	let controllerName = normalizeControllerName(args._[2]);
	let functionsArray = args._.slice(3);
	let fileName = normalizeFileName(controllerName);
	let filePath = process.cwd() + '/app/controllers/' + fileName;

	// Controller plural warning
	if(pluralize(controllerName) !== controllerName && !ignorePluralWarning) {
		console.log(chalk.red.bold('Controllers should always be a plural'));
		console.log('Try: ' + chalk.underline('ike g controller ' + pluralize(controllerName).toLowerCase()));
		console.log('To ignore this, use -i option');
		return;
	}

	const controllerCode = makeController(controllerName);
	fs.writeFileSync(filePath, controllerCode);
}

function normalizeControllerName(name) {
	return name[0].toUpperCase() + name.substring(1).toLowerCase();
}

function normalizeFileName(name) {
	return name.toLowerCase() + '.controller.js';
}

module.exports = generateController;
