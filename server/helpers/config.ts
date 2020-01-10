declare var require: any;

const path = require('path');
const fs = require('fs');

// Get global props
const globalConfigFileName = 'globalConfig.json';
const globalConfigFile = path.join('./', 'data', globalConfigFileName);
const globalJson = JSON.parse(fs.readFileSync(globalConfigFile).toString());

const config = globalJson;

// Get environment-specific overrides
const envConfigFileName = 'localConfig.json';
const envConfigFile = path.join('./', 'configuration', envConfigFileName);
const envJson = JSON.parse(fs.readFileSync(envConfigFile).toString());

// Add all of the environment-specific props and overrides to the config
for (const att in envJson) {
    if (envJson.hasOwnProperty(att)) {
        config[att] = envJson[att];
    }
}

export default config;
