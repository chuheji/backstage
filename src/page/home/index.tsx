import React, { Component } from 'react'
import './index.less'
import Chart from '../../components/chart/chart'
import { Input } from 'antd';
import Request from './../../http';

const { Search } = Input;
let nums: any[] = [
  {id: '0', chart: 'Pie', title: '昨日考勤异常统计'},
  {id: '1', chart: 'Pie', title: '今日考勤异常统计'},
  {id: '2', chart: 'Polyline', title: '一周考勤走势'},
  {id: '3', chart: 'Bar', title: '学期考勤走势'}
]

export default class Home extends Component {
  search = (value: any) => {
    let values = {
      grade: '',
      classes: ''
    }
    if (value.includes('（')) {
      let temp = value.split('（')
      values.grade = temp[0]
      values.classes = temp[1].split('）')[0]
    } else if (value.includes('(')) {
      let temp = value.split('(')
      values.grade = temp[0]
      values.classes = temp[1].split(')')[0]
    }
    console.log(values)
    Request.post('/holiday', values).then((res: any) => {
      console.log(res.data)
    })
  }
  render() {
    return (
      <div className='containers' style={{marginLeft: 70}}>
        <div>
          <div>
            <b style={{marginTop: 20, marginLeft: 30, display: 'inline-block'}}>计算机科学与技术 · 一班</b>
            <Search
              placeholder="搜索格式:计算机科学与技术(一班)"
              onSearch={value => this.search(value)}
              style={{ width: 270, marginLeft:15, backgroundColor: '#000' }}
            />
          </div>
        </div>
        {
          nums.map(item =>
            <div key={item.id} className='block'>
              <span className='title'>{item.title}</span>
              <Chart type={item.chart}/>
            </div>
          )
        }
      </div>
    )
  }
}
