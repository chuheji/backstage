
/*
 * @Author: 刘佑祥
 * @LastEditors: 刘佑祥
 * @LastEditTime: 2020-04-22 14:29:39
 * @Describtion: 签到总览
 */
import React, { Component } from 'react'
import { Table, Input } from 'antd'
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
];
export default class Attendance extends Component {
    state = {
        data: []
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
                    columns={columns}
                    dataSource={this.state.data} 
                    pagination={{ showSizeChanger: true, showQuickJumper: true, }} 
                />
            </div>
        )
    }
}
