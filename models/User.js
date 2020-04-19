/*
 * @Author: zhu.zhanpeng 
 * @Date: 2020-03-24 15:51:19 
 * @Last Modified by: zhu.zhanpeng
 * @Last Modified time: 2020-03-29 16:37:41
 */
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
  },
  identity: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model('users',userSchema);