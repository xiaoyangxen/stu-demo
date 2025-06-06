const express = require('express')
const router = express.Router()
// 查找about页面上的所有商品
const {getAllCommodity} = require('../router_handler/commodity')
router.post('/all',getAllCommodity)
// 查找某个商品的详细信息
const {getCommodityDetail} = require('../router_handler/commodity')
router.get('/detail',getCommodityDetail)
// 四种商品的分类
const {getClassification} = require('../router_handler/commodity')
router.post('/classify',getClassification)
// 模糊查询
const {getLike} = require('../router_handler/commodity')
router.post('/like',getLike)

module.exports = router