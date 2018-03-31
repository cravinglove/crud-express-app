// 根据不同的请求方法和请求路径处理请求
// 保证模块职责单一

var fs = require('fs')
var express = require('express')
var Student = require('./student')

// 1. 定义一个容器
var router = express.Router()

router.get('/students', function (req, res) {
  // readFile的第二个参数可选，把读取的文件按utf8编码
  // 除了按照这种方式也可以用toString将二进制数据转换为字符串格式
  // fs.readFile('./db.json', 'utf8', function (err, data) {
  //   if (err) {
  //     return res.status(500).send('Server Error.')
  //   }
  //   // 文件中读取到的数据为字符串，要转换为对象，需要调用parse方法
  //   var students = JSON.parse(data).students
  //   res.render('index.html', {
      // fruits: [
      //   '苹果',
      //   '香蕉',
      //   '橘子'
      // ],
      // students: students
  //   })
  // })
  Student.find(function(err, students){
    if(err){
      return res.status(500).send('Server error')
    }
    res.render('index.html',{
      fruits: [
        '苹果',
        '香蕉',
        '橘子'
      ],
      students: students
    })
  })
})

router.get('/students/new',function(req,res){
  res.render('new.html')
})

router.post('/students/new',function(req, res){
  // console.log(req.body)
  // 1.获取表单数据
  // 2.处理数据
  //  将数据保存在data.json文件中持久化
  // 先读取转对象，向对象中push数据，再将对象转为字符串，将字符串写入原文件
  // 3.发送响应
})

router.get('/students/edit',function(req,res){

})

router.post('/students/edit',function(req,res){

})

router.get('/students/delete',function(req,res){

})


module.exports = router

// 这样也可以
// module.exports = function (app) {
//   app.get('/', function (req, res) {
//     // readFile的第二个参数可选，把读取的文件按utf8编码
//     // 除了按照这种方式也可以用toString将二进制数据转换为字符串格式
//     fs.readFile('./db.json', 'utf8', function (err, data) {
//       if (err) {
//         return res.status(500).send('Server Error.')
//       }
//       // 文件中读取到的数据为字符串，要转换为对象，需要调用parse方法
//       var students = JSON.parse(data).students
//       res.render('index.html', {
//         fruits: [
//           '苹果',
//           '香蕉',
//           '橘子'
//         ],
//         students: students
//       })
//     })
//   })
// }