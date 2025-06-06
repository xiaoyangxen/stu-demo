const db = require('../db/index')
exports.getAllArticle = (req,res)=>{
    var pages = (req.body.pages -1) * 3
    const sqlStr = 'select * from ev_article_cate where is_delete=0 order by readingtime desc limit ?,3'
    db.query(sqlStr,pages,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length === 0) {
            return res.cc('没有更多数据了')
        }
        res.send({
            status:0,
            data: results
        })
    })
}
