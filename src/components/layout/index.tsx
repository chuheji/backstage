import { Menu, Icon } from 'antd'
import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './font/iconfont.css'
import './index.less'
import Home from '../../page/home/index'
import Attendance from '../../page/attendance/index'
import Askholiday from '../../page/askholiday/index'
import Accountlist from '../../page/accountlist/index'
import Updatepwd from '../../page/updatepwd/index'
import Updatenick from '../../page/updatenick/index'
const { SubMenu } = Menu;
class Layout extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      height: 0
    };
  }

  componentDidMount() {
    let h = document.body.clientHeight
    this.setState({
      height: h
    })
    console.log(Route)
  }

  render() {
    const h = this.state.height
    return (
      <Router>
        <div style={{ width: 256, height: h, backgroundColor: '#001529' }}>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
          >
            <div style={{ marginTop: 30, marginBottom: 12, paddingLeft: 24, height: 18, fontSize:24, cursor: 'pointer' }}>
              <span style={{ fontSize: 30 }} className="iconfont icon-leasingcloud_kaoqinpeizhi"></span><p style={{ paddingLeft: 35 }}>考勤系统后台</p>
            </div>
            <Menu.Item key="3">
              <Link to="/layout/home">
                <Icon type="pie-chart" />
                <span>首页</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="mail" />
                  <span>考勤管理</span>
                </span>
              }
            >
              <Menu.Item key="5">
                <Link to="/layout/attendance">
                  <Icon type="pie-chart" />
                  <span>考勤总览</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to="/layout/askholiday">
                  <Icon type="pie-chart" />
                  <span>请假总览</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="appstore" />
                  <span>账号管理</span>
                </span>
              }
            >
              <Menu.Item key="9">
                <Link to="/layout/accountlist">
                  <Icon type="pie-chart" />
                  <span>账号列表</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="10">
                <Link to="/layout/updatenick">
                  <Icon type="pie-chart" />
                  <span>修改昵称</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="11">
                <Link to="/layout/updatepwd">
                  <Icon type="pie-chart" />
                  <span>修改密码</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <div className='clearfix' style={{ position: 'fixed', left: 0, bottom: 0, height: 18, fontSize:16, cursor: 'pointer', backgroundColor: '#000' }}>
              <div className='name'><Icon type="poweroff" /><span className='poweroff'>退出</span></div>
              <div className='logout'><Icon type="poweroff" /><span className='poweroff'>退出</span></div>
            </div>
            <div style={{ position: 'absolute', left: 256, top: 10 }}>
              <Switch>
                <Route exact path="/layout/home">
                  <Home />
                </Route>
                <Route path="/layout/attendance">
                  <Attendance />
                </Route>
                <Route path="/layout/askholiday">
                  <Askholiday />
                </Route>
                <Route path="/layout/accountlist">
                  <Accountlist />
                </Route>
                <Route path="/layout/updatepwd">
                  <Updatepwd />
                </Route>
                <Route path="/layout/updatenick">
                  <Updatenick />
                </Route>
              </Switch>
            </div>
          </Menu>
        </div>
      </Router>
    );
  }
}

export default Layout
