
/*
 * @Author: 刘佑祥
 * @LastEditors: 刘佑祥
 * @LastEditTime: 2020-05-16 00:41:23
 * @Describtion: 后台账号列表
 */
import React, { Component } from 'react'
import { Table, Input, Button, Modal, message, Popconfirm } from 'antd'
import Request from '../../http'

const { Search } = Input;
export default class Accountlist extends Component {
    columns = [
        {
            key: '1',
            title: '账号',
            dataIndex: 'account',
        },
        {
            title: '操作',
            dataIndex: 'action',
            render: (text: any, record: any) =>
              (
                <div>
                <Button ghost className='update' type='primary' onClick={() => this.showUpdateModal(record)}>编辑</Button>
                <Popconfirm title="确认删除吗?" okText="确认" cancelText="取消" onConfirm={() => this.handleDelete(record)}>
                  <Button ghost type='danger'>删除</Button>
                </Popconfirm>
                <Popconfirm title="确认重置密码吗?" okText="确认" cancelText="取消" onConfirm={() => this.resetPassword(record)}>
                  <Button ghost className='reset' type='default'>重置密码</Button>
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
        password: ''
    }
    showUpdateModal = (record: any) => {
        let account = record.account
        this.setState({
          visible2: true,
          account: account
        });
      };
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
        Request.post('/resetbackpwd', params).then((res:any) => {
            if (res.data.code === 200) {
                message.success(res.data.msg)
            } else {
                message.error(res.data.msg)
            }
        })
    }
    componentDidMount () {
        Request.get('/backstageaccount').then((res: any) => {
            console.log(res.data.data)
            let temp = res.data.data
            for (let i = 0; i < temp.length; i++) {
                temp[i].key = i.toString()
            }
            this.setState({
                data: temp
            })
        })
    }
    handleSearch = (value: string): any => {
        Request.get('/backstageaccount').then((res: any) => {
            let temp = res.data.data
            let data: any = []
            for (let i = 0; i < temp.length; i++) {
                temp[i].key = i.toString()
            }
            // eslint-disable-next-line array-callback-return
            temp.map((item: any) => {
                for (let i in item) {
                    if (item[i] === value || item[i]+'' === value+'') {
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
    
      handleOk = (e: any) => {
        let account = this.state.account
        let password = this.state.password
        if (!account.length || !password.length) {
            message.error('还有字段未输入')
        } else if (password.length < 6) {
            message.error('密码长度至少为6位')
        } else {
            let values = {account: account}
            Request.post('/exist', values).then((res: any) => {
                if (res.data.code === 200) {
                    let params = {
                    account: account,
                    password: password
                }
                Request.post('/addbackstage', params).then((res: any) => {
                    message.success(res.data.msg)
                })
                this.setState({
                    visible: false,
                });
                } else {
                    message.error('账号已存在！')
                }
            })
            
        }
          
      };
    
      handleCancel = (e: any) => {
        this.setState({
          visible: false,
        });
      };
      handleOk2 = (e: any) => {
        let account = this.state.account
        let password = this.state.password
        if (!account.length || !password.length) {
            message.error('还有字段未输入')
        } else if (password.length < 6) {
            message.error('密码长度至少为6位')
        } else {
            let values = {account: account}
            Request.post('/exist', values).then((res: any) => {
                if (res.data.code === 250) {
                    let params = {
                    account: account,
                    password: password
                }
                Request.post('/updatebackstage', params).then((res: any) => {
                    message.success(res.data.msg)
                })
                this.setState({
                    visible: false,
                });
                } else {
                    message.error('账号不存在！')
                }
            })
            
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
            password: e.target.value
        })
      }
    render() {
        const account = this.state.account
        return (
            <div className='containers'>
                <Search
                    placeholder="请输入查询信息"
                    onSearch={value => this.handleSearch(value)}
                    style={{ width: 400, marginLeft: 10 }}
                />
                <Button ghost style={{marginLeft: 10}} onClick={this.showModal}>添加账号</Button>
                <Table
                    columns={this.columns}
                    dataSource={this.state.data} 
                    pagination={{ showQuickJumper: true, defaultPageSize: 5 }}
                />
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk} 
                    onCancel={this.handleCancel}
                    okText="确认" cancelText="取消"
                >
                    <Input placeholder="请输入账号" onChange={this.onChange1}/>
                    <Input style={{marginTop:10}} placeholder="请输入密码" onChange={this.onChange2} />
                </Modal>
                <Modal
                    title="编辑账号"
                    visible={this.state.visible2}
                    onOk={this.handleOk2} 
                    onCancel={this.handleCancel2}
                    okText="确认" cancelText="取消"
                >
                    <Input value={account} placeholder="请输入账号" onChange={this.onChange1}/>
                    <Input style={{marginTop:10}} placeholder="请输入密码" onChange={this.onChange2} type='password'/>
                </Modal>
            </div>
        )
    }
}

