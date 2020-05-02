
/*
 * @Author: 刘佑祥
 * @LastEditors: 刘佑祥
 * @LastEditTime: 2020-05-02 16:35:01
 * @Describtion: 前台账号列表
 */
import React, { Component } from 'react'
import { Table, Input, Button, Modal, message, Popconfirm } from 'antd'
import './index.less'
import Request from '../../http'

const { Search } = Input;

export default class Accountlist extends Component {
    columns = [
        {
            key: '1',
            title: '学号/账号',
            dataIndex: 'account',
        },
        {
            key: '2',
            title: '头像',
            dataIndex: 'avatar'
        },
        {
            key: '3',
            title: '姓名',
            dataIndex: 'nickname'
        },
        {
            key: '4',
            title: '身份',
            dataIndex: 'type'
        }
        ,
        {
            key: '5',
            title: '系别',
            dataIndex: 'department'
        }
        ,
        {
            key: '6',
            title: '班级',
            dataIndex: 'classes'
        },
        {
            title: '操作',
            dataIndex: 'action',
            render: (text: any, record: any) =>
              (
                <div>
                <Button className='update' type='primary' onClick={() => this.showUpdateModal(record)}>编辑</Button>
                <Popconfirm title="确认删除吗?" okText="确认" cancelText="取消" onConfirm={() => this.handleDelete(record)}>
                  <Button type='danger'>删除</Button>
                </Popconfirm>
                <Popconfirm title="确认重置密码吗?" okText="确认" cancelText="取消" onConfirm={() => this.handleDelete(record)}>
                  <Button className='reset' type='primary'>重置密码</Button>
                </Popconfirm>
                </div>
              )
          },
    ];
    state = {
        visible: false,
        visible2: false,
        data: [],
        account: '',
        nickname: '',
        type: '',
        department: '',
        classes: '',
        show: 'none'
    }
    componentDidMount () {
        Request.get('/allaccount').then((res: any) => {
            let temp = res.data.data
            for (let i = 0; i < temp.length; i++) {
                temp[i].key = i.toString()
            }
            this.setState({
                data: temp
            })
        })
    }
    handleDelete(record: any) {
        let params = {
            account: record.account
        }
        Request.post('/delcustom', params).then((res:any) => {
            if (res.data.code === 200) {
                message.success(res.data.msg)
                window.history.go(0)
            } else {
                message.error(res.data.msg)
            }
        })
    }
    resetPassword(record: any) {
        let params = {
            account: record.account
        }
        Request.post('/resetpwd', params).then((res:any) => {
            if (res.data.code === 200) {
                message.success(res.data.msg)
            } else {
                message.error(res.data.msg)
            }
        })
    }
    handleSearch = (value: string): any => {
        Request.get('/allaccount').then((res: any) => {
            let temp = res.data.data
            let data: any = []
            for (let i = 0; i < temp.length; i++) {
                temp[i].key = i.toString()
            }
            // eslint-disable-next-line array-callback-return
            temp.map((item: any) => {
                for (let i in item) {
                    if (item[i] === value) {
                        data.push(item)
                    }
                }
            })
            this.setState({
                data: data
            })
        })
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
      };
      showUpdateModal = (record: any) => {
        let account = record.account
        let nickname = record.nickname
        let type = record.type
        let department = record.department
        let classes = record.classes
        this.setState({
          visible2: true,
          account: account,
          nickname: nickname,
          type: type,
          department: department,
          classes: classes
        });
      };
      handleOk = (e: any) => {
        let account = this.state.account
        let nickname = this.state.nickname
        let type = this.state.type
        let department = this.state.department
        let classes = this.state.classes
        if (type !== 'teacher' && type !== 'student') {
            message.error('请输入正确的身份(teacher/student)')
        } else if (type === 'teacher') {
            if(!account.length || !nickname.length || !type.length) {
                message.error('还有字段未输入')
            } else {
                Request.post('/stageexist', {account: account,type: type}).then((res:any) => {
                    if (res.data.code === 200) {
                        let params:object = {
                            account: account,
                            nickname: nickname,
                            type: type,
                            department: department,
                            classes: classes,
                        }
                        Request.post('/addcustom', params).then((res2: any) => {
                            message.success(res2.data.msg)
                        })
                        this.setState({
                            visible: false,
                        })
                    } else {
                        message.error('此账户已存在！')
                    }
                })
            }
        }  else {
            if(!account.length || !nickname.length || !type.length || !department.length || !classes.length) {
                message.error('还有字段未输入')
            } else {
                Request.post('/stageexist', {account: account,type: type}).then((res:any) => {
                    if (res.data.code === 200) {
                        let params:object = {
                            account: account,
                            nickname: nickname,
                            type: type,
                            department: department,
                            classes: classes,
                        }
                        Request.post('/addcustom', params).then((res2: any) => {
                            message.success(res2.data.msg)
                        })
                        this.setState({
                            visible: false,
                        })
                    } else {
                        message.error('此账户已存在！')
                    }
                })
            }
        } 
      };
    
