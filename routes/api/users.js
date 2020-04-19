/*
 * @Author: zhu.zhanpeng 
 * @Date: 2020-03-24 15:51:15 
 * @Last Modified by: zhu.zhanpeng
 * @Last Modified time: 2020-04-13 15:52:23
 */
// @login & register
const express = require("express")
const router = express.Router()
const User = require("../../models/User")
const bcrypt = require("bcrypt")
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require("passport")

//$route GET api/user/test
//@desc  返回的json数据

router.get("/test", (req, res) => {
  res.json({ msg: "router is work！" })
})

//$route POST api/users/register
//@desc  返回的json数据
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        res.status(400).json({ email: '该邮箱已经被注册了!' })
      } else {
        const data = req.body;
        const avatar = gravatar.url(data.email, {s: '200', r: 'pg', d: 'mm'});
        const newUser = new User({
          email: data.email,
          password: data.password,
          name: data.name,
          identity: data.identity,
          avatar
        })
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(data.password, salt, function (err, hash) {
            // Store hash in your password DB.
            if (err) { throw err }
            newUser.password = hash
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          });
        });

      }
    })
    .catch(err => {
      res.status(500).json({msg: '网络错误!'})
    })

})

//$route GET api/users/login
//@desc  返回的token
router.post("/login", (req, res) => {
  User.findOne({email: req.body.email})
  .then(user => {
    if( user) {
      //匹配密码
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if( err ) throw err
        if( result ){
          // jwt.sign('规则','加密方式','过期时间',(err,token)=>{})
          const rules = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            identity: user.identity
          }
          jwt.sign(rules,"secret",{expiresIn:3600},(err, token) => {
            if(err) throw err
            if( token ) {
             return  res.json({token:'Bearer '+token})
            }
          })
        }else{
          return res.status(404).json({msg: '密码错误'})
        }
    });
    }else{
      res.status(404).json({msg: '用户不存在!'})
    }
  })
  .catch(err => {
    console.log(err)
  })
})

//$route GET api/users/current
//@desc  返回的token
router.get("/current",passport.authenticate("jwt",{session: false}),(req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
})
module.exports = router