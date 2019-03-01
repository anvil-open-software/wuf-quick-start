import { Router } from 'express';
import { Results } from '../../models/results';


const authRouter = Router();

authRouter.route('/authenticate').post((req, res) => {

    const results: Results = {};

    // Authenticate configured off
    results.data = {};
    results.info = 'No authentication required.';
    results.success = true;

    return res.json(results);

});

export default authRouter;
