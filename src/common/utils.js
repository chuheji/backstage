/*
 * @Author: 刘佑祥
 * @LastEditors: 刘佑祥
 * @LastEditTime: 2020-04-15 14:11:05
 */
const isArray = (arr) => {
  return Object.prototype.toString.call(arr) === '[object Array]';  
}
// 深度克隆
const deepClone = (obj) => {  
  if(typeof obj !== "object" && typeof obj !== 'function') {
    return obj;        //原始类型直接返回
  }
  let o = isArray(obj) ? [] : {}; 
  for(let i in obj) {  
      if(obj.hasOwnProperty(i)){ 
        o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i]; 
      } 
  } 
  return o;
}
// 获取今天年月日
const getNowDate = () => {
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1
    let day = new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()
    return `${year}-${month}-${day}`
}
// 获取昨天年月日
const getYesterDate = () => {
    let year = new Date().getFullYear()
    let month = (new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1
    let day = (new Date().getDate() - 1) < 10 ? `0${new Date().getDate() - 1}` : new Date().getDate() - 1
    return `${year}-${month}-${day}`
}
// 获取一周内时间
const getWeekDate = () => {
    let res = []
    let year = new Date().getFullYear()
    let month = (new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1
    for (let i = 6; i>=0; i--) {
        let day = (new Date().getDate() - i) < 10 ? `0${new Date().getDate() - i}` : new Date().getDate() - i
        res.push(`${year}-${month}-${day}`)
    }
    return res
}
export {
  isArray,
  deepClone,
  getNowDate,
  getYesterDate,
  getWeekDate
}