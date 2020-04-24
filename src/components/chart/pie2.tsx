/*
 * @Author: 刘佑祥
 * @LastEditors: 刘佑祥
 * @LastEditTime: 2020-04-23 14:16:56
 * @Describtion: 今日考勤统计
 */
import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import { Setup, Setuped, Askholiday } from '../interface/index'
import { getNowDate } from '../../common/utils'

export class Pie extends Component<any, any> {
    render() {
        const holiday = this.props.holiday
        const setupeds = this.props.setupeds
        const setups = this.props.setups
        const department = this.props.department
        const classes = this.props.classes
        // 今日创建的签到
        const todaySetups = setups.filter((item: Setup) => {
            return item.startTime.includes(getNowDate())
        })
        // 预期人数
        // eslint-disable-next-line array-callback-return
        todaySetups.map((item: { dcns: any }) => {
            if (item.dcns && typeof(item.dcns) !== 'object') {
                item.dcns = JSON.parse(item.dcns)
            } else {
                // eslint-disable-next-line array-callback-return
                return
            }
        })
        let res = []
        for (let i of todaySetups) {
            for (let item of i.dcns) {
                if (item.dcn.includes(`${department},${classes}`)) {
                    console.log(item)
                    res.push(Number(item.dcn.split(',')[2].split('人')[0]))
                }
            }
        }
        const prenum = res.reduce((prev: number, cur: number) => {
            return prev + cur
        }, 0)
        // 今日请假数据
        const todayHoliday = holiday.filter((item: Askholiday) => {
            return item.startTime.includes(getNowDate())
        })
        // 今日请假人数
        const holidaynum = todayHoliday.length
        // 今日签到数据
        const todaySetuped = setupeds.filter((item: Setuped) => {
            return item.startTime.includes(getNowDate())
        })
        // 今日签到人数
        const setupednum = todaySetuped.length
        // 今日缺勤人数
        const num = prenum - setupednum - holidaynum
        var data = [
            {
                name: '缺勤/迟到',
                value: num,
            },
            {
                name: '请假',
                value: holidaynum,
            },
            {
                name: '正常',
                value: setupednum,
            },
        ]
        const option = {
            color: ['#EB495B', '#FBD14C', '#008B45'],
            backgroundColor: '#1E2245',
            title: {
                text: `预期人数`,
                subtext: `${prenum}人`,
                textStyle: {
                    color: '#ff9d19',
                    fontSize: 12,
                },
                subtextStyle: {
                    fontSize: 16,
                    color: ['#ff9d19'],
                },
                x: 'center',
                y: '43%',
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {},
                },
            },
            grid: {
                bottom: 150,
                left: 100,
                right: '10%',
            },
            legend: {
                orient: 'vertical',
                top: 'bottom',
                right: '5%',
                textStyle: {
                    color: 'rgba(250,250,250,0.3)',
                    fontSize: 14,
                },
                icon: 'roundRect',
                data: data,
            },
            series: [
                // 主要展示层的
                {
                    radius: ['25%', '56%'],
                    center: ['50%', '50%'],
                    type: 'pie',
                    label: {
                        normal: {
                            show: false,
                        },
                        emphasis: {
                            show: true,
                            formatter: '{c}人',
                            textStyle: {
                                fontSize: 18,
                            },
                            position: 'outside',
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false,
                            length: 20,
                            length2: 25,
                        },
                        emphasis: {
                            show: true,
                        },
                    },
                    name: '民警训练总量',
                    data: data,
                },
                // 边框的设置
                {
                    radius: ['24%', '28%'],
                    center: ['50%', '50%'],
                    type: 'pie',
                    label: {
                        normal: {
                            show: false,
                        },
                        emphasis: {
                            show: false,
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false,
                        },
                        emphasis: {
                            show: false,
                        },
                    },
                    animation: false,
                    tooltip: {
                        show: false,
                    },
                    data: [
                        {
                            value: 1,
                            itemStyle: {
                                color: 'rgba(250,250,250,0.3)',
                            },
                        },
                    ],
                },
                {
                    name: '外边框',
                    type: 'pie',
                    clockWise: false, //顺时加载
                    hoverAnimation: false, //鼠标移入变大
                    center: ['50%', '50%'],
                    radius: ['65%', '65%'],
                    label: {
                        normal: {
                            show: false,
                        },
                    },
                    data: [
                        {
                            value: 9,
                            name: '',
                            itemStyle: {
                                normal: {
                                    borderWidth: 2,
                                    borderColor: '#0b5263',
                                },
                            },
                        },
                    ],
                },
            ],
        }
        return (
            <div style={{ marginTop: 10 }}>
                <ReactEcharts
                    option={option}
                    style={{ height: '250px', width: '100%' }}
                />
            </div>
        )
    }
}

export default Pie
