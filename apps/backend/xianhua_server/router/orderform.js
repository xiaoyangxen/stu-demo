const express = require('express')
const router = express.Router()
// 创建订单
const {createOrder} = require('../router_handler/orderform')
router.post('/create',createOrder)
// 查找订单
const {selectOrder} = require('../router_handler/orderform')
router.post('/select',selectOrder)
// 支付订单
const {payOrder} = require('../router_handler/orderform')
router.post('/pay',payOrder)
// 我的订单页面
const {myOrderform} = require('../router_handler/orderform')
router.post('/mine',myOrderform)

module.exports = router