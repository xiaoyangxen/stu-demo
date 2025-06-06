const db = require('../db/index')
exports.getlunbo = (req,res)=>{
    const sqlStr = 'select * from hp_lunbo'
    db.query(sqlStr,(err,results)=>{
        if(err) return res.cc(err)
        const num = results.length
        res.send({
            status: 0,
            // 传过去数据的条数
            num:num,
            data: results
        })

    })
}