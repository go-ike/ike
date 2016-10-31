const fs        = require('fs');
const esprima   = require('esprima');
const escodegen = require('escodegen');

function makeModel(modelName) {
	let schemaName = modelName + 'Schema';

	const file = fs.readFileSync(basePath + 'app/models/sample.model.js', 'utf-8');
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
	let ast = esprima.parse(file, astOptions);

	ast.body[2].declarations[0].id.name = schemaName;
	ast.body[3].expression.right.arguments[0].value = modelName;
	ast.body[3].expression.right.arguments[1].name = schemaName;

	// Create the js file from the modified AST
	let code = escodegen.attachComments(ast, ast.comments, ast.tokens);
	code = escodegen.generate(code, codeOptions);
	
	return code;
}

module.exports = makeModel;