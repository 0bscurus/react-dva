import React from 'react';
import {Form,Row,Col,Input,Select  } from 'antd';
import styles from './SearchForm.css'

const FormItem = Form.Item;
const Option = Select.Option;
const Search=Input.search;
/**
 * description: 查询表单
 * request: expand:高级搜索展开or关闭；toggle：改变高级搜索状态;getFieldDecorator：验证函数
 */
class SearchForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {expand,getFieldDecorator} = this.props;
    // const { getFieldDecorator } = this.props.form;
    console.log(88888989);
    const count = expand ? 4 : 2; //默认显示两行
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
    return (
      <>
        <Form
          className={styles.ant_advanced_search_form}
        >
          <Row style={{ display: 1 < count ? 'block' : 'none',textAlign:'center' }} align='middle'>
            <Col span={8} key={1} >
              <FormItem label='企业' {...formItemLayout} className={styles.formItem}>
                {getFieldDecorator('account', {
                  rules: [{
                    required: false,
                    message: 'Input something!',
                  }],
                })(
                  <Input placeholder="placeholder" />
                )}
              </FormItem>
            </Col>
            <Col span={8} key={2} >
              <FormItem label='用户' {...formItemLayout} className={styles.formItem}>
                {getFieldDecorator('product', {
                  rules: [{
                    required: true,
                    message: 'Input something!',
                  }],
                })(
                  <Select>
                    <Option value="0">0</Option>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            {/*<Col span={8} key={3} >*/}
              {/*<FormItem label={`Field ${3}`} {...formItemLayout} className={styles.formItem}>*/}
                {/*{getFieldDecorator(`field-${3}`, {*/}
                  {/*rules: [{*/}
                    {/*required: false,*/}
                    {/*message: 'Input something!',*/}
                  {/*}],*/}
                {/*})(*/}
                  {/*<Input placeholder="placeholder" />*/}
                {/*)}*/}
              {/*</FormItem>*/}
            {/*</Col>*/}
          </Row>
          <Row style={{ display: 2 < count ? 'block' : 'none' }} align='middle'>
            <Col span={8} key={4} >
              <FormItem label={`Field ${4}`} {...formItemLayout} className={styles.formItem}>
                {getFieldDecorator(`field-${4}`, {
                  rules: [{
                    required: false,
                    message: 'Input something!',
                  }],
                })(
                  <Input placeholder="placeholder" />
                )}
              </FormItem>
            </Col>
            <Col span={8} key={5} >
              <FormItem label={`Field ${5}`} {...formItemLayout} className={styles.formItem}>
                {getFieldDecorator(`field-${5}`, {
                  rules: [{
                    required: false,
                    message: 'Input something!',
                  }],
                })(
                  <Input placeholder="placeholder" />
                )}
              </FormItem>
            </Col>
            <Col span={8} key={6} >
              <FormItem label={`Field ${6}`} {...formItemLayout} className={styles.formItem}>
                {getFieldDecorator(`field-${6}`, {
                  rules: [{
                    required: false,
                    message: 'Input something!',
                  }],
                })(
                  <Input placeholder="placeholder" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row style={{ display: 3 < count ? 'block' : 'none' }} align='middle'>
            <Col span={8} key={7} >
              <FormItem label={`Field ${7}`} {...formItemLayout} className={styles.formItem}>
                {getFieldDecorator(`field-${7}`, {
                  rules: [{
                    required: false,
                    message: 'Input something!',
                  }],
                })(
                  <Input placeholder="placeholder" />
                )}
              </FormItem>
            </Col>
            <Col span={8} key={8} >
              <FormItem label={`Field ${8}`} {...formItemLayout} className={styles.formItem}>
                {getFieldDecorator(`field-${8}`, {
                  rules: [{
                    required: false,
                    message: 'Input something!',
                  }],
                })(
                  <Input placeholder="placeholder" />
                )}
              </FormItem>
            </Col>
            <Col span={8} key={9} >
              <FormItem label={`Field ${9}`} {...formItemLayout} className={styles.formItem}>
                {getFieldDecorator(`field-${9}`, {
                  rules: [{
                    required: false,
                    message: 'Input something!',
                  }],
                })(
                  <Input placeholder="placeholder" />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

export default SearchForm;
