const express = require('express')
const router = express.Router()
// 获取用户购物车中的商品数据
const {getMyCart} = require('../router_handler/cart')
router.post('/myCart',getMyCart)
// 添加购物车按钮
const {addCart}= require('../router_handler/cart')
router.get('/add',addCart)
// 修改购物车中商品数量
const {reviseCart} = require('../router_handler/cart')
router.get('/revise',reviseCart)
// 删除购物车
const {removeCart} = require('../router_handler/cart')
router.get('/remove',removeCart)
module.exports = router