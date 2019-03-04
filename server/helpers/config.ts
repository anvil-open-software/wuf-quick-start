declare var require: any;

const path = require('path');
const fs = require('fs');
const env = require('get-env')();

// Get global props
const globalConfigFileName = 'config.global.json';
const globalConfigFile = path.join('./', 'server', 'configuration', globalConfigFileName);
const globalJson = JSON.parse(fs.readFileSync(globalConfigFile).toString());

const config = globalJson;

// Get environment-specfic overrides
const envConfigFileName = 'config.' + env + '.json';
const envConfigFile = path.join('./', 'server', 'configuration', envConfigFileName);
const envJson = JSON.parse(fs.readFileSync(envConfigFile).toString());

// Add all of the environment-specific props and overrides to the config
for (const att in envJson) {
    if (envJson.hasOwnProperty(att)) {
        config[att] = envJson[att];
    }
}

export default config;
