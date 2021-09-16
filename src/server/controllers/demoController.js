const { Router } = require('express');

const rootRouter = Router();
const router = Router();

/**
 * 舉例
 */
router.post('/', async (req, res) => {

});

rootRouter.use('/demo', router);

module.exports = rootRouter;
