const fs        = require("fs");
const esprima   = require('esprima');
const escodegen = require('escodegen');

function makeController(name) {
	const file = fs.readFileSync(basePath + 'app/controllers/samples.controller.js', 'utf-8');
	const astOptions = {
		range: true,
		tokens: true,
		comment: true 
	};
	const codeOptions = {
		comment: true,
		sourceCode: file,
		format: { preserveBlankLines: true }
	};

	// Parse the file into an AST
	let ast = esprima.parse(file, astOptions);

	ast = setControllerName(ast, name);
	ast = createFunctions(ast, name, ['index', 'create', 'remove', 'list']);

	// Create the js file from the modified AST
	let code = escodegen.attachComments(ast, ast.comments, ast.tokens);
	code = escodegen.generate(code, codeOptions);

	return code;
}

function setControllerName(ast, name) {
	name = name + 'Controller';

	// Change the class name
	ast.body[0].id.name = name;

	// Change module.exports
	ast.body[1].expression.right.name = name;

	return ast;
}

function createFunctions(ast, controllerName, functionNameArray) {
	let classBody = ast.body[0].body.body;
	const functionBlock = ast.body[0].body.body[0];
	controllerName = controllerName.toLowerCase();

	for (let functionName of functionNameArray) {
		let func = (JSON.parse(JSON.stringify(functionBlock)));;

		func.key.name = functionName;
		func.value.body.body[1].expression.arguments[0].value = controllerName + '/' + functionName;

		classBody.push(func);
	}

	classBody.splice(0, 1);

	return ast;
}

module.exports = makeController;
