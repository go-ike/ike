const pluralize    = require('pluralize');
const chalk        = require('chalk');
const fs           = require('fs');
const isIkeRoot    = apprequire('helpers/is-ike-root');
const isIkeProject = apprequire('helpers/is-ike-project');

function validate(controllerName, routes, args) {
	const ignorePluralWarning = args.i;

	/**
	 * SHOULD BE AT PROJECT ROOT
	 * This commands should only be ran at the
	 * project root path.
	 */
	if(!isIkeProject()) {
		console.log(chalk.red.bold('Not an ike project'));
		console.log('Why don\'t you create a new project first?');
		console.log('$ ike new project-name');
		return false;
	}

	if(isIkeProject() && !isIkeRoot()) {
		console.log(chalk.red.bold('Not at the project root'));
		console.log('Generation tasks only work from the project root');
		return false;
	}
	

	/**
	 * NAME SHOULD BE PLURAL
	 * The controller name should be a plural. To
	 * overwrite this rule, pass -i .
	 */
	if(pluralize(controllerName) !== controllerName && !ignorePluralWarning) {
		console.log(chalk.red.bold('Controllers should always be a plural'));
		console.log('Try: ' + chalk.underline('ike g controller ' + pluralize(controllerName).toLowerCase()));
		console.log('To ignore this, use -i option');
		return false;
	}

	/**
	 * CONTROLLER FILE MUST BE UNIQUE
	 * The controller name should be a plural. To
	 * overwrite this rule, pass -i .
	 */
	let controllerPath = process.cwd() + '/app/controllers/' + controllerName.toLowerCase() + '.controller.js';
	try {
		fs.accessSync(controllerPath);
		console.log(chalk.red.bold('app/controllers/' + controllerName.toLowerCase() + '.js already exists'));
		console.log('Why don\'t you choose another name?');
		return false;
	} catch (e) { 
		// Nothing to catch. Error means there's no file,
		// which is what's needed.
	}

	/**
	 * VIEWS DIRECTORY MUST NOT EXIST
	 * The views directory should represent the controller's
	 * name. If the directory exists, can't create the
	 * controller
	 */
	let controllerViewsPath = process.cwd() + '/app/views/' + controllerName.toLowerCase() + '/'
	try {
		fs.accessSync(controllerViewsPath);
		console.log(chalk.red.bold('Folder app/views/' + controllerName.toLowerCase() + '/ already exists'));
		console.log('Why don\'t you choose another name?');
		return false;
	} catch (e) { 
		// Nothing to catch. Error means there's no file,
		// which is what's needed.
	}

	/**
	 * ROUTES MUST BE UNIQUE
	 * The routes passed after the controller name should
	 * be unique.
	 */
	if(duplicateRoutes(routes)) {
		console.log(chalk.red.bold('All route names must be unique'));
		console.log('Why don\'t you rename the duplicates?');
		return false;
	}

	return true;
}

function duplicateRoutes(routes) {
	return routes.some(function(route, idx){
		return routes.indexOf(route) != idx;
	});
}

module.exports = validate;
