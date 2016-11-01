
const fs       = require('fs');
const log      = apprequire('helpers/log');
const touch    = require('touch');
const copydir  = require('copy-dir');
const copyfile = apprequire('helpers/copy-file-sync');

function createProject(name) {
	// Create project folder
	fs.mkdirSync(name);
	const projectPath = process.cwd() + '/' + name + '/';
	log('create', name + '/');

	/** ##########
	    APP FOLDER 
	    ########## */
	// Create app folder
	fs.mkdirSync(projectPath + 'app');
	log('create', 'app/');

	// Copy assets
	fs.mkdirSync(projectPath + 'app/assets');
	copydir.sync(basePath + 'app/assets', projectPath + 'app/assets');
	log('create', 'assets/', 1);

	// Create other folders
	fs.mkdirSync(projectPath + 'app/controllers');
	log('create', 'controllers/', 1);

	fs.mkdirSync(projectPath + 'app/helpers');
	log('create', 'helpers/', 1);

	fs.mkdirSync(projectPath + 'app/models');
	log('create', 'models/', 1);

	// Create views folder and copy base view
	fs.mkdirSync(projectPath + 'app/views');
	log('create', 'views/', 1);
	fs.mkdirSync(projectPath + 'app/views/layout');
	copydir.sync(basePath + 'app/views/layout', projectPath + 'app/views/layout');
	log('create', 'layout/', 2);


	/** ##########
	    BIN
	    ########## */
	fs.mkdirSync(projectPath + 'bin/');
	copydir.sync(basePath + 'bin/', projectPath + 'bin/');
	fs.chmodSync(projectPath + 'bin/production.sh', 0755);
	fs.chmodSync(projectPath + 'bin/development.sh', 0755);
	log('create', 'bin/');

	/** ##########
	    OTHER FOLDERS
	    ########## */
	fs.mkdirSync(projectPath + 'config/');
	copydir.sync(basePath + 'config/', projectPath + 'config/');
	log('create', 'config/');

	fs.mkdirSync(projectPath + 'gulpfile.js/');
	copydir.sync(basePath + 'gulpfile.js/', projectPath + 'gulpfile.js/');
	log('create', 'gulpfile.js/');

	fs.mkdirSync(projectPath + 'public/');
	copydir.sync(basePath + 'public/', projectPath + 'public/');
	log('create', 'public/');

	fs.mkdirSync(projectPath + 'tests/');
	copydir.sync(basePath + 'tests/', projectPath + 'tests/');
	log('create', 'tests/');

	/** ##########
	    FILES
	    ########## */
	copyfile(basePath + 'gitignore', projectPath + '.gitignore');
	log('create', '.gitignore');

	copyfile(basePath + 'app.js', projectPath + 'app.js');
	log('create', 'app.js');

	let packageJson = require(basePath + 'package.json');
	packageJson.name = name;
	packageJson.description = "An ike project";
	packageJson = JSON.stringify(packageJson, null, '\t');
	fs.writeFileSync(projectPath + 'package.json', packageJson);
	log('create', 'package.json');
}

module.exports = createProject;
