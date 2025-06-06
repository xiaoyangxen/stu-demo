const express = require('express')
const router = express.Router()
// 导入路由函数处理模块
const userHandler = require('../router_handler/user')
// console.log(userHandler.regUser);

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { login_schema } = require('../schema/user')
const { reg_schema } = require('../schema/user')

router.post('/reguser',expressJoi(reg_schema),userHandler.regUser)

router.post('/login',expressJoi(login_schema),userHandler.login)

module.exports = router