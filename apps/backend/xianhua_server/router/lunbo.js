const express = require('express')
const router = express.Router()
const lunbo = require('../router_handler/lunbo')
router.post('/lunbo',lunbo.getlunbo)

module.exports = router