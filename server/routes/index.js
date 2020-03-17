var express = require('express');
var router = express.Router();
const connection = require('./conn')
const md5 = require('blueimp-md5')
const key = 'xlf'

connection.connect(() => {
  console.log('数据库连接成功')
})
// 登录
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
// 查询密码是否正确
router.post('/rightpwd', (req, res) => {
  let { opassword, account } = req.body
  let selectsql = `select * from backstageuser where account='${account}' and password='${md5(opassword, key)}'`
  connection.query(selectsql, function (err, data) {
    if (err) {
      res.send({msg: '请求失败了'})
      throw err
    } else {
      console.log(data)
      if (!data.length) {
        res.send({code: 250, msg: '旧密码错误', data})
      } else {
        res.send({code: 200, msg: '旧密码正确', data})
      }
    }
  })
})
// 修改密码
router.post('/upwd', function (req, res, next) {
  let { npassword, account  } = req.body
  connection.query('UPDATE backstageuser SET password = (?) WHERE account = ?', [md5(npassword, key), account], function (err, data) {
    if (err) {
      res.send({ msg: '修改失败' })
      throw err
    } else {
      res.send({ code: 200, msg: '修改成功' })
    }
  })
})
// 查询班级系别考勤信息
router.post('/holiday', function (req, res, next) {
  let { department, classes  } = req.body
  let selectsql = `select * from askforholiday where department='${department}' and classes='${classes}'`
  connection.query(selectsql, function (err, data) {
    if (err) {
      res.send({msg: '请求失败了'})
      throw err
    } else {
      console.log(data)
      if (!data.length) {
        res.send({code: 250, msg: '错误', data})
      } else {
        res.send({code: 200, msg: '正确', data})
      }
    }
  })
})


module.exports = router;
