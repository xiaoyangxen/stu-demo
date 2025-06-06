const express = require('express')
const router = express.Router()
// 查询地址信息
const {selectAddress} = require('../router_handler/address')
router.get('/select',selectAddress)
// 添加新地址
const {addAddress} = require('../router_handler/address')
router.post('/add',addAddress)
// 删除地址
const {deleteAddress} = require('../router_handler/address')
router.get('/delete',deleteAddress)
// 更新地址信息
const {updateAddress} = require('../router_handler/address')
router.post('/update',updateAddress)
// 查找显示某个地址
const {selectOne} = require('../router_handler/address')
router.get('/one',selectOne)
// 订单页面查找默认地址
const {selectDefault} = require('../router_handler/address')
router.post('/default',selectDefault)

module.exports = router
