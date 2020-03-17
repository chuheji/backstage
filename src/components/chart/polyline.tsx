import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'

export class Polyline extends Component {
  render() {
    const  option = {
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['迟到', '缺勤'],
        textStyle: {
          color: 'rgba(135,140,147,0.8)'
      }
    },
    toolbox: {
        show: true,
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
            color: 'rgba(135,140,147,0.8)',
        },
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
      splitLine: {
        lineStyle: {
            type: 'dashed',
            color: 'rgba(135,140,147,0.8)'
        }
    },
        data: ['周一', '周二', '周三', '周四', '周五']
    },
    yAxis: {
        type: 'value',
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
    },
    series: [
        {
            name: '迟到',
            type: 'line',
            data: [11, 11, 15, 13, 12],
            itemStyle: {
              normal: {
                  color: "#EB495B",
                  lineStyle: {
                      color: "#EB495B"
                  }
              }
          },
        },
        {
            name: '缺勤',
            type: 'line',
            data: [1, 0, 2, 5, 3],
            itemStyle: {
              normal: {
                  color: "#FBD14C",
                  lineStyle: {
                      color: "#FBD14C"
                  }
              }
          },
        }
    ]
};
    return (
      <div style={{marginTop:10}}>
        <ReactEcharts  option={option} style={{height:'200px',width:'100%'}}/>
      </div>
    )
  }
}

export default Polyline
