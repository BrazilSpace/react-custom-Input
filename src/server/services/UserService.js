const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');


exports.login = async (bean) => {
  const { account, password } = bean;
  const accessTokenSecret = 'youraccesstokensecret';

  const user = await userModel.find(u => u.account === account && u.password === password);
  const accessToken = user ? jwt.sign({ username: user.username, role: user.role }, accessTokenSecret) : null;

  return accessToken;
};
