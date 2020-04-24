
/*
 * @Author: 刘佑祥
 * @LastEditors: 刘佑祥
 * @LastEditTime: 2020-04-22 16:11:21
 * @Describtion: 考勤异常
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
export default class Badattendance extends Component<any> {
    state = {
        setup: [],
        setuped: [],
        data: []
    }
    componentDidMount () {
        // Request.get('/allsetuped').then((res: any) => {
        //     let temp = res.data.data
        //     for (let i = 0; i < temp.length; i++) {
        //         delete temp[i].startTime
        //         delete temp[i].endTime
        //         delete temp[i].attendTime
        //         delete temp[i].geo
        //         delete temp[i].name
        //     }
        //     console.log(temp)
        //     this.setState({
        //         setuped: temp
        //     })
        // })
        Request.get('/setup').then((res: any) => {
            let temp = res.data.data
            // console.log(temp)
            for (let i = 0; i < temp.length; i++) {
                delete temp[i].startTime
                delete temp[i].endTime
                delete temp[i].lng
                delete temp[i].lat
                delete temp[i].name
                delete temp[i].geo
                delete temp[i].account
                delete temp[i].prenum
                delete temp[i].id
                if (temp[i].dcns && temp[i].dcns !== null) {
                    temp[i].dcns = JSON.parse(temp[i].dcns)
                }
                if (temp[i].dcns === null) {
                    console.log(temp[i])
                    temp.splice(i,1)
                }
            }
            console.log(temp)
            this.setState({
                setup: temp
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
