const express = require('express')
const router = express.Router()
const {getArticleChoice} = require('../router_handler/articleChoice')
router.get('/hpArticle',getArticleChoice)

module.exports = router