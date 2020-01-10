import Config from '../models/config';
const path = require('path');
const fs = require('fs');

const LocalConfigLib: any = {};

LocalConfigLib.getAppDefaultConfig = function () {
    const appDefaultConfigFile = path.join('./', 'data', 'appDefaultConfig.json');
    const config: Config = JSON.parse(fs.readFileSync(appDefaultConfigFile).toString());

    return config;
};

export default LocalConfigLib;

