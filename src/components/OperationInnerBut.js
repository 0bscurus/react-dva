import React from 'react';


class OperationInnerBut extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {
    const {lookModal,updateModal,showConfirm,record,deleteData} = this.props;
    return (
      <div>
        <a onClick={()=>{
          lookModal(record);
        }}>查看 </a>
        <a onClick={()=>{
          updateModal(record);
        }}>修改 </a>
        <a onClick={() => {showConfirm(record,deleteData)}}>删除 </a>
      </div>
    );
  }

}

export default OperationInnerBut;
