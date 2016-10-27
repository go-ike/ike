
const chalk = require('chalk');
const log = require('helpers/log.js');

function newProject(args) {
	const name = args._[1];

	if (!name) {
		console.log(chalk.red.bold('Did you forget the project name?') + ' Try: ');
		console.log('$ ike new projectname');
		return;
	}

}

module.exports = newProject;