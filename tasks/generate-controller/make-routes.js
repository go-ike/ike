const fs        = require("fs");
const esprima   = require('esprima');
const escodegen = require('escodegen');
const normalize = apprequire('helpers/normalize');

function makeRoutes(name, routes) {
	const baseFile = fs.readFileSync(basePath + 'config/routes.js', 'utf-8');
	const projectFile = fs.readFileSync(process.cwd() + '/config/routes.js', 'utf-8');
	const astOptions = {
		range: true,
		tokens: true,
		comment: true
	};
	const codeOptions = {
		comment: true,
		sourceCode: projectFile,
		format: { preserveBlankLines: true }
	};

	// Parse the base route file into an AST
	let baseFileAst = esprima.parse(baseFile, astOptions);
	let controllerRequire = makeControllerRequire(baseFileAst, name);
	let routeDeclarations = makeRoutesBlock(baseFileAst, name, routes);

	// Parse the project file and modify it
	let projectFileAst = esprima.parse(projectFile, astOptions);
	let last = projectFileAst.body.length - 1;
	let lastNodeRange = projectFileAst.body[last].range;
	let updateNodeRange = [lastNodeRange[0] + 10000, lastNodeRange[0] + 20000]; 

	// Insert controller require
	controllerRequire.range = updateNodeRange;
	projectFileAst.body.splice(last, 0, controllerRequire);
		
	// Insert routes
	for (i=routeDeclarations.length; i > 0; i--) {
		let routeDeclaration = routeDeclarations[i-1];
		routeDeclaration.range = updateNodeRange;
		projectFileAst.body.splice(last+1, 0, routeDeclaration);
	} 

	// Create the js file from the modified AST
	let code = escodegen.attachComments(projectFileAst, projectFileAst.comments, projectFileAst.tokens);
	code = escodegen.generate(code, codeOptions);

	// Add a newline before module.exports
	code = code.replace('module.exports = r', '\nmodule.exports = r');

	return code;
}

function makeControllerRequire(baseFileAst, name) {
	const controllerClassName = normalize.controllerClassName(name);
	const controllerRelativePath = normalize.controllerRelativePath(name);
	let controllerRequire = (JSON.parse(JSON.stringify(baseFileAst.body[2])));

	controllerRequire.declarations[0].id.name = controllerClassName;
	controllerRequire.declarations[0].init.callee.arguments[0].value = controllerRelativePath;

	return controllerRequire;
}

function makeRoutesBlock(baseFileAst, controllerName, routes) {
	const controllerClassName = normalize.controllerClassName(controllerName);
	controllerName = normalize.controllerName(controllerName);

	let routeDeclaration = baseFileAst.body[3];
	let newRoutes = [];

	for (let routeName of routes) {
		let route = (JSON.parse(JSON.stringify(routeDeclaration)));
		route.expression.arguments[0].value = controllerName + '/' + routeName;
		route.expression.arguments[1].object.name = controllerClassName;
		route.expression.arguments[1].property.name = routeName;

		newRoutes.push(route);
	}

	return newRoutes;
}

module.exports = makeRoutes;
