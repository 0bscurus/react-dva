import  React from 'react';
import {Form,Row,Col,Input} from 'antd'

const FormItem = Form.Item;

class OperationFrom extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    const {getFieldDecorator,isDisabled} = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 16 },
      },
    };

    return (
      <Form layout="inline" >
        <Row>
          <Col span={12} >
            <FormItem label="账号" {...formItemLayout}  style={{width:'100%'}}>
              {getFieldDecorator('number', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input  placeholder="Password" disabled={isDisabled}/>
              )}
            </FormItem>
          </Col>
          <Col span={12} >
            <FormItem label="币种" {...formItemLayout}  style={{width:'100%'}}>
              {getFieldDecorator('money',{
                rules: [{ required: true, message: 'Please input the currency!' }],
              })(
                <Input type="text" disabled={isDisabled} />)}
            </FormItem>
          </Col>
        </Row>
        <Row >
          <Col span={12} >
            <FormItem label="户名" {...formItemLayout}  style={{width:'100%'}}>
              {getFieldDecorator('name',{
                rules: [{ required: true, message: 'Please input the currency!' }],
              })(
                <Input type="text" disabled={isDisabled}/>)}
            </FormItem>
          </Col>
          <Col span={12} >
            <FormItem label="账户权限" {...formItemLayout}  style={{width:'100%'}}>
              {getFieldDecorator('account',{
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input type="text"  disabled={isDisabled}/>)}
            </FormItem>
          </Col>
        </Row>

        <Row >
          <Col span={12} >
            <FormItem label="产品权限" {...formItemLayout}  style={{width:'100%'}}>
              {getFieldDecorator('product')(
                <Input type="text" disabled={isDisabled}/>)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default OperationFrom;
