const express = require('express')
const router = express.Router()
const getAllArticle = require('../router_handler/allArticle')
router.post('/allArticle',getAllArticle.getAllArticle)

module.exports = router