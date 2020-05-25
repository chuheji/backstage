/*
 * @Author: 刘佑祥
 * @LastEditors: 刘佑祥
 * @LastEditTime: 2020-05-18 15:12:40
 * @Describtion: 签到总览
 */
import React, { Component } from 'react'
import { Table, Input, Popconfirm, Button, message} from 'antd'
import './index.less'
import Request from '../../http'

const { Search } = Input;
export default class Allsetup extends Component {
    columns = [
        {
            key: '8',
            title: '创建账号',
            dataIndex: 'account'
        },
        {
            key: '1',
            title: '经度',
            dataIndex: 'lng',
        },
        {
            key: '10',
            title: '纬度',
            dataIndex: 'lat'
        },
        {
            key: '2',
            title: '签到地点',
            dataIndex: 'geo'
        },
        {
            key: '3',
            title: '开始时间',
            dataIndex: 'startTime'
        },
        {
            key: '4',
            title: '结束时间',
            dataIndex: 'endTime'
        },
        {
            key: '5',
            title: '迟到时间',
            dataIndex: 'lateTime'
        },
        {
            key: '7',
            title: '总预期人数',
            dataIndex: 'prenum'
        },
        {
            title: '操作',
            dataIndex: 'action',
            render: (text: any, record: any) =>
              (
                <div>
                <Popconfirm title="确认删除吗?" okText="确认" cancelText="取消" onConfirm={() => this.handleDelete(record)}>
                  <Button ghost type='danger'>删除</Button>
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
        Request.post('/delsetup', params).then((res:any) => {
            if (res.data.code === 200) {
                message.success(res.data.msg)
                window.history.go(0)
            } else {
                message.error(res.data.msg)
            }
        })
    }
    componentDidMount () {
        Request.get('/setup').then((res: any) => {
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
        Request.get('/setup').then((res: any) => {
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
