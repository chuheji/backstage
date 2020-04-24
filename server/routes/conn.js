/*
 * @Author: 刘佑祥
 * @LastEditors: 刘佑祥
 * @LastEditTime: 2020-04-08 11:38:16
 */
const mysql = require('mysql')
// 创建数据库连接
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Xlf112233...',
  database: 'attendance'
})
module.exports = connection