const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
let createFolder = function(folder) {
    try {
        fs.accessSync(folder); // 打开文件夹
    } catch (e) {
        fs.mkdirSync(folder); // 创建文件夹
    } 
};
  let uploadFolder = path.join(__dirname, '../uploads'); // 设定存储文件夹为当前目录下的 /upload 文件夹
  createFolder(uploadFolder);
// 2. 设置磁盘存贮
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadFolder); // 他会放在当前目录下的 /upload 文件夹下（没有该文件夹，就新建一个）
    },
    filename: function(req, file, cb) { // 在这里设定文件名
        cb(null, file.originalname); // file.originalname是将文件名设置为上传时的文件名，file中携带的
        // cb(null, Date.now() + '-' + file.originalname) // 加上Date.now()可以避免命名重复
    }
})
  
let upload = multer({ storage: storage });
// // 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
// const upload = multer({ dest: path.join(__dirname, '../uploads') })
// 添加文章
const {addArticle} = require('../router_handler/myArticle')
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
router.post('/add', upload.single('img'), addArticle)
// 查找我的文章
const {myArticle} = require('../router_handler/myArticle')
router.post('/myArticle',myArticle)

module.exports = router