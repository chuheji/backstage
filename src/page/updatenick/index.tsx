
/*
 * @Author: 刘佑祥
 * @LastEditors: 刘佑祥
 * @LastEditTime: 2020-04-23 15:06:11
 * @Describtion: 后台账号列表
 */
import React, { Component } from 'react'
import { Table, Input, Button, Modal, message } from 'antd'
import Request from '../../http'

const { Search } = Input;

const columns = [
    {
        key: '1',
        title: '账号',
        dataIndex: 'account',
    }
];

export default class Accountlist extends Component {
    state = {
        visible: false,
        data: [],
        account: '',
        password: ''
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
        console.log(e);
        this.setState({
          visible: false,
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
        return (
            <div className='containers'>
                <Search
                    placeholder="请输入查询信息"
                    onSearch={value => this.handleSearch(value)}
                    style={{ width: 400, marginLeft: 10 }}
                />
                <Button ghost style={{marginLeft: 10}} onClick={this.showModal}>添加账号</Button>
                <Table
                    columns={columns}
                    dataSource={this.state.data} 
                    pagination={{ showSizeChanger: true, showQuickJumper: true, }} 
                />
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk} 
                    onCancel={this.handleCancel}
                >
                    <Input placeholder="请输入账号" onChange={this.onChange1}/>
                    <Input style={{marginTop:10}} placeholder="请输入密码" onChange={this.onChange2} />
                </Modal>
            </div>
        )
    }
}

