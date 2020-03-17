import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'

export class Bar extends Component {
  render() {
    let singleData = [224, 220, 335,200,300]
    let multipleData = [442, 440, 220,300,400]
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
          data: ['请假', '缺勤'],
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
          data: ['一周', '二周', '三周', '四周', '五周'],
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
          max:600,
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
        }
      }],
      series: [{
          name: '请假',
          type: 'bar',
          stack:'请假',
          barWidth: '15%',
          barGap:'40%',
          label: {
              normal: {
                show: false,
              }
          },
          itemStyle: {
              normal: {
                  color:'#EB495B',
              }
          },
          data: singleData
      },
      {
          name: '缺勤',
          type: 'bar',
          stack:'缺勤',
          barWidth: '15%',
          barGap:'40%',
          label: {
              normal: {
                  show: false,
              }
          },
          itemStyle: {
              normal: {
                  color: '#FBD14C',
              }
          },
          data: multipleData
      }]
  };
    return (
      <div style={{marginTop:10}}>
        <ReactEcharts  option={option} style={{height:'200px',width:'100%'}}/>
      </div>
    )
  }
}

export default Bar
