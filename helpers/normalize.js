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

module.exports.controllerFileName = controllerFileName;
function controllerFileName(name) {
	return decamelize(modelClassName(name), '-') + '.controller.js';	
}

module.exports.controllerFilePath = controllerFilePath;
function controllerFilePath(name) {
	return projectPath + '/app/controllers/' + modelFileName(name);
}



function className(name) {
	name = camelcase(name);
	return name.charAt(0).toUpperCase() + name.slice(1);
}
