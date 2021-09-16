const { Router } = require('express');
const UserBean = require('../beans/UserBean');
const UserService = require('../services/UserService');
const ResponseObject = require('../lib/ResponseObject');

const rootRouter = Router();
const router = Router();

/**
 * 登入
 * @param account 帳號
 * @param password 密碼
 * @returns {object}
 */
router.post('/login', async (req, res) => {
  const bean = new UserBean(req, 'user');
  UserService.login(bean)
    .then((accessToken) => {
      if (accessToken) res.json(ResponseObject.createSuccessObject());
      else res.json(ResponseObject.createSuccessObject(404, 'Username or password incorrect'));
    });
});
rootRouter.use('/auth', router);

module.exports = rootRouter;
