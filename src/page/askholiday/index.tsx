/*
 * @Author: 刘佑祥
 * @LastEditors: 刘佑祥
 * @LastEditTime: 2020-04-21 20:49:40
 * @Describtion: 请假总览
 */
import React, { Component } from 'react'
import { Table, Input} from 'antd'
import './index.less'
import Request from '../../http'

const { Search } = Input;
const columns = [
    {
        key: '1',
        title: '学号',
        dataIndex: 'account',
    },
    {
        key: '9',
        title: '批假人账号',
        dataIndex: 'name'
    },
    {
        key: '2',
        title: '姓名',
        dataIndex: 'nickname'
    },
    {
        key: '3',
        title: '请假时间',
        dataIndex: 'startTime'
    },
    {
        key: '4',
        title: '收假时间',
        dataIndex: 'endTime'
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
        key: '7',
        title: '请假原因',
        dataIndex: 'reason'
    },
    {
        key: '8',
        title: '状态',
        dataIndex: 'status'
    },
];

export default class Askholiday extends Component {
    state = {
        data: []
    }
    componentDidMount () {
        Request.get('/allholiday').then((res: any) => {
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
        Request.get('/allholiday').then((res: any) => {
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
                    columns={columns}
                    dataSource={this.state.data} 
                    pagination={{ showSizeChanger: true, showQuickJumper: true, }} 
                />
            </div>
        )
    }
}
