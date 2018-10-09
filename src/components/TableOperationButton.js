import React from 'react';
import {Button,Icon} from 'antd';

class TableOperationButton extends React.Component{
  constructor(props) {
   super(props);
  }

  render() {
    //changeSearch:是否展开;showSearch:是否展开state;addModal:标记当前展开的是增加框；showModal：显示模态框;
    const {changeSearch,showSearch,addModal,showModal} = this.props;
    return (
      <>
        <Button type="primary" ghost onClick={()=>{addModal();showModal()}}><span><Icon type="plus"/></span>增加</Button>
        <Button type="primary" ghost><span><Icon type="printer"/></span>打印</Button>
        <Button type="primary" ghost><span><Icon type="printer"/></span>授权</Button>
        <Button type="primary" ghost  onClick={()=>{changeSearch()}}><span><Icon type="search" />{showSearch?'查询' : '关闭查询'}</span></Button>
      </>
    );
  }
}

export default TableOperationButton;
