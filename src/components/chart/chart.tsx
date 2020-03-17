import React, { Component } from 'react'
import Pie from './pie'
import Polyline from './polyline'
import Bar from './bar'

interface Iprop {
  type: string
}
export class Chart extends Component<Iprop, any> {
  render() {
    if (this.props.type === 'Pie') {
      return (
        <Pie />
      )
    } else if (this.props.type === 'Polyline') {
      return (
        <Polyline />
      )
    } else if (this.props.type === 'Bar') {
      return (
        <Bar />
      )
    }
    
  }
}

export default Chart
