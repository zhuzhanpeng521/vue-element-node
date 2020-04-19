/*
 * @Author: zhu.zhanpeng 
 * @Date: 2020-03-22 23:25:12 
 * @Last Modified by: zhu.zhanpeng
 * @Last Modified time: 2020-04-10 17:28:44
 */
const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/key").mongoURI;
const bodyParser = require("body-parser")
const passport = require("passport")
//引入 user.js
const users = require("./routes/api/users")
//引入profiles.js
const profiles = require("./routes/api/profiles")

const app = express();


mongoose.connect(db)
  .then(()=>{
    console.log("mongoDB连接成功");
  })
  .catch(()=>{
    console.log("mongoDB连接失败");
  })

//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//初始化passport
app.use(passport.initialize());

require("./config/passport")(passport)
  
//使用routers
app.use("/api/users",users)
app.use("/api/profiles",profiles)

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send("Hello,World!");
})

app.listen(port, () => {
  console.log(`Server in running on ${port}`);
})