const BaseModel = require('./baseModel');
const mongoose = require('../initializers/database').mongo;

const userModel = new BaseModel({
  account: {
    type: String,
    index: { unique: true },
    required: [true, '帳號為必填欄位'],
  },
  password: {
    type: String,
    required: [true, '帳號為必填欄位'],
  },
}, {
  versionKey: false,
  collection: 'user',
});

module.exports = mongoose.model('user', userModel);
