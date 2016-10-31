const camelcase      = require('camelcase');
const decamelize     = require('decamelize');
const projectPath    = process.cwd();

module.exports.modelClassName = modelClassName;
function modelClassName(name) {
	return className(name);
}

module.exports.modelFileName = modelFileName;
function modelFileName(name) {
	return decamelize(modelClassName(name), '-') + '.model.js';
}
module.exports.modelFilePath = modelFilePath;
function modelFilePath(name) {
	return projectPath + '/app/models/' + modelFileName(name);
}


module.exports.controllerClassName = controllerClassName;
function controllerClassName(name) {
	return className(name);
}

module.exports.controllerName = controllerName;
function controllerName(name) {
	return decamelize(controllerClassName(name), '-');
}

module.exports.controllerFileName = controllerFileName;
function controllerFileName(name) {
	return controllerName(name) + '.controller.js';
}

module.exports.controllerRelativePath = controllerRelativePath;
function controllerRelativePath(name) {
	return 'controllers/' + controllerName(name);
}

module.exports.controllerFilePath = controllerFilePath;
function controllerFilePath(name) {
	return projectPath + '/app/controllers/' + controllerFileName(name);
}



module.exports.functionName = functionName;
function functionName(name) {
	return camelcase(name);
}



module.exports.viewFileName = viewName;
function viewName(name) {
	return decamelize(functionName(name), '-');
}

module.exports.viewFileName = viewFileName;
function viewFileName(name) {
	return viewName(name) + '.html';
}

module.exports.viewRelativeFilePath = viewRelativeFilePath;
function viewRelativeFilePath(name, ctrlName) {
	return controllerName(ctrlName) + '/' + viewName(name);
}

module.exports.viewDirPath = viewDirPath;
function viewDirPath(ctrlName) {
	let controllerFolderName = controllerName(ctrlName);
	return projectPath + '/app/views/' + controllerFolderName + '/';
}

module.exports.viewFilePath = viewFilePath;
function viewFilePath(name, ctrlName) {
	return viewDirPath(ctrlName) + viewFileName(name);
}


function className(name) {
	name = camelcase(name);
	return name.charAt(0).toUpperCase() + name.slice(1);
}


module.exports.routesFilePath = routesFilePath;
function routesFilePath() {
	return projectPath + '/config/routes.js';
}