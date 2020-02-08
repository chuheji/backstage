var express = require('express');
var router = express.Router();
const connection = require('./conn')
const md5 = require('blueimp-md5')
const key = 'xlf'

connection.connect(() => {
  console.log('数据库连接成功')
})
router.post('/login', (req, res) => {
  // console.log(req.body)
  let { account, password } = req.body
  // 定义sql语句
  let loginsql = `select * from backstageuser where account='${account}' and password='${md5(password, key)}'`
  connection.query(loginsql, function (err, data) {
    if (err) {
      res.send({msg: '用户名或密码错误'})
      throw err
    } else {
      if (!data.length) {
        res.send({msg: '用户不存在'})
      } else {
        res.send({account:data[0].account, msg: '登录成功', code: 200})
      }
    }
  })
})

module.exports = router;
