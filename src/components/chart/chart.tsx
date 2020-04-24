import React, { Component } from 'react'
import Pie1 from './pie1'
import Pie2 from './pie2'
import Polyline from './polyline'
import Bar from './bar'
import {Holiday, Setupeds, Setups} from '../interface'

interface Iprop {
  type: string,
  holiday: Holiday,
  setupeds: Setupeds,
  setups: Setups,
  department: string,
  classes: string
}
export class Chart extends Component<Iprop, any> {
  render() {
    if (this.props.type === 'Pie1') {
      return (
        <Pie1 setupeds={this.props.setupeds} holiday={this.props.holiday} setups={this.props.setups} department={this.props.department} classes={this.props.classes} />
      )
    } else if (this.props.type === 'Pie2') {
      return (
        <Pie2 setupeds={this.props.setupeds} holiday={this.props.holiday} setups={this.props.setups}  department={this.props.department} classes={this.props.classes} />
      )
    } else if (this.props.type === 'Polyline') {
      return (
        <Polyline setupeds={this.props.setupeds} holiday={this.props.holiday} setups={this.props.setups}  department={this.props.department} classes={this.props.classes} />
      )
    } else if (this.props.type === 'Bar') {
      return (
        <Bar setupeds={this.props.setupeds} holiday={this.props.holiday} setups={this.props.setups}  department={this.props.department} classes={this.props.classes} />
      )
    }
    
  }
}

export default Chart
