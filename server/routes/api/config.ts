// CRUD: Simple Create, Read, Update, Delete api operations for data management.

import { Router } from 'express';
import log from '../../helpers/bunyan';
import { Results } from '../../models/results';
import Config from '../../models/config';
import { appDefaultConfig } from '../../../src/app/_internal/configuration/configuration';


const modelName = 'config'; // This needs to exactly match the corresponding file name under /server/models/, minus the extension

const crudRouter = Router();

log.info(`Creating CRUD routes for ${modelName}`);

// Create routes for plural object fetching
crudRouter.route('/' + modelName)
// R(ead) all documents from model
.get((req: any, res: any, next: any) => {

    const results: Results = {};
    const config: Config = appDefaultConfig; // By default the config is set to match that from /src/app/_internal/configuration/configuration

    results.info = 'Retrieved ' + modelName + ' from BFF';
    results.success = true;
    results.data = config;

    return res.json(results);
});

export default crudRouter;
