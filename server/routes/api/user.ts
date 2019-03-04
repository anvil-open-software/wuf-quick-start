// CRUD: Simple Create, Read, Update, Delete api operations for data management.

import { Router } from 'express';
import { Results } from '../../models/results';
import log from '../../helpers/bunyan';

const modelName = 'user'; // This needs to exactly match the corresponding file name under /server/models/, minus the extension
const modelPath = __dirname + '/../../models/';
const model = require(modelPath + modelName).default;
const crudRouter = Router();

log.info(`Creating CRUD routes for ${modelName}`);

// Create routes for plural object fetching
crudRouter.route('/' + modelName + 's')
// C(reate)
.post((req: any, res: any, next: any) => {

    const results: Results = {};
    const m = new model();

    Object.assign(m, req.body);

    return m.save()
    .then((saved_m) => {
        if (!saved_m) {
            // Success!
            results.info = 'Could not save new ' + modelName + '.';
            results.success = false;

            return res.json(results);
        }
        else {
            saved_m = saved_m.toObject ? saved_m.toObject() : saved_m;
            delete saved_m.password; // Remove the password property before it is sent to the client

            // Success!
            results.data = saved_m;
            results.info = modelName + ' created successfully';
            results.success = true;

            return res.json(results);
        }
    })
    .catch((err) => {
        results.info = 'Could not create new ' +  modelName + '.';
        results.success = false;

        return res.json(results);
    });
})

// R(ead) all documents from model
.get((req: any, res: any, next: any) => {

    const results: Results = {};
    const fields = '-password'; // Don't return passwords

    model.find({}, fields).exec()
    .then((ms) => {
        if (!ms || !ms.length) {
            results.info = 'Found no ' + modelName + 's.';
            results.success = false;
            return res.json(results);
        }
        else {
            results.info = 'Found ' + modelName + 's successfully.';
            results.success = true;
            results.data = ms;
            return res.json(results);
        }
    })
    .catch((err) => {
        results.info = err;
        results.success = false;

        return res.json(results);
    });
});

// Create routes for SAFE plural object fetching
crudRouter.route('/' + modelName + 's/safe')
// R(ead) all documents from model.  This route returns sanitized user details
.get((req: any, res: any, next: any) => {

    const results: Results = {};
    const fields = '-_id first last includeOnSite imageUrl synopsis sortOrder specialty resumeUrl'; // Only return safe results

    model.find({}, fields).exec()
    .then((ms) => {
        if (!ms || !ms.length) {
            results.info = 'Found no ' + modelName + 's.';
            results.success = false;
            return res.json(results);
        }
        else {
            results.info = 'Found ' + modelName + 's successfully.';
            results.success = true;
            results.data = ms;
            return res.json(results);
        }
    })
    .catch((err) => {
        results.info = err;
        results.success = false;

        return res.json(results);
    });
});

// Create routes for singular model fetching (i.e., for a specific object with a given ID)
crudRouter.route('/' + modelName + 's/:id')
// R(ead) a single document from model by matching ID
.get((req: any, res: any, next: any) => {

    const fields = '-password'; // Don't return passwords
    const results: Results = {};

    model.findById(req.params.id, fields).exec()
    .then((m) => {
        if (!m) {
            results.info = 'No ' + modelName + ' found.';
            results.success = false;
            return res.json(results);
        }
        else {
            results.info = 'Found ' + modelName + ' successfully.';
            results.success = true;
            results.data = m;
            return res.json(results);
        }
    })
    .catch((err) => {
        results.info = err;
        results.success = false;

        return res.json(results);
    });
})

// U(pdate) a single document by id using req.body
.put((req: any, res: any, next: any) => {

    const fields = '-password'; // Don't return passwords
    const results: Results = {};

    model.findById(req.body._id, fields).exec()
    .then((m) => {
        if (!m) {
            results.info = 'Could not update ' + modelName + '.';
            results.success = false;
            return res.json(results);
        }
        else {
            Object.assign(m, req.body);
            m.modified = new Date();

            return m.save()
            .then((saved_m) => {
                if (!saved_m) {
                    results.info = 'Could not update ' + modelName + '.';
                    results.success = false;
                    return res.json(results);
                }
                else {
                    saved_m = saved_m.toObject ? saved_m.toObject() : saved_m;
                    delete saved_m.password; // Remove the password property before it is sent to the client

                    // Success!
                    results.data = saved_m;
                    results.info = 'Updated ' + modelName + ' successfully.';
                    results.success = true;

                    return res.json(results);
                }
            })
            .catch((err) => {
                results.info = err;
                results.success = false;

                return res.json(results);
            });
        }
    })
    .catch((err) => {
        results.info = err;
        results.success = false;

        return res.json(results);
    });
})

// D(elete) a single document by id
.delete((req: any, res: any, next: any) => {

    const results: Results = {};

    model.deleteOne({_id: req.params.id}).exec()
    .then((m) => {
        results.info = 'Deleted ' + modelName + ' successfully.';
        results.success = true;
        return res.json(results);
    })
    .catch((err) => {
        results.info = err;
        results.success = false;

        return res.json(results);
    });
});

export default crudRouter;
