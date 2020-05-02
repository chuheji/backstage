import React, { Component } from 'react'
import './index.less'
import Chart from '../../components/chart/chart'
import { Input } from 'antd';
import Request from './../../http';
import {Holiday, Setupeds, Setups} from '../../components/interface/index'
const { Search } = Input;
let nums: any[] = [
  {id: '0', chart: 'Pie1', title: '昨日考勤统计'},
  {id: '1', chart: 'Pie2', title: '今日考勤统计'},
  {id: '2', chart: 'Polyline', title: '一周考勤异常走势'},
  {id: '3', chart: 'Bar', title: '一周考勤出勤率'}
]

interface Istate {
  holiday: Holiday,
  setupeds: Setupeds,
  setups: Setups,
  department: string,
  classes: string
}
export default class Home extends Component<any, Istate> {
  constructor (props: any) {
    super(props)
    this.state = {
      holiday: [],
      setupeds: [],
      setups: [],
      department: '系别',
      classes: '班级'
    }
  }
  search = (value: any) => {
    let values = {
      department: '',
      classes: ''
    }
    if (value.includes('（')) {
      let temp = value.split('（')
      values.department = temp[0]
      values.classes = temp[1].split('）')[0]
    } else if (value.includes('(')) {
      let temp = value.split('(')
      values.department = temp[0]
      values.classes = temp[1].split(')')[0]
    }
    this.setState({
        department: values.department,
        classes: values.classes
    })
    Request.post('/holiday', values).then((res: any) => {
      this.setState({
        holiday: res.data.data
      })
    })
    Request.post('/setuped', values).then((res: any) => {
      this.setState({
        setupeds: res.data.data
      })
    })
    Request.get('/setup').then((res: any) => {
      this.setState({
        setups: res.data.data
      })
    })
  }
  componentWillUnmount () {
    this.setState = (state, callback) => {
        return
    }
  }
  render() {
    let department = this.state.department
    let classes = this.state.classes
    return (
      <div className='containers' style={{marginLeft: 60}}>
        <div style={{marginTop: 30, marginBottom: 20}}>
          <div>
            <b style={{marginTop: 20, marginLeft: 30, display: 'inline-block'}}>{department} · {classes}</b>
            <Search
              placeholder="搜索格式:计算机科学与技术(1601)"
              onSearch={value => this.search(value)}
              style={{ width: 270, marginLeft:15, backgroundColor: '#000' }}
            />
          </div>
        </div> 
        {
          nums.map(item =>
            <div key={item.id} className='block'>
              <span className='title'>{item.title}</span>
              <Chart type={item.chart} setupeds={this.state.setupeds} holiday={this.state.holiday} setups={this.state.setups} department={department} classes={classes}/>
            </div>
          )
        }
      </div>
    )
  }
}
