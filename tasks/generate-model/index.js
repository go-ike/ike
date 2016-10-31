const fs        = require('fs');
const esprima   = require('esprima');
const escodegen = require('escodegen');
const log       = apprequire('helpers/log');
const makeModel = require('./make-model.js');
const validate  = require('./validate.js');
const normalize = apprequire('helpers/normalize');

function generateModel(args) {
	const modelName = normalize.modelClassName(args._[2]);
	const modelFileName = normalize.modelFileName(args._[2]);
	const modelFilePath = normalize.modelFilePath(args._[2]);

	if(!validate(modelName, args)) return;

	const modelCode = makeModel(modelName);
	fs.writeFileSync(modelFilePath, modelCode);
	log('create', 'app/models/' + modelFileName);
}

module.exports = generateModel;
