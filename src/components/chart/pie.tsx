import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'

export class Pie extends Component {
  render() {
    var data = [{
      "name": "迟到",
      "value": 10
  }, {
      "name": "请假",
      "value": 10
  }, {
      "name": "正常",
      "value": 10
  }]
    const  option = {

      color: ['#EB495B', '#FBD14C', "rgba(250,250,250,0.3)"],
      backgroundColor: '#1E2245',
      title: {
          subtext: '30人',
          textStyle: {
              color: '#f2f2f2',
              fontSize: 16,
          },
          subtextStyle: {
              fontSize: 16,
              color: ['#ff9d19']
          },
          x: '45%',
          y: '40%',
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {}
        }
    },
      grid: {
          bottom: 150,
          left: 100,
          right: '10%'
      },
      legend: {
          orient: 'vertical',
          top: "bottom",
          right: "5%",
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
                      formatter: "{c}人",
                      textStyle: {
                          fontSize: 18,
 
                      },
                      position: 'outside'
                  }
              },
              labelLine: {
                  normal: {
                      show: false,
                      length: 20,
                      length2: 25
                  },
                  emphasis: {
                      show: true
                  }
              },
              name: "民警训练总量",
              data: data,
 
          },
          // 边框的设置
          {
              radius: ['24%', '28%'],
              center: ['50%', '50%'],
              type: 'pie',
              label: {
                  normal: {
                      show: false
                  },
                  emphasis: {
                      show: false
                  }
              },
              labelLine: {
                  normal: {
                      show: false
                  },
                  emphasis: {
                      show: false
                  }
              },
              animation: false,
              tooltip: {
                  show: false
              },
              data: [{
                  value: 1,
                  itemStyle: {
                      color: "rgba(250,250,250,0.3)",
                  },
              }],
          }, {
              name: '外边框',
              type: 'pie',
              clockWise: false, //顺时加载
              hoverAnimation: false, //鼠标移入变大
              center: ['50%', '50%'],
              radius: ['65%', '65%'],
              label: {
                  normal: {
                      show: false
                  }
              },
              data: [{
                  value: 9,
                  name: '',
                  itemStyle: {
                      normal: {
                          borderWidth: 2,
                          borderColor: '#0b5263'
                      }
                  }
              }]
          },
      ]
  };
    return (
      <div style={{marginTop:10}}>
        <ReactEcharts  option={option} style={{height:'200px',width:'100%'}}/>
      </div>
    )
  }
}

export default Pie
