const { Router } = require('express');
const demoController = require('../controllers/demoController');
const authController = require('../controllers/authController');


const apiRouter = () => {
  const router = Router();
  router.use(demoController);
  router.use(authController);
  return router;
};

module.exports = apiRouter;
