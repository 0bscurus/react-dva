import React from 'react';
import {Table,Button,Icon ,Modal  } from 'antd';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import styles from './myDataTable.css'
import OperationModal from '../components/AddModal';
import OperationFrom from './OperationFrom';
import TableOperationButton from './TableOperationButton';
import  './DataTable.less';

const ButtonGroup = Button.Group;
const confirm = Modal.confirm;



function MyDataTable(OperationInnerBut) {

  return class extends OperationInnerBut {
    constructor(props) {
      super(props);
      this.state = {
        visible: false,         //新增/修改modal显示or不显示
        confirmLoading: false,  //新增/修改modal的确定按钮 loading
        modalType: 0,  //区分新增或修改modal,0代表新增，1代表修改，2代表查看
        fields: {},    //数据回显
      }
    }

    //显示新增Modal
    showModal = () => {
      console.log("showModal*****************");
      this.setState({
        visible: true,
      })
    }

    //区分新增modal
    addModal = () => {
      this.setState({
        modalType: 0,
        visible: true,
      })
    }

    //区分修改modal
    updateModal = (record) => {
      this.setState({
        modalType: 1,
        fields: record,
        visible: true,
      })
    }

    //区分查看modal
    lookModal = (record) => {
      this.setState({
        modalType: 2,
        fields: record,
        visible: true,
      })
    }

    //清空form
    clearForm = () => {
      this.setState({
        fields: {},
      })
    }

    //model确认按钮
    handleOk = () => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });

    }

    //model取消按钮
    handleCancel = () => {
      console.log('Clicked cancel button');
      this.setState({
        visible: false,
      });
    }

    //table多选框
    rowSelection = {
      columnWidth: 15,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    //删除提示框
    showConfirm(content, deleteData) {
      confirm({
        title: 'Do you Want to delete these items?',
        content: '姓名：' + content.name,
        onOk() {
          deleteData(content);
          console.log('OK');
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }

    //table列
    columns = [{
      title: '账号',
      key: '1',
      dataIndex: 'number',
      render: text => <a href="javascript:;">{text}</a>,

    }, {
      title: '币种',
      dataIndex: 'money',
      key: '2',
      width: '12%',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    }, {
      title: '户名',
      dataIndex: 'name',
      key: '4',
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
    }, {
      title: '账户权限',
      dataIndex: 'account',
      key: '5',
    }, {
      title: '产品权限',
      dataIndex: 'product',
      key: '6',
    }, {
      title: '操作',
      fixed: 'right',
      key: 'operation',
      width: '100px',
      align: 'center',
      render: (text, record) => {
        const elementsTree = super.render();
        let counter = elementsTree.props.children.length;
        return (
          <div className={styles.operation_menu}>
            {
              counter >= 3 ? <>
                <div className={styles.point}><a><Icon type="ellipsis"/></a></div>
                <div className={styles.operation_menu_item}>
                  <OperationInnerBut lookModal={this.lookModal}
                                     updateModal={this.updateModal}
                                     showConfirm={this.showConfirm} deleteData={this.deleteData} record={record}/>
                </div>
              </> : <div className={styles.point2}>
                <OperationInnerBut lookModal={this.lookModal} showModal={this.showModal} updateModal={this.updateModal}
                                   showConfirm={this.showConfirm} deleteData={this.deleteData} record={record}/>
              </div>
            }
          </div>

        )
      }
    }];
    deleteData = this.props.deleteData;

    render() {
      //table数据
      const {dataSource, page, query, queryParameters, showSearch, changeSearch, addData, update} = this.props;//拿到父组件传递过来的属性

      //当表格改变分页信息时
      let onChange = (pagination, filters, sorter) => {
        let pageParameter = { //获取当前页和页面大小
          pageSize: pagination.pageSize,
          currentPage: pagination.current
        }
        let parameters = {...pageParameter, ...queryParameters}; //将查询参数和页面信息组合在一起形成最终的查询参数

        query(parameters); //调用方法重新获取数据
      }

      //table分页
      const pagination = {
        total: page.total,
        showTotal: total => '共 ' + total + ' 条数据',
        pageSize: page.tableSize,
        current: page.current,
        showQuickJumper: true,
        showSizeChanger: true
      }

      const Addmodal = OperationModal(OperationFrom); //新增，查看，修改公共modal
      return (
        <>
          <div className={styles.content}>
            <div className={styles.contentTop}>
              <span style={{marginLeft: 20}}><Icon type="menu-fold"/><span> 数据列表</span></span>
              <ButtonGroup className={styles.operation_button}>
                <TableOperationButton changeSearch={changeSearch} showSearch={showSearch} addModal={this.addModal}
                                      showModal={this.showModal}/>
              </ButtonGroup>
            </div>
            <div className={styles.dataTable}>
              <LocaleProvider locale={zh_CN}>
                <Table rowSelection={this.rowSelection} columns={this.columns} dataSource={dataSource}
                       pagination={pagination} onChange={onChange} scroll={{x: 1500}} bordered/>
              </LocaleProvider>
            </div>
          </div>

          {/*<OperationModal visible={this.state.visible} handleOk={this.handleOk} handleCancel={this.handleCancel}/>*/}

          <Addmodal
            confirmLoading={this.confirmLoading}
            visible={this.state.visible}
            handleCancel={this.handleCancel}
            handleOk={this.handleOk}
            addData={addData}
            update={update}
            clearForm={this.clearForm}
            editType={this.state.modalType}
            modifyData={this.state.fields}
          />
        </>
      );
    }
  }
}

// class MyTable extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       queryParameters: {}, //保存查询参数
//       showSearch: true,   //收起查询or展开查询
//       pageMessage : {
//         currentPage: 1,  //默认当前页
//         pageSize: 10, //页面大小
//       }
//     }
//   }
//   componentDidMount(){ //第一次渲染之后执行
//       this.query(this.state.pageMessage); //第一次初始化将分页信息传入
//   }
//
//   //报存查询参数
//   saveQueryParameters = (parameters) => {
//     this.setState({
//       queryParameters: parameters,
//     });
//   }
//
//   //收起查询or展开查询 文本
//   changeSearch = () => {
//     let flag = this.state.showSearch ? false : true;
//     this.setState({
//       showSearch: flag,
//     });
//   }
//
//   //进入model初始化或展示查询数据
//   query = (child) => {
//     this.props.dispatch({
//       type: 'classModel/query',
//       payload: child,
//     });
//   }
//
//   //查询表格数据
//   query = (child) => {
//     this.props.dispatch({
//       type: 'classModel/query',
//       payload: child,
//     });
//   }
//
//   //删除表格数据
//   delete = (child) => {
//
//     this.props.dispatch({
//       type: 'classModel/delete',
//       payload: child,
//     });
//   }
//   //增加表格数据
//   addData = (child) => {
//
//     this.props.dispatch({
//       type: 'classModel/add',
//       payload: child,
//     });
//   }
//
//   //修改表格数据
//   update = (child) => {
//     this.props.dispatch({
//       type: 'classModel/update',
//       payload: child,
//     });
//   }
//
//
//   render() {
//     // const {searchText,changeSearch,showSearch,showModal} = this.props;
//     const { classModel } = this.props;
//     const TopSearch = MySearch(SearchForm);
//     return (
//       <div className={styles.cont_inner}>
//         {
//           this.state.showSearch ? <TopSearch query={this.query} saveQueryParameters={this.saveQueryParameters} pageMessage={this.state.pageMessage}/> : null
//         }
//
//         <MyDataTable dataSource={classModel.tableData} page={classModel.pageSize} addData={this.addData} update={this.update}
//                      query={this.query} deleteData={this.delete} queryParameters={this.state.queryParameters}
//                      changeSearch={this.changeSearch} showSearch={this.state.showSearch} />
//
//
//       </div>
//     );
//   }
// }
//
// function mapStateToProps(state) {
//
//     console.log("mapStateToProps**************************");
//   const { classModel, loading } = state;
//
//   return { classModel, loading };
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch
//   };
// }
//
// const App = connect(mapStateToProps, mapDispatchToProps)(MyTable);

export  default MyDataTable;
