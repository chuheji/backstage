
/*
 * @Author: 刘佑祥
 * @LastEditors: 刘佑祥
 * @LastEditTime: 2020-04-23 14:14:21
 * @Describtion: 迟到详情
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
        key: '8',
        title: '状态',
        dataIndex: 'attend'
    }
];
export default class Late extends Component {
    state = {
        data: []
    }
    componentDidMount () {
        Request.get('/late').then((res: any) => {
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
        Request.get('/late').then((res: any) => {
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
