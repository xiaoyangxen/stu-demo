const db = require("../db");
const path = require('path')

exports.addArticle = (req,res)=>{
    console.log(req.body) // 文本类型的数据
    console.log('--------分割线----------')
    console.log(req.file) // 文件类型的数据
    if (!req.file || req.file.fieldname !== 'img'){
        return res.cc('文章图片是必选参数！')
    }
    const articleInfo ={
        ...req.body,
        // img: path.join('/upload', req.file.filename),
        img: 'http://127.0.0.1:3000/upload/' + req.file.filename,
        pub_date: new Date(),
        auther_id: req.auth.open_id
    }
    const insertSql = 'insert into ev_articles set ?'
    db.query(insertSql,articleInfo,(err,result)=>{
        if(err) {
            return res.cc(err)
        }
        if (result.affectedRows !== 1){
            return res.cc('发布文章失败')
        }
        res.cc('发布文章成功',0)

    })
}
exports.myArticle = (req,res)=>{
    var auther_id = req.auth.open_id;
    const sqlStr = 'select title,content,img,state,pub_date from ev_articles where auther_id=? and is_delete=0';
    db.query(sqlStr,auther_id,(err,results)=>{
        if(err) {
            return res.cc(err)
        }
        res.send({
            status: 0,
            data: results
        })
    })
}