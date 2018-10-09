import React from 'react';
import {Form,Modal,Checkbox,Input  } from 'antd';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

const OperationModal = Form.create()(
  class extends React.Component {
    constructor(props) {
      super(props);
    }
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
    render() {
      const {visible,handleOk,handleCancel} = this.props;
      const { getFieldDecorator } = this.props.form;
      const plainOptions = ['余额查询', '明细查询', '对外支付'];
      const plainOptionTwo = ['资金归集', '多级账户', '只能存款'];
      const formItemLayout = {
        labelCol: {
          xs: { span: 8 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 16 },
          sm: { span: 16 },
        },
      };
      function onChange(checkedValues) {
        console.log('checked = ', checkedValues);
      }
      return (
        <>
          <Modal
            title="授权账号"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={600}>
            <Form onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="账号" >
                {getFieldDecorator('account', {
                  rules: [{required: true, message: 'Please input your account!',}],
                })(
                  <Input disabled placeholder='回显' style={{textAlign:'center'}} style={{width: '200px'}}/>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="账户授权" >
                {getFieldDecorator('state', {
                  rules: [{required: true, message: 'Please check!',}],
                })(
                  <CheckboxGroup options={plainOptions} initialValue={['Apple']} onChange={onChange} />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="产品权限" >
                {getFieldDecorator('product', {
                  rules: [{required: true, message: 'Please check!',}],
                })(
                  <CheckboxGroup options={plainOptionTwo} initialValue={['Apple']} onChange={onChange} />
                )}
              </FormItem>
            </Form>
          </Modal>
        </>
      );
    }
  });

export  default OperationModal;
