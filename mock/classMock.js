'use strict';

const qs = require('qs');
const mockjs = require("mockjs");

const Random = mockjs.Random;

// 数据持久化
let tableListData = {};

if (!global.tableListData) {
  const data = mockjs.mock({
    'data|50': [{
      'key|+1': 1,
      'number|+1': 152014,
      'name': () => {
        return Random.cname();
      },
      'money|10-50' : 20,
      'account|+1': 10000,
      'product|0-3': 1,
    }],
    page: {
      total: 50,
      current: 1,
    },
  });
  tableListData = data;
  global.tableListData = tableListData;
} else {
  tableListData = global.tableListData;
}

module.exports = {
  // 'GET /api/initData' (req, res) {
  //   const page = qs.parse(req.query);
  //   const pageSize = page.pageSize || 10;
  //   const currentPage = page.currentPage || 1;
  //   console.log(page,999999999999999999999999999);
  //   console.log(pageSize,777777777777777777777777777);
  //   let newData = tableListData.data.concat();  //连接过个数组，生成新的数组副本
  //
  //   let data = tableListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  //   tableListData.page.current = currentPage * 1;
  //   console.log(data.length,777777777777777777777777777);
  //   let newPage = {
  //     current: currentPage,
  //     tableSize: pageSize,
  //     total: tableListData.page.total,
  //   }
  //
  //
  //   setTimeout(() => {
  //     res.json({
  //       success: true,
  //       data: data,
  //       page: newPage,
  //     });
  //   }, 200);
  // },



  'POSt /api/query' (req, res) {
    console.log("mock!!!!!!!!!!!!!!!!!!!!!!query");
    var arr = Object.getOwnPropertyNames(req.body);
    let parameters = {};
    let flag = true;
    if(arr.length == 0) { //判断是否有请求参数
      flag = false;
    }else {
      parameters = JSON.parse(req.body);
    }
    let data;
    let newPage;
    const pageSize = parameters.pageSize||10 ;
    const currentPage = parameters.currentPage||1 ;

    let queryData;
    if((typeof parameters.account) == "undefined") { //此查询参数可以为空
      parameters.account = '';
    }
    if(parameters.product == undefined) { //初始化时没有查询参数
      queryData = tableListData.data;
    }else {
      queryData = tableListData.data.filter((p) => { //根据查询数据筛选数组
        return (p.name.indexOf(parameters.account) != -1) && (p.product == parameters.product);
      });
    }
    data = queryData;

    // } else { //不带参数的初始化，直接将tableListData赋值给data
    //   data = tableListData.data;
    // }
    let dataTable = data.slice((currentPage - 1) * pageSize, currentPage * pageSize); //根据当前页数和页面大小计算返回数据
    newPage = {
      current : currentPage,
      tableSize: pageSize,
      total: data.length,
    }
    setTimeout(() => {
      res.json({
        success: true,
        data: dataTable,
        page: newPage,
      });
    }, 200);
  },

  'POST /api/delete' (req, res) {
    console.log("mock!!!!!!!!!!!!!!!!!!!!!!delete");
    let  parameters = JSON.parse(req.body); //将接受到参数转化为对象
    setTimeout(() => {
      tableListData.data = tableListData.data.filter((item) => { //通过number与初始数组对比，相等则忽略
        if (item.number === parameters.number) {
          return false;
        }
        return true;
      });
      tableListData.page.total = tableListData.data.length;
      global.tableListData = tableListData;
      res.json({ //定义返回值
        success: true,
        data: tableListData.data,
        page: tableListData.page,
      });
    }, 200);
  },

  'POST /api/addData' (req, res) {
    console.log("mock!!!!!!!!!!!!!!!!!!!!!!addData");
    let newData = JSON.parse(req.body);
    setTimeout(() => {

      newData.key = tableListData.data.length + 1;
      tableListData.data.unshift(newData);
      tableListData.page.total = tableListData.data.length;
      tableListData.page.current = 1;
      global.tableListData = tableListData;

      res.json({
        success: true,
        data: tableListData.data,
        page: tableListData.page,
      });
    }, 200);
  },

  'POST /api/update' (req, res) {
    console.log("mock!!!!!!!!!!!!!!!!!!!!!!update");

    setTimeout(() => {
      const editItem = JSON.parse(req.body);
      tableListData.data = tableListData.data.map((item) => {
        if (item.number === editItem.number) {
          editItem.key = item.key;
          return editItem;
        }
        return item;
      });

      global.tableListData = tableListData;

      res.json({
        success: true,
        data: tableListData.data,
        page: tableListData.page,
      });
    }, 200);
  },
};