      handleCancel = (e: any) => {
        this.setState({
          visible: false,
        });
      };
      handleOk2 = (e: any) => {
        let account = this.state.account
        let nickname = this.state.nickname
        let type = this.state.type
        let department = this.state.department
        let classes = this.state.classes
        if (type !== 'teacher' && type !== 'student') {
            message.error('请输入正确的身份(teacher/student)')
        } else if (type === 'teacher') {
            console.log(account.length, nickname.length)
            if(!account.toString().length || !nickname.length) {
                message.error('还有字段未输入')
            } else {
                Request.post('/stageexist', {account: account,type: type}).then((res:any) => {
                    if (res.data.code === 250) {
                        let params:object = {
                            account: account,
                            nickname: nickname,
                            type: type,
                            department: department,
                            classes: classes,
                        }
                        Request.post('/updatecustom', params).then((res2: any) => {
                            message.success(res2.data.msg)
                            window.history.go(0)
                        })
                        this.setState({
                            visible: false,
                        })
                    } else {
                        message.error('此账户不存在！')
                    }
                })
            }
        }  else {
            if(!account.toString().length || !nickname.length || !department.length || !classes.length) {
                message.error('还有字段未输入')
            } else {
                Request.post('/stageexist', {account: account,type: type}).then((res:any) => {
                    if (res.data.code === 250) {
                        let params:object = {
                            account: account,
                            nickname: nickname,
                            type: type,
                            department: department,
                            classes: classes,
                        }
                        Request.post('/updatecustom', params).then((res2: any) => {
                            message.success(res2.data.msg)
                            window.history.go(0)
                        })
                        this.setState({
                            visible: false,
                        })
                    } else {
                        message.error('此账户不存在！')
                    }
                })
            }
        }
      };
      handleCancel2 = (e: any) => {
        this.setState({
          visible2: false,
        });
      };
      onChange1 = (e: any) => {
        this.setState({
            account: e.target.value
        })
      }
      onChange2 = (e: any) => {
        this.setState({
            nickname: e.target.value
        })
      }
      onChange3 = (e: any) => {
        this.setState({
            type: e.target.value
        })
        if (e.target.value === 'teacher') {
            this.setState({
                show: 'none'
            })
        } else {
            if (e.target.value === 'student') {
                this.setState({
                    show: 'block'
                })
            }
        }
      }
      onChange4 = (e: any) => {
        this.setState({
            department: e.target.value
        })
      }
      onChange5 = (e: any) => {
        this.setState({
            classes: e.target.value
        })
      }
    render() {
        const show = this.state.show
        const account = this.state.account
        const nickname = this.state.nickname
        const type = this.state.type
        const department = this.state.department
        const classes = this.state.classes
        return (
            <div className='containers'>
                <Search
                    placeholder="请输入查询信息"
                    onSearch={value => this.handleSearch(value)}
                    style={{ width: 400, marginLeft: 10 }}
                />
                <Button ghost style={{marginLeft: 10}} onClick={this.showModal}>添加账号</Button>
                <Button ghost style={{marginLeft: 10}}>批量导入账号</Button>
                <Table
                    columns={this.columns}
                    dataSource={this.state.data} 
                    pagination={{ showQuickJumper: true, defaultPageSize: 5 }}
                />
                <Modal
                    title="添加账号"
                    visible={this.state.visible}
                    onOk={this.handleOk} 
                    onCancel={this.handleCancel}
                    okText="确认" cancelText="取消"
                >
                    <Input placeholder="请输入学号/账号" onChange={this.onChange1}/>
                    <Input style={{marginTop:10}} placeholder="请输入姓名" onChange={this.onChange2} />
                    <Input style={{marginTop:10}} placeholder="请输入身份(teacher/student)" onChange={this.onChange3} />
                    <Input style={{marginTop:10,display: show}} placeholder="请输入系别(输入全称如：计算机科学与技术)" onChange={this.onChange4} />
                    <Input style={{marginTop:10,display: show}} placeholder="请输入班级(例如：1601)" onChange={this.onChange5} />
                </Modal>
                <Modal
                    title="编辑账号"
                    visible={this.state.visible2}
                    onOk={this.handleOk2} 
                    onCancel={this.handleCancel2}
                    okText="确认" cancelText="取消"
                >
                    <Input value={account} placeholder="请输入学号/账号" onChange={this.onChange1}/>
                    <Input value={nickname} style={{marginTop:10}} placeholder="请输入姓名" onChange={this.onChange2} />
                    <Input value={type} style={{marginTop:10}} placeholder="请输入身份(teacher/student)" onChange={this.onChange3} />
                    <Input value={department} style={{marginTop:10}} placeholder="请输入系别(输入全称如：计算机科学与技术)" onChange={this.onChange4} />
                    <Input value={classes} style={{marginTop:10}} placeholder="请输入班级(例如：1601)" onChange={this.onChange5} />
                </Modal>
            </div>
        )
    }
}
