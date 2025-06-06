const db = require('../db/index')
// 获取about页面上全部的商品信息
exports.getAllCommodity = (req,res) =>{
    const pages = (req.body.pages - 1)*4
    const getAllCommodity = 'select id,name,img,price,descriptions,payNum from ev_commodity where location=? limit ?,4';
    db.query(getAllCommodity,[req.body.location,pages],(err,results)=>{
        // sql执行失败
        if(err) {
            return res.cc(err)
        }
        res.send({
            status:0,
            data: results
        })
    })
}
// 根据id获取到某个商品的全部详细信息
exports.getCommodityDetail = (req,res) =>{
    console.log(req.query);
    const getCommodityDetail = 'select * from ev_commodity where id=?';
    db.query(getCommodityDetail,req.query.id,(err,result)=>{
        // sql执行失败
        if(err) {
            return res.cc(err)
        }
        // sql执行成功，但影响行数不为1
        if(result.length !== 1) {
            return res.cc('查找失败')
        }
        res.send({
            status: 0,
            data: result
        })
    })
}
// 鲜花分类,根据地址和类别来获取植物信息
exports.getClassification = (req,res)=>{
    const pages = (req.body.pages -1)*6
    const getClassification = 'select id,name,img,price,descriptions,payNum from ev_commodity where location=? and classify=? limit ?,6';
    db.query(getClassification,[req.body.location,req.body.classify,pages],(err,results)=>{
        if(err) {
            return res.cc(err)
        }
        if(results.length === 0) {
            return res.cc('没有更多数据了')
        }
        res.send({
            status: 0,
            data: results
        })
    })
}
// 模糊查询
exports.getLike = (req,res)=>{
    const name = req.body.name + '%';
    const location = req.body.location
    const selectSql = 'select * from ev_commodity where location=? and name like ?'
    db.query(selectSql,[location,name],(err,results)=>{
        if(err) {
            return res.cc(err)
        }
        res.send({
            status: 0,
            data:results
        })
    })
}

