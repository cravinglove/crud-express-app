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
exports.find = function (callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    callback(null, JSON.parse(data).students)
  })
}

// 根据id获取学生信息
exports.findById = function (id, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).students
    var stu = students.find(function (item) {
      return item.id === parseInt(id)
    })
    callback(null, stu)
  })
}

// 添加保存学生
exports.save = function (student, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).students
    // 处理id
    student.id = students[students.length - 1].id + 1
    // 保存到数组中
    students.push(student)
    // 对象转字符串
    var fileData = JSON.stringify({
      students: students
    })
    // 字符串保存到文件中
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        return callback(err)
      }
      // 成功错误对象就为空
      callback(null)
    })
  })
}

// 更新学生
exports.updateById = function (student, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).students

    student.id = parseInt(student.id)

    // ES6数组方法
    // 遍历项符合传入的函数时，停止遍历并返回该项
    var stu = students.find(function (item) {
      return item.id === parseInt(student.id)
    })

    for (var key in student) {
      stu[key] = student[key]
    }

    var fileData = JSON.stringify({
      students: students
    })

    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}

// 删除学生
exports.deleteById = function (id, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).students
    
    // findIndex专门用于根据条件查找元素的下标
    var deleteId = students.findIndex(function(item){
      return item.id === parseInt(id)
    })

    students.splice(deleteId,1)

    var fileData = JSON.stringify({
      students: students
    })

    fs.writeFile(dbPath, fileData, function(err){
      if (err){
        return callback(err)
      }
      callback(null)
    })
  })
}