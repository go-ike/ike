const pluralize = require('pluralize');
const chalk     = require('chalk');
const fs        = require('fs');
const normalize = apprequire('helpers/normalize.js');

function validate(modelName, args) {
	const ignoreSingularWarning = args.i;

	/**
	 * NAME SHOULD BE SINGULAR
	 * The controller name should be a plural. To
	 * overwrite this rule, pass -i .
	 */
	if(pluralize(modelName) == modelName && !ignoreSingularWarning) {
		console.log(chalk.red.bold('Models should always be in singular'));
		console.log('Try: ' + chalk.underline('ike g controller ' + pluralize(modelName, 1).toLowerCase()));
		console.log('To ignore this, use -i option');
		return false;
	}

	/**
	 * MODEL FILE MUST BE UNIQUE
	 * The controller name should be a plural. To
	 * overwrite this rule, pass -i .
	 */
	let modelFilePath = normalize.modelFilePath(modelName);
	try {
		fs.accessSync(modelFilePath);
		console.log(chalk.red.bold('app/models/' + normalize.modelFileName(modelName) + ' already exists'));
		console.log('Why don\'t you choose another name?');
		return false;
	} catch (e) { 
		// Nothing to catch. Error means there's no file,
		// which is what's needed.
	}

	return true;
}

module.exports = validate;
