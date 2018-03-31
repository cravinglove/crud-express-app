// 数据操作文件模块
// 职责是操作文件数据，只处理数据，不关心业务

var dbPath = './db.json'

var fs = require('fs')
// 获取所有学生列表
// callback中的参数第一个为err
//  成功是null
//  失败是错误对象
//  第二个参数为data
//    成功为 数组
//    失败为undefined
// return []
exports.find = function(callback){
  fs.readFile(dbPath,'utf8',function(err,data){
    if(err){
      return callback(err)
    }
    callback(null,JSON.parse(data).students)
  })
}

// 添加保存学生
exports.save = function(){

}

// 更新学生
exports.update = function(){

}

// 删除学生
exports.delete = function(){

}