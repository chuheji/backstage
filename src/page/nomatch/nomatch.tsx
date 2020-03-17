import React, { Component } from 'react'
import './index.less'
import { Link } from 'react-router-dom'
export default class NoMatch extends Component {
  render() {
    return (
      <div className="wrapper-box">
        <div className="area clear">
        <div className="err404">
          <span style={{fontWeight: 700}}>您访问的页面不存在！</span>
          <h5><Link to="/layout/home" className="go-sohu">去首页</Link></h5>
        </div>
        </div>
      </div>
    )
  }
}
