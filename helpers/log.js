
const chalk = require('chalk');

const actionColumnSize = 8;
const actionColumnPadding = 2;
const indentSize = 2;

function log(action, description, indent) {
	if(!action || action === '') {
		console.log();
		return;
	}

	action = actionString(action);
	description = descriptionString(description, indent);
	console.log(action + description);
}

function actionString(action) {
	const actionSize = action.length;

	if (actionSize > actionColumnSize) {
		action = action.substring(0,11) + '.';
		action = fillWithSpaces(action, actionColumnPadding);
	} else {
		let spaces = (actionColumnSize - actionSize) + actionColumnPadding;
		action = fillWithSpaces(action, spaces);
	}

	return actionColor(action);
}

function descriptionString(description, indent) {
	if (!indent || indent === 0 || isNaN(indent))
		return description;
	else
		return preceedWithSpaces(description, indent*indentSize);

}

function actionColor(action) {
	let actionLog;

	switch(action.trim()) {
		case "create":
			actionLog = chalk.bold.green(action);
			break;
		case 'deleted':
			actionLog = chalk.red.bold(action);
			break;
		case 'modified':
			actionLog = chalk.yellow.bold(action);
			break;
		default:
			actionLog = chalk.bold(action);
	}

	return actionLog;
}

function fillWithSpaces(string, spaces) {
	for (let i=0; i < spaces; i++) {
		string = string + ' ';
	}
	return string;
} 

function preceedWithSpaces(string, spaces) {
	for (let i=0; i < spaces; i++) {
		string = ' ' + string;
	}
	return string;
}

module.exports = log;
