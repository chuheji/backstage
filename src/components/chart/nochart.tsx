import React, { Component } from 'react'
import { Result } from 'antd'
import { SmileOutlined } from '@ant-design/icons'

export default class Nochart extends Component {
  render() {
    return (
            <Result
                icon={<SmileOutlined />}
                title="暂无数据"
            />
    )
  }
}