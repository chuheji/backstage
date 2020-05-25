/*
 * @Author: 刘佑祥
 * @LastEditors: 刘佑祥
 * @LastEditTime: 2020-05-11 13:33:44
 */
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
  console.log(req.body)
  let { account, password } = req.body
  // 定义sql语句
  let loginsql = `select * from backstageuser where account='${account}' and password='${md5(password, key)}'`
  connection.query(loginsql, function (err, data) {
    if (err) {
      res.send({msg: '用户名或密码错误'})
      throw err
    } else {
      if (!data.length) {
        res.send({msg: '用户名或密码错误'})
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
// 查询班级系别请假信息
router.post('/holiday', function (req, res, next) {
  let { department, classes  } = req.body
  let selectsql = `select * from askforholiday where department='${department}' and classes='${classes}'`
  connection.query(selectsql, function (err, data) {
    if (err) {
      res.send({msg: '请求失败了'})
      throw err
    } else {
      if (!data.length) {
        res.send({code: 250, msg: '错误', data})
      } else {
        res.send({code: 200, msg: '正确', data})
      }
    }
  })
})
// 查询班级系别已签到信息
router.post('/setuped', function (req, res, next) {
  let { department, classes  } = req.body
  let selectsql = `select * from setuped where department='${department}' and classes='${classes}'`
  connection.query(selectsql, function (err, data) {
    if (err) {
      res.send({msg: '请求失败了'})
      throw err
    } else {
      if (!data.length) {
        res.send({code: 250, msg: '错误', data})
      } else {
        res.send({code: 200, msg: '正确', data})
      }
    }
  })
})
// 查询已签到信息
router.get('/allsetuped', function (req, res, next) {
    let selectsql = `select * from setuped`
    connection.query(selectsql, function (err, data) {
      if (err) {
        res.send({msg: '请求失败了'})
        throw err
      } else {
        if (!data.length) {
          res.send({code: 250, msg: '错误', data})
        } else {
          res.send({code: 200, msg: '正确', data})
        }
      }
    })
  })
  // 查询所有请假信息
router.get('/allholiday', function (req, res, next) {
    let selectsql = `select * from askforholiday`
    connection.query(selectsql, function (err, data) {
      if (err) {
        res.send({msg: '请求失败了'})
        throw err
      } else {
        if (!data.length) {
          res.send({code: 250, msg: '错误', data})
        } else {
          res.send({code: 200, msg: '正确', data})
        }
      }
    })
  })
// 查询签到信息
router.get('/setup', function (req, res, next) {
    let selectsql = `select * from setup`
    connection.query(selectsql, function (err, data) {
      if (err) {
        res.send({msg: '请求失败了'})
        throw err
      } else {
        if (!data.length) {
          res.send({code: 250, msg: '错误', data})
        } else {
          res.send({code: 200, msg: '正确', data})
        }
      }
    })
  })
  // 查询签到信息
router.get('/late', function (req, res, next) {
    let selectsql = `select * from setuped where attend = '迟到'`
    connection.query(selectsql, function (err, data) {
      if (err) {
        res.send({msg: '请求失败了'})
        throw err
      } else {
        if (!data.length) {
          res.send({code: 250, msg: '无数据', data})
        } else {
          res.send({code: 200, msg: '正确', data})
        }
      }
    })
  })
  // 查询前台账号信息
router.get('/allaccount', function (req, res, next) {
    let selectsql = `select * from custom`
    connection.query(selectsql, function (err, data) {
      if (err) {
        res.send({msg: '请求失败了'})
        throw err
      } else {
        if (!data.length) {
          res.send({code: 250, msg: '错误', data})
        } else {
          res.send({code: 200, msg: '正确', data})
        }
      }
    })
  })
  // 查询前台是否已存在账号
router.post('/stageexist', function (req, res, next) {
    let { account, type } = req.body
    let selectsql = `select * from custom where account = '${account}' and type = '${type}'`
    connection.query(selectsql, function (err, data) {
      if (err) {
        res.send({msg: '请求失败了'})
        throw err
      } else {
        if (!data.length) {
          res.send({code: 200, msg: '不存在'})
        } else {
          res.send({code: 250, msg: '存在'})
        }
      }
    })
  })
// 查询后台是否已存在账号
router.post('/exist', function (req, res, next) {
    let { account } = req.body
    let selectsql = `select * from backstageuser where account = '${account}'`
    connection.query(selectsql, function (err, data) {
      if (err) {
        res.send({msg: '请求失败了'})
        throw err
      } else {
        if (!data.length) {
          res.send({code: 200, msg: '不存在'})
        } else {
          res.send({code: 250, msg: '存在'})
        }
      }
    })
  })
    // 查询后台账号信息
router.get('/backstageaccount', function (req, res, next) {
    let selectsql = `select * from backstageuser`
    connection.query(selectsql, function (err, data) {
      if (err) {
        res.send({msg: '请求失败了'})
        throw err
      } else {
        if (!data.length) {
          res.send({code: 250, msg: '错误', data})
        } else {
          res.send({code: 200, msg: '正确', data})
        }
      }
    })
  })
// 添加前台用户
  router.post('/addcustom', (req, res) => {
    let { account, nickname, type, department, classes } = req.body
    let addsql = `INSERT INTO custom(account,password,nickname,type,department,classes) VALUES(?,?,?,?,?,?)`
    let addSqlParams = [`${account}`, `${md5(account, key)}`, `${nickname}`, `${type}`, `${department}`, `${classes}`]
    connection.query(addsql, addSqlParams, (err, data) => {
      if (err) {
        throw err
      } else {
        res.send({code: 200, msg: '添加成功', data})
      }
    })
  })
  // 添加后台用户
  router.post('/addbackstage', (req, res) => {
    let { account, password } = req.body
    let addsql = `INSERT INTO backstageuser(account,password) VALUES(?,?)`
    let addSqlParams = [`${account}`, `${md5(password, key)}`]
    connection.query(addsql, addSqlParams, (err, data) => {
      if (err) {
        throw err
      } else {
        res.send({code: 200, msg: '添加成功', data})
      }
    })
  })
  // 删除用户
router.post('/delcustom', (req, res) => {
    let { account } = req.body
    let delsql = `DELETE FROM custom WHERE account = ${account}`
    connection.query(delsql, function (err, data) {
      if (err) {
        res.send({msg: '删除失败了'})
        throw err
      } else {
        res.send({code: 200, msg: '删除成功'})
      }
    })
  })
    // 重置用户密码
router.post('/resetpwd', (req, res) => {
    let { account } = req.body
    connection.query('UPDATE custom SET password = (?) WHERE account = ?', [md5(account, key), account], function (err, data) {
        if (err) {
          res.send({ msg: '重置失败' })
          throw err
        } else {
          res.send({ code: 200, msg: '重置成功' })
        }
      })
  })
      // 重置后台用户密码
router.post('/resetbackpwd', (req, res) => {
    let { account } = req.body
    connection.query('UPDATE custom SET password = (?) WHERE account = ?', [md5(account, key), account], function (err, data) {
        if (err) {
          res.send({ msg: '重置失败' })
          throw err
        } else {
          res.send({ code: 200, msg: '重置成功' })
        }
      })
  })
      // 修改用户数据
router.post('/updatecustom', (req, res) => {
    let { account, nickname, type, department, classes } = req.body
    connection.query('UPDATE custom SET nickname = (?), type = (?), department = (?), classes = (?) WHERE account = ?', [nickname, type, department, classes, account], function (err, data) {
        if (err) {
          res.send({ msg: '修改失败' })
          throw err
        } else {
          res.send({ code: 200, msg: '修改成功' })
        }
      })
  })
        // 修改后台用户数据
router.post('/updatebackstage', (req, res) => {
    let { account, password } = req.body
    connection.query('UPDATE custom SET password = (?) WHERE account = ?', [md5(password,key), account], function (err, data) {
        if (err) {
          res.send({ msg: '修改失败' })
          throw err
        } else {
          res.send({ code: 200, msg: '修改成功' })
        }
      })
  })
    // 删除签到
router.post('/delattend', (req, res) => {
    let { id } = req.body
    let delsql = `DELETE FROM setuped WHERE id = ${id}`
    connection.query(delsql, function (err, data) {
      if (err) {
        res.send({msg: '删除失败了'})
        throw err
      } else {
        res.send({code: 200, msg: '删除成功'})
      }
    })
  })
      // 删除请假
router.post('/delholiday', (req, res) => {
    let { id } = req.body
    let delsql = `DELETE FROM askforholiday WHERE id = ${id}`
    connection.query(delsql, function (err, data) {
      if (err) {
        res.send({msg: '删除失败了'})
        throw err
      } else {
        res.send({code: 200, msg: '删除成功'})
      }
    })
  })
        // 删除签到
router.post('/delsetup', (req, res) => {
    let { id } = req.body
    let delsql = `DELETE FROM setup WHERE id = ${id}`
    connection.query(delsql, function (err, data) {
      if (err) {
        res.send({msg: '删除失败了'})
        throw err
      } else {
        res.send({code: 200, msg: '删除成功'})
      }
    })
  })
module.exports = router;
