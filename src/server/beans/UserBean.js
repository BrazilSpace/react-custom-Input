const BaseBean = require('./BaseBean');

/**
 * 使用者的相關input
 * @param {srting} account 帳號
 * @param {srting} password 密碼
 * @returns {object}
 */
module.exports = class UserBean extends BaseBean {
  constructor() {
    super();
    this.input = {
      account: null,
      password: null,
    };
  }
};
