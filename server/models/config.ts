import {NavConfig} from './config-nav';

export interface Config {
    id?:             string;
    name?:           string;
    copyrightName?:  string;
    navigation?:     NavConfig;
    themeCssUrl?:    string;
}

export default Config;
