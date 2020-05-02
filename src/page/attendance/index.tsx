
/*
 * @Author: 刘佑祥
 * @LastEditors: 刘佑祥
 * @LastEditTime: 2020-05-02 16:34:28
 * @Describtion: 签到总览
 */
import React, { Component } from 'react'
import { Table, Input, Popconfirm, Button, message } from 'antd'
import './index.less'
import Request from '../../http'

const { Search } = Input;
export default class Attendance extends Component {
    columns = [
        {
            key: '1',
            title: '学号',
            dataIndex: 'account',
        },
        {
            key: '7',
            title: '姓名',
            dataIndex: 'nickname',
        },
        {
            key: '2',
            title: '签到名称',
            dataIndex: 'name'
        },
        {
            key: '3',
            title: '签到时间',
            dataIndex: 'attendTime'
        },
        {
            key: '4',
            title: '签到码',
            dataIndex: 'code'
        },
        {
            key: '5',
            title: '系别',
            dataIndex: 'department'
        },
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
                <Popconfirm title="确认删除吗?" okText="确认" cancelText="取消" onConfirm={() => this.handleDelete(record)}>
                  <Button type='danger'>删除</Button>
                </Popconfirm>
                </div>
              )
          },
    ];
    state = {
        data: []
    }
    handleDelete(record: any) {
        let params = {
            id: record.id
        }
        Request.post('/delattend', params).then((res:any) => {
            if (res.data.code === 200) {
                message.success(res.data.msg)
                window.history.go(0)
            } else {
                message.error(res.data.msg)
            }
        })
    }
    componentDidMount () {
        Request.get('/allsetuped').then((res: any) => {
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
        Request.get('/allsetuped').then((res: any) => {
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
    render() {
        return (
            <div className='containers'>
                <Search
                    placeholder="请输入查询信息"
                    onSearch={value => this.handleSearch(value)}
                    style={{ width: 400, marginLeft: 10 }}
                />
                <Table
                    columns={this.columns}
                    dataSource={this.state.data} 
                    pagination={{ showQuickJumper: true, defaultPageSize: 5 }}
                />
            </div>
        )
    }
}
