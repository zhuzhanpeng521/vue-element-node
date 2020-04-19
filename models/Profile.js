/*
 * @Author: zhu.zhanpeng 
 * @Date: 2020-03-24 15:51:19 
 * @Last Modified by: zhu.zhanpeng
 * @Last Modified time: 2020-03-31 12:25:11
 */
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  type: {
    type: String,
  },
  describe: {
    type: String,
  },
  income: {
    type: String,
    required: true
  },
  expend: {
    type: String,
    required: true
  },
  cash: {
    type: String,
    required: true
  },
  remark: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now
  }
})

module.exports = Profile = mongoose.model('profile',ProfileSchema);