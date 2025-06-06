
const db = require("../db");

exports.getArticleChoice = (req,res)=>{
    const id = req.query.id;
    const sqlStr = 'select * from ev_article_cate where id=?'
    db.query(sqlStr,id,(err,result)=>{
        if(err) return res.cc(err)
        if(result.length !== 1) {
            return res.cc('查找文章失败')
        }
        res.send({
            status: 0,
            data:result
        })
    })
}
