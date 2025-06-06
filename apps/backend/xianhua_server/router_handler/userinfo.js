const db = require('../db/index')
exports.getUserInfo = (req,res)=>{
    const sqlStr = 'select id,username,nickname,user_pic from ev_users where id=?'
    db.query(sqlStr,req.auth.id,(err,result)=>{
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (result.length !== 1) return res.cc('获取用户信息失败！')
        res.send({
            status:0,
            message:'获取用户信息成功！',
            data:result[0]
        })
    })
}