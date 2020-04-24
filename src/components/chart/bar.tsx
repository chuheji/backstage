/*
 * @Author: 刘佑祥
 * @LastEditors: 刘佑祥
 * @LastEditTime: 2020-04-23 14:17:45
 * @Describtion: 学期考勤统计
 */
import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import { Setup, Setuped, Askholiday } from '../interface/index'
import { getWeekDate } from '../../common/utils'

export class Bar extends Component<any, any> {
  render() {
    const holiday = this.props.holiday
    const setupeds = this.props.setupeds
    const setups = this.props.setups
    const department = this.props.department
    const classes = this.props.classes
    // console.log(getWeekDate())
    // 一周内创建的签到
    const weekSetups = setups.filter((item: Setup) => {
        return getWeekDate().includes(item.startTime.substr(0,10))
    })
    function dayComputed () {
        let day1 = []
        let day2 = []
        let day3 = []
        let day4 = []
        let day5 = []
        let day6 = []
        let day7 = []
        for (let item of weekSetups) {
            let time = item.startTime.substr(0,10)
            if (time === getWeekDate()[0]) {
                day1.push(item)
            } else if (time === getWeekDate()[1]) {
                day2.push(item)
            } else if (time === getWeekDate()[2]) {
                day3.push(item)
            } else if (time === getWeekDate()[3]) {
                day4.push(item)
            } else if (time === getWeekDate()[4]) {
                day5.push(item)
            } else if (time === getWeekDate()[5]) {
                day6.push(item)
            } else if (time === getWeekDate()[6]) {
                day7.push(item)
            } 
        }
        return {'day1': day1, 'day2': day2, 'day3': day3, 'day4': day4, 'day5': day5, 'day6': day6, 'day7': day7}
    }
    let all = dayComputed()
    let qq: number[] = []
    let qj: number[] = []
    let cql: number[] = []
    function day1Computed () {
        // 预期人数
        // eslint-disable-next-line array-callback-return
        all.day1.map((item: { dcns: any }) => {
            if (item.dcns && typeof(item.dcns) !== 'object') {
                item.dcns = JSON.parse(item.dcns)
            } else {
                // eslint-disable-next-line array-callback-return
                return
            }
        })
        let res = []
        for (let i of all.day1) {
            for (let item of i.dcns) {
                if (item.dcn.includes(`${department},${classes}`)) {
                    res.push(Number(item.dcn.split(',')[2].split('人')[0]))
                }
            }
        }
        const prenum = res.reduce((prev: number, cur: number) => {
            return prev + cur
        }, 0)
        // 请假数据
        const yesterHoliday = holiday.filter((item: Askholiday) => {
            return item.startTime.includes(getWeekDate()[0])
        })
        // 请假人数
        const holidaynum = yesterHoliday.length
        // 签到数据
        const yesterSetuped = setupeds.filter((item: Setuped) => {
            return item.startTime.includes(getWeekDate()[0])
        })
        // 签到人数
        const setupednum = yesterSetuped.length
        // 缺勤人数
        const num = prenum - setupednum - holidaynum
        qq[0] = num
        qj[0] = holidaynum
        cql[0] = (setupednum / prenum) * 100
    }
    function day2Computed () {
        // 预期人数
        // eslint-disable-next-line array-callback-return
        all.day2.map((item: { dcns: any }) => {
            if (item.dcns && typeof(item.dcns) !== 'object') {
                item.dcns = JSON.parse(item.dcns)
            } else {
                // eslint-disable-next-line array-callback-return
                return
            }
        })
        let res = []
        for (let i of all.day2) {
            for (let item of i.dcns) {
                if (item.dcn.includes(`${department},${classes}`)) {
                    res.push(Number(item.dcn.split(',')[2].split('人')[0]))
                }
            }
        }
        const prenum = res.reduce((prev: number, cur: number) => {
            return prev + cur
        }, 0)
        // 请假数据
        const yesterHoliday = holiday.filter((item: Askholiday) => {
            return item.startTime.includes(getWeekDate()[1])
        })
        // 请假人数
        const holidaynum = yesterHoliday.length
        // 签到数据
        const yesterSetuped = setupeds.filter((item: Setuped) => {
            return item.startTime.includes(getWeekDate()[1])
        })
        // 签到人数
        const setupednum = yesterSetuped.length
        // 缺勤人数
        const num = prenum - setupednum - holidaynum
        qq[1] = num
        qj[1] = holidaynum
        cql[1] = (setupednum / prenum) * 100
    }
    function day3Computed () {
        // 预期人数
        // eslint-disable-next-line array-callback-return
        all.day3.map((item: { dcns: any }) => {
            if (item.dcns && typeof(item.dcns) !== 'object') {
                item.dcns = JSON.parse(item.dcns)
            } else {
                // eslint-disable-next-line array-callback-return
                return
            }
        })
        let res = []
        for (let i of all.day3) {
            for (let item of i.dcns) {
                if (item.dcn.includes(`${department},${classes}`)) {
                    res.push(Number(item.dcn.split(',')[2].split('人')[0]))
                }
            }
        }
        const prenum = res.reduce((prev: number, cur: number) => {
            return prev + cur
        }, 0)
        // 请假数据
        const yesterHoliday = holiday.filter((item: Askholiday) => {
            return item.startTime.includes(getWeekDate()[2])
        })
        // 请假人数
        const holidaynum = yesterHoliday.length
        // 签到数据
        const yesterSetuped = setupeds.filter((item: Setuped) => {
            return item.startTime.includes(getWeekDate()[2])
        })
        // 签到人数
        const setupednum = yesterSetuped.length
        // 缺勤人数
        const num = prenum - setupednum - holidaynum
        qq[2] = num
        qj[2] = holidaynum
        cql[2] = (setupednum / prenum) * 100
    }
    function day4Computed () {
        // 预期人数
        // eslint-disable-next-line array-callback-return
        all.day4.map((item: { dcns: any }) => {
            if (item.dcns && typeof(item.dcns) !== 'object') {
                item.dcns = JSON.parse(item.dcns)
            } else {
                // eslint-disable-next-line array-callback-return
                return
            }
        })
        let res = []
        for (let i of all.day4) {
            for (let item of i.dcns) {
                if (item.dcn.includes(`${department},${classes}`)) {
                    res.push(Number(item.dcn.split(',')[2].split('人')[0]))
                }
            }
        }
        const prenum = res.reduce((prev: number, cur: number) => {
            return prev + cur
        }, 0)
        // 请假数据
        const yesterHoliday = holiday.filter((item: Askholiday) => {
            return item.startTime.includes(getWeekDate()[3])
        })
        // 请假人数
        const holidaynum = yesterHoliday.length
        // 签到数据
        const yesterSetuped = setupeds.filter((item: Setuped) => {
            return item.startTime.includes(getWeekDate()[3])
        })
        // 签到人数
        const setupednum = yesterSetuped.length
        // 缺勤人数
        const num = prenum - setupednum - holidaynum
        qq[3] = num
        qj[3] = holidaynum
        cql[3] = (setupednum / prenum) * 100
    }
    function day5Computed () {
        // 预期人数
        // eslint-disable-next-line array-callback-return
        all.day5.map((item: { dcns: any }) => {
            if (item.dcns && typeof(item.dcns) !== 'object') {
                item.dcns = JSON.parse(item.dcns)
            } else {
                // eslint-disable-next-line array-callback-return
                return
            }
        })
        let res = []
        for (let i of all.day5) {
            for (let item of i.dcns) {
                if (item.dcn.includes(`${department},${classes}`)) {
                    res.push(Number(item.dcn.split(',')[2].split('人')[0]))
                }
            }
        }
        const prenum = res.reduce((prev: number, cur: number) => {
            return prev + cur
        }, 0)
        // 请假数据
        const yesterHoliday = holiday.filter((item: Askholiday) => {
            return item.startTime.includes(getWeekDate()[4])
        })
        // 请假人数
        const holidaynum = yesterHoliday.length
        // 签到数据
        const yesterSetuped = setupeds.filter((item: Setuped) => {
            return item.startTime.includes(getWeekDate()[4])
        })
        // 签到人数
        const setupednum = yesterSetuped.length
        // 缺勤人数
        const num = prenum - setupednum - holidaynum
        qq[4] = num
        qj[4] = holidaynum
        cql[4] = (setupednum / prenum) * 100
    }
    function day6Computed () {
        // 预期人数
        // eslint-disable-next-line array-callback-return
        all.day6.map((item: { dcns: any }) => {
            if (item.dcns && typeof(item.dcns) !== 'object') {
                item.dcns = JSON.parse(item.dcns)
            } else {
                // eslint-disable-next-line array-callback-return
                return
            }
        })
        let res = []
        for (let i of all.day6) {
            for (let item of i.dcns) {
                if (item.dcn.includes(`${department},${classes}`)) {
                    res.push(Number(item.dcn.split(',')[2].split('人')[0]))
                }
            }
        }
        const prenum = res.reduce((prev: number, cur: number) => {
            return prev + cur
        }, 0)
        // 请假数据
        const yesterHoliday = holiday.filter((item: Askholiday) => {
            return item.startTime.includes(getWeekDate()[5])
        })
        // 请假人数
        const holidaynum = yesterHoliday.length
        // 签到数据
        const yesterSetuped = setupeds.filter((item: Setuped) => {
            return item.startTime.includes(getWeekDate()[5])
        })
        // 签到人数
        const setupednum = yesterSetuped.length
        // 缺勤人数
        const num = prenum - setupednum - holidaynum
        qq[5] = num
        qj[5] = holidaynum
        cql[5] = (setupednum / prenum) * 100
    }
    function day7Computed () {
        // 预期人数
        // eslint-disable-next-line array-callback-return
        all.day6.map((item: { dcns: any }) => {
            if (item.dcns && typeof(item.dcns) !== 'object') {
                item.dcns = JSON.parse(item.dcns)
            } else {
                // eslint-disable-next-line array-callback-return
                return
            }
        })
        let res = []
        for (let i of all.day7) {
            for (let item of i.dcns) {
                if (item.dcn.includes(`${department},${classes}`)) {
                    res.push(Number(item.dcn.split(',')[2].split('人')[0]))
                }
            }
        }
        const prenum = res.reduce((prev: number, cur: number) => {
            return prev + cur
        }, 0)
        // 请假数据
        const yesterHoliday = holiday.filter((item: Askholiday) => {
            return item.startTime.includes(getWeekDate()[6])
        })
        // 请假人数
        const holidaynum = yesterHoliday.length
        // 签到数据
        const yesterSetuped = setupeds.filter((item: Setuped) => {
            return item.startTime.includes(getWeekDate()[6])
        })
        // 签到人数
        const setupednum = yesterSetuped.length
        // 缺勤人数
        const num = prenum - setupednum - holidaynum
        qq[6] = num
        qj[6] = holidaynum
        cql[6] = (setupednum / prenum) * 100
    }
    day1Computed()
    day2Computed()
    day3Computed()
    day4Computed()
    day5Computed()
    day6Computed()
    day7Computed()
    let singleData = cql
    const  option = {
      backgroundColor: '#1E2245',
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {}
        }
    },
      tooltip: {
          show:true,
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
      },
      legend: {
          data: ['请假', '缺勤/迟到'],
          align: 'left',
          itemGap: 30,
          // x: 'right',
          right:'30%',
          y: '10%',
          icon: 'rect',
          itemWidth: 15, // 图例图形宽度
          itemHeight: 12, // 图例图形高度
          textStyle: {
              color: "rgba(250,250,250,0.3)",
              fontSize: 12
          }
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: [{
          type: 'category',
          data: ['第一天', '第二天', '第三天', '第四天', '前天', '昨天', '今天'],
          axisLine: {
              show: false,
              lineStyle: {
                type: 'dashed',
                  color: 'rgba(135,140,147,0.8)'
              }
          },
          axisTick: {
            show: false
        },
          axisLabel: {
              color: 'rgba(135,140,147,0.8)',
              formatter: '{value}'
          },
          splitLine: {
            lineStyle: {
                type: 'dashed',
                color: 'rgba(135,140,147,0.8)'
            }
        },
      }],
      yAxis: [{
          type: 'value',
          max:100,
          axisLine: {
              show: false,
              lineStyle: {
                type: 'dashed',
                  color: 'rgba(135,140,147,0.8)'
              }
          },
          axisTick: {
            show: false
        },
          axisLabel: {
              color: 'rgba(135,140,147,0.8)',
              formatter: '{value}%'
          },
          splitLine: {
            lineStyle: {
                type: 'dashed',
                color: 'rgba(135,140,147,0.8)'
            }
        }
      }],
      series: [{
          name: '出勤率',
          type: 'bar',
          stack:'出勤率',
          barWidth: '25%',
          barGap:'40%',
          label: {
              normal: {
                show: false,
              }
          },
          itemStyle: {
              normal: {
                  color:'#008B45',
              }
          },
          data: singleData
      }]
  };
    return (
      <div style={{marginTop:10}}>
        <ReactEcharts  option={option} style={{height:'250px',width:'100%'}}/>
      </div>
    )
  }
}

export default Bar
