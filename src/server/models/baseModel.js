const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const util = require('util');

/**
 * document基礎欄位新增
 */
function BaseModel() {
  mongoose.Schema.apply(this, arguments);
  this.add({
    __target: String,
    __targetVer: Number,
    creator: String,
    modifier: String,
    deletor: String,
    valid: { type: Boolean, default: true },
    invalidTime: Date,
  });
  this.plugin(timestamps, { createdAt: 'createTime', updatedAt: 'modifyTime' });
}
util.inherits(BaseModel, mongoose.Schema);

module.exports = BaseModel;
