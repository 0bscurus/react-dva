import React from 'react';

import { Layout, Menu, Icon} from 'antd';
import styles from './class3.css';
import { connect } from 'dva';
import MySearch from '../components/MySearch';
import SearchForm from '../components/SearchForm';
import MyDataTable from '../components/MyDataTable'
import OperationInnerBut from '../components/OperationInnerBut'

const { SubMenu } = Menu;
const { Footer, Sider } = Layout;
const TopSearch = MySearch(SearchForm);
let DataTable = MyDataTable(OperationInnerBut);

class SiderDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,   //控制左边菜单栏收起还是展开
      queryParameters: {}, //保存查询参数
      showSearch: true,   //收起查询or展开查询
    }
  }

  //控制左边菜单栏收起还是展开
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  componentDidMount(){ //第一次渲染之后执行
    this.query(); //第一次初始化将分页信息传入
  }

  //报存查询参数
  saveQueryParameters = (parameters) => {
    this.setState({
      queryParameters: parameters,
    });
  }

  //收起查询or展开查询 文本
  changeSearch = () => {
    let flag = this.state.showSearch ? false : true;
    this.setState({
      showSearch: flag,
    });
  }

  //进入model初始化或展示查询数据
  query = (child) => {
    this.props.dispatch({
      type: 'classModel/query',
      payload: child,
    });
  }

  //查询表格数据
  // query = (child) => {
  //   this.props.dispatch({
  //     type: 'classModel/query',
  //     payload: child,
  //   });
  // }

  //删除表格数据
  delete = (child) => {

    this.props.dispatch({
      type: 'classModel/delete',
      payload: child,
    });
  }
  //增加表格数据
  addData = (child) => {

    this.props.dispatch({
      type: 'classModel/add',
      payload: child,
    });
  }

  //修改表格数据
  update = (child) => {
    this.props.dispatch({
      type: 'classModel/update',
      payload: child,
    });
  }

  render() {



    const { classModel } = this.props;
    return (
      <>
        <div className={styles.topHeader}>
          <div className={styles.headerleft}>
            <div className={styles.homeLog}></div>
          </div>
          <div className={styles.headerRight}>
           <ul>
             <li style={{color:"#fff"}}><Icon type="copyright"/></li>
             <li style={{color:"#fff"}}><Icon type="compass"/></li>
             <li style={{color:"#fff"}}><Icon type="camera"/></li>
             <li style={{color:"#fff"}}><Icon type="heart"/></li>
             <li style={{width:"130px",color:"#fff"}}><Icon type="smile"/>你好，交易银行</li>
           </ul>

          </div>
        </div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

              <Menu.Item key="20" style={{paddingTop:'10px'}}><span><Icon type="desktop" />首页</span></Menu.Item>
              {/*<SubMenu*/}
               {/**/}
                {/*title={<span><Icon type="desktop" /><span>首页</span></span>} className={styles.subMenu}>*/}
              {/*</SubMenu>*/}
              <SubMenu
                key="sub1"
                title={<span><Icon type="book" /><span>任务中心</span></span>} className={styles.subMenu} style={{paddingTop:'5px'}}>
                <Menu.Item key="3">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={<span><Icon type="team" /><span>企业管理</span></span>} className={styles.subMenu}>
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
                title={<span><Icon type="desktop" /><span>行业产品</span></span>} className={styles.subMenu}>
                <Menu.Item key="7">Team 1</Menu.Item>
                <Menu.Item key="9">Team 2</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                title={<span><Icon type="pie-chart" /><span>资金池产品</span></span>} className={styles.subMenu}>
                <Menu.Item key="10">Team 1</Menu.Item>
                <Menu.Item key="11">Team 2</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub5"
                title={<span><Icon type="bars" /><span>账户管理</span></span>} className={styles.subMenu}>
                <SubMenu
                  key="sub7"
                  title={<span><Icon type="appstore" /><span>行内账户管理</span></span>}>
                  <Menu.Item key="10"><span><Icon type="mail"/></span>账户授权用户</Menu.Item>
                  <Menu.Item key="11">Team 2</Menu.Item>
                </SubMenu>

              </SubMenu>
              <Menu.Item key="14">
                <Icon type="file" />
                <span>工作流设置</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{backgroundColor: '#f9f9f9'}}>
            <div className={styles.title}>
              <span>账户授权用户</span>
            </div>

            <div className={styles.cont_inner}>
              {
                this.state.showSearch ? <TopSearch query={this.query} saveQueryParameters={this.saveQueryParameters}/> : null
              }

              <DataTable dataSource={classModel.tableData} page={classModel.page} addData={this.addData} update={this.update}
                           query={this.query} deleteData={this.delete} queryParameters={this.state.queryParameters}
                           changeSearch={this.changeSearch} showSearch={this.state.showSearch} />


            </div>

            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>

    </>
    );
  }
}



function mapStateToProps(state) {

  const { classModel, loading } = state;

  return { classModel, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const App = connect(mapStateToProps, mapDispatchToProps)(SiderDemo);

export default App;
