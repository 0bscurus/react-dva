
import { initData, query, deleteData ,addData,update} from '../services/classService';

// const data1 = [];
// for(let i = 0; i < 30; i++) {
//   data1.push(new MyTableData('1010'+i,20,'Lake Park','152014'+i,3000));
// }
//
// function MyTableData(number,age,name,account,product) {
//   // this.key = key;
//   this.number = number;
//   this.age = age;
//   this.name =name;
//   this.account = account;
//   this.product = product;
//   // this.operation = operation;
// }
export default {
  namespace: 'classModel',//命名空间
  state: {//初始化的数据 状态树
    tableData: [],
    page: {}
  },
  reducers: {//纯函数,只有在reducers中才能返回
    init(state, action) {
      return { ...state, ...action.payload } //替换state中的addStateValue并返回state
    },
  },
  effects: {
    *query({payload}, { put, call, select }) {
      console.log("model query"+payload);

      const { data,page } = yield call(query, payload);
      yield put({
        type: 'init',
        payload: {
          tableData: data,
          page: page
        }
      });
    },
    *delete({payload}, { put, call, select }) {
      console.log("model delete"+payload);
      const { data,page } = yield call(deleteData, payload);
      yield put({
        type: 'init',
        payload: {
          tableData: data,
          pageSize: page
        }
      });
    },

    *add({payload}, { put, call, select }) {
      console.log("model add"+payload);
      const { data,page } = yield call(addData, payload);
      yield put({
        type: 'init',
        payload: {
          tableData: data,
          pageSize: page
        }
      });
    },
    *update({payload}, { put, call, select }) {
      console.log("model add"+payload);
      const { data,page } = yield call(update, payload);
      yield put({
        type: 'init',
        payload: {
          tableData: data,
          pageSize: page
        }
      });
    },
  },
};
