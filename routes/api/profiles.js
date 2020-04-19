/*
 * @Author: zhu.zhanpeng 
 * @Date: 2020-03-24 15:51:15 
 * @Last Modified by: zhu.zhanpeng
 * @Last Modified time: 2020-04-01 16:57:42
 */
// profile
const express = require("express")
const router = express.Router()
const Profile = require("../../models/Profile")
const passport = require("passport")


//$route GET api/profiles/test
//@desc  返回的json数据

router.get("/test", (req, res) => {
  res.json({ msg: "profiles is work！" })
})

//$route POST api/profiles/add
//@desc  添加数据

router.post("/add", passport.authenticate("jwt", { session: false }), (req, res) => {
  const profileObj = {}
  if (req.body.type) profileObj.type = req.body.type
  if (req.body.income) profileObj.income = req.body.income
  if (req.body.expend) profileObj.expend = req.body.expend
  if (req.body.cash) profileObj.cash = req.body.cash
  if (req.body.remark) profileObj.remark = req.body.remark
  if (req.body.describe) profileObj.describe = req.body.describe
  new Profile(profileObj).save()
    .then(profile => {
      res.json(profile)
    })
    .catch(err => {
      console.log(err)
    })
})

//$route POST api/profiles/list
//@desc  查找所有数据
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.find()
    .then(profile => {
      if (!profile) res.json("未查询到数据")
      res.json(profile)
    })
})

//$route POST api/profiles/:id
//@desc  查找某一条数据
router.get('/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ _id: req.params.id })
    .then(profile => {
      if (!profile) res.json("未查询到数据")
      res.json(profile)
    })
})

//$route POST api/profiles/edit/:id
//@desc  编辑数据
router.post("/edit/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  const update = {}
  if (req.body.type) update.type = req.body.type
  if (req.body.describe) update.describe = req.body.describe
  if (req.body.income) update.income = req.body.income
  if (req.body.expend) update.expend = req.body.expend
  if (req.body.cash) update.cash = req.body.cash
  if (req.body.remark) update.remark = req.body.remark

  if (req.params.id) {
    Profile.findOneAndUpdate(
      { _id: req.params.id },
      { $set: update },
      { new: true }
    ).then(profile => {
      res.json(profile)
    })
  }
})

//$route DELETE api/profiles/delete/:id
//@desc  删除数据
router.delete('/delete/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOneAndRemove({ _id: req.params.id })
    .then(profile => {
      res.json(profile)
    })
    .catch(err => {
      res.status(404).json('删除失败!')
    })
})
module.exports = router