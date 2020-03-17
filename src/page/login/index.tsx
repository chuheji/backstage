import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './index.less'
import '../../components/layout/font/iconfont.css'
import { Form, Icon, Input, Button, message } from 'antd'
import Request from '../../http'
import history from '../../common/history'
import { getCookie, setCookie } from '../../common/cookie'

interface Bowerheight{
  height: number
}
class Login extends Component<any, Bowerheight> {
  state = {
    height: 0
  }
  componentDidMount() {
    console.log(this.props)
    let h = document.body.clientHeight
    this.setState({
      height: h
    })
  }
  async login(values: object) {
    const res = await Request.post('/login', values)
    if (res.data.code === 200) {
      setCookie('account', res.data.account);
      history.push({pathname:'/layout/home'});
      message.success('登录成功');
    } else {
      message.error(res.data.msg);
    }
  }
  handleSubmit = (e: any): void => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.login(values)
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const h = this.state.height
    if (getCookie("account") && getCookie("account") !== "undefined") {
      return <Redirect to="/layout/home"/>
    } else {
      console.log()
    }
    return (
      <div className='container' style={{height: h}}>
        <div className='center'>
          <div style={{fontSize: 24, color: 'white' }}>
            <span style={{ fontSize: 80, color: 'white', paddingLeft: '36%' }} className="iconfont icon-leasingcloud_kaoqinpeizhi"></span><span style={{ textAlign: 'center', display: 'block', marginTop: -20, marginBottom: 10 }}>考勤系统后台</span>
          </div>
          <div>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('account', {
                  rules: [{ required: true, message: '请输入用户名' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
                }
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
export default Form.create()(Login)
