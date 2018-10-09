import React from 'react';
import {Form,Button,Row,Col,Icon} from 'antd';
import styles from './MySearch.css';
// import SearchForm from  './SearchForm';


const MySearch = SearchForm =>{

  return  Form.create()(
    class  extends React.Component{
      constructor(props) {
        super(props);
        this.state= {
          expand: false //高级搜索状态
        }
      }

      //高级搜索
      toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
      }

      render() {
        const {query,saveQueryParameters} = this.props;
        const { getFieldDecorator } = this.props.form;
        console.log("search");

        //查询表单验证
        const handleSubmit = (e) => {
          e.preventDefault(); //阻止默认行为，相当于纯html的 return false;
          this.props.form.validateFields((err, values) => {
            if (!err) {
              saveQueryParameters(values); //将查询参数保存下来，以便分页时使用
              let parameters = {...values}; //将分页信息与查询参数结合成新新参数
              query(parameters);
              console.log('Received values of form: ', values);
            }
          });
        };

        //清空表单
        const handleReset = () => {
          console.log("reset @@@@@@@@@@@**************");
          this.props.form.resetFields();
        }

        return (
          <div className={styles.header}>
            <div className={styles.zSearch}>
              <Row span={24} >
                <Col span={12}>
                  <span style={{lineHeight: '50px'}}><Icon type={"search"}/><span> 查询条件</span></span>
                </Col>
                <Col span={12} style={{textAlign:'right'}}>
                  <a style={{ marginRight: '15px', fontSize: '14px',lineHeight: '46px',color:'#000' }} onClick={this.toggle}>
                    高级检索 <Icon type={this.state.expand ? 'up' : 'down'} />
                  </a>
                  <Button type="primary" className={styles.zButton} onClick={handleSubmit}><Icon type="search"/>查询</Button>
                  <Button className={styles.zButton} onClick={handleReset}>重置</Button>

                </Col>
              </Row>


            </div>

            <div>
              <SearchForm expand={this.state.expand} toggle={this.toggle} getFieldDecorator={getFieldDecorator}/>
            </div>

          </div>
        );
      }
    });

}


// const TopSearch = MySearch(SearchForm);
export default MySearch;
