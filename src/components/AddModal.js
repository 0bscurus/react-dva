import {  Modal, Form, Button} from 'antd';
import  React from 'react';

function OperationModal(OperationFrom) {
  return Form.create({
    mapPropsToFields(props) {
      const {modifyData} = props;
      const temp = {};
      Object.keys(modifyData).forEach(function (item) {
        temp[item] = Form.createFormField({
          value: modifyData[item],
        });
      });

      return temp;

    },
  })(
    class extends React.Component {
      render() {
        const {visible, handleCancel, handleOk, form, confirmLoading, addData, editType, update, clearForm} = this.props;
        const {getFieldDecorator} = form;

        const handleReset = () => {
          clearForm(); //清空from数据
          this.props.form.resetFields();
        }

        const handleCancelClear = () => {
          handleCancel();
          handleReset();
        }
        const handleSubmit = (e) => {
          e.preventDefault();
          this.props.form.validateFields((err, values) => {
            if (!err) {
              handleOk();
              if (editType === 0) {
                addData(values);
              } else {
                update(values);
              }
              handleReset();
              console.log('Received values of form: ', values);
            }
          });
        };
        const isDisabled = editType === 2 ? true : false //查看不可更改
        const footerButton = editType === 2 ? <Button onClick={handleCancelClear}>关闭</Button> :
          <> <Button onClick={handleCancelClear}>取消</Button> <Button onClick={handleSubmit}
                                                                     type="primary">确定</Button></>; //组装modal底部按钮


        //组装modal title
        const modalTitle = (editType) => {
          if (editType === 0) {
            return '新增';
          } else if (editType === 1) {
            return '修改';
          } else {
            return '查看';
          }
        };
        return (

          <Modal
            title={modalTitle(editType)}
            destroyOnClose='true' //关闭后销毁表单元素
            visible={visible}
            footer={footerButton}
            onCancel={handleCancel}
            confirmLoading={confirmLoading}
            width={880}
          >
            <OperationFrom getFieldDecorator={getFieldDecorator} isDisabled={isDisabled}/>
          </Modal>
        );
      }
    }
  );
}
export  default OperationModal;
