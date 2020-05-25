import {
  Form,
  Input,
  Button,
  message
} from 'antd';
import React, { Component } from 'react'
import Request from '../../http'
import './index.less'
import { getCookie } from '../../common/cookie';
import { deepClone } from '../../common/utils';

class Updatepwd extends Component<any, any> {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  
  async submit(values: object) {
    const res = await Request.post('/upwd', values)
    if (res.data.code === 200) {
      message.success('修改成功');
      setTimeout(() => {
        window.history.go(0)
      }, 800);
    } else {
      message.error(res.data.msg);
    }
  }

  handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        values.account = getCookie('account')
        let temp = deepClone(values)
        delete temp.npassword
        delete temp.confirm
        Request.post('/rightpwd', values).then((res: { data: { code: number; msg: any; }; }) => {
          if (res.data.code === 250) {
            message.error(res.data.msg);
            return false
          } else if (res.data.code === 200) {
            delete values.opassword
            delete values.confirm
            this.submit(values)
          }
        })
      }
    });
  };

  handleConfirmBlur = (e: any) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule: any, value: any, callback: (arg0: string | void) => void) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('npassword')) {
      callback('两次输入的密码不一致！');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule: any, value: any, callback: () => void) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = (value: any) => {
    let autoCompleteResult: string[];
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <div className='containers upwd'>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="旧密码" hasFeedback>
            {getFieldDecorator('opassword', {
              rules: [
                {
                  required: true,
                  message: '请输入现在的密码！',
                }
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="新密码" hasFeedback>
            {getFieldDecorator('npassword', {
              rules: [
                {
                  required: true,
                  message: '请输入新密码！',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="确认密码" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: '请输入新密码！',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button ghost type="primary" htmlType="submit">
              提交
          </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Form.create()(Updatepwd)
