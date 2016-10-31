const fs             = require('fs');
const esprima        = require('esprima');
const escodegen      = require('escodegen');
const uppercamelcase = require('uppercamelcase');
const decamelize     = require('decamelize');
const log            = apprequire('helpers/log');
const makeModel      = require('./make-model.js');

function generateModel(args) {
	const modelName = uppercamelcase(args._[2]);
	const modelFileName = decamelize(modelName, '-') + '.model.js';
	const modelFilePath = process.cwd() + '/app/models/' + modelFileName;

	const modelCode = makeModel(modelName);
	fs.writeFileSync(modelFilePath, modelCode);
	log('create', 'app/models/' + modelFileName);
}

module.exports = generateModel;
