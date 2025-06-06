const express = require('express')
const router = express.Router()
const getHpArticle = require('../router_handler/lunboChoice')
router.get('/lunboArticle',getHpArticle.getHpArticle)

module.exports = router