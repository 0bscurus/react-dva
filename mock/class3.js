const Mock=require('mockjs');
const Random = Mock.Random;

const data = Mock.mock({
  'data|50': [{
    'number|+1': 1,
    'name': () => {
      return Random.cname();
    },
    'age|10-50' : 20,
    'account|+1': 10000,
    'product|0-3': 1,
  }],
});

module.exports={
  [`GET /mock/users`](req,res){
  console.log(11111111111111,data);
    res.json({
      success: true,
      data: data,
    });
  },
  //
  // [`POST /api/users`](req,res){
  //
  //   let user=req.body;
  //   console.log(req);
  //   user.id=Mock.mock('@id');
  //   db.data.push(user);
  //
  //   res.status(200).json(user);
  // }
}
