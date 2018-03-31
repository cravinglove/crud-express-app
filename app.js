// app.js职责
// 创建服务
// 配置模板引擎
// bodyparser解析请求体
// 提供静态资源
// 挂载路由
// 监听端口

var express = require('express')
var router = require('./router')
var bodyparser = require('body-parser')

var app = express()

app.use('/node_modules',express.static('node_modules'))
app.use('/public',express.static('public'))

app.engine('html', require('express-art-template'))
// 配置模板引擎和bodyParser在挂载路由之前，因为中间件加载有顺序
// parse application/x-www-form-urlencoded解析post请求的formdata数据
app.use(bodyparser.urlencoded({extended: false}))
// parse application/json解析json
app.use(bodyparser.json())

app.use(router)

app.listen(3000, function () {
  console.log('express is running')
})