const db = require('../db/index')
// 添加地址
exports.addAddress = (req,res)=>{
    const open_id = req.auth.open_id;
    const add = req.body;
    console.log(JSON.parse(JSON.stringify(add)));
    const addSql = 'insert into ev_address set ?'
    const messages = {...add,open_id:open_id}
    console.log(messages);
    db.query(addSql,messages,(err,result)=>{
        if(err) {
            return res.cc(err)
        }
        if(result.affectedRows !== 1) {
            return res.cc('添加地址失败')
        }
        res.send({
            status:0,
            message:'添加成功'
        })
    })
}
// 删除地址
exports.deleteAddress = (req,res)=>{
    const open_id = req.auth.open_id;
    const id = req.query.id
    const deleteSql = 'update ev_address set is_delete=1 where id=? and open_id=?'
    db.query(deleteSql,[id,open_id],(err,result)=>{
        if(err) {
            return res.cc(err)
        }
        if(result.affectedRows !== 1) {
            return res.cc('删除地址失败')
        }
        res.send({
            status:0,
            message:'删除成功'
        })
    })

}
// 修改地址
exports.updateAddress = (req,res)=>{
    const open_id = req.auth.open_id;
    const id = req.body.id;
    const info = JSON.parse(JSON.stringify(req.body))
    console.log(info);
    const updateSql = 'update ev_address set ? where id=? and open_id=?'
    db.query(updateSql,[info,id,open_id],(err,result)=>{
        if(err) {
            return res.cc(err)
        }
        console.log(result);
        if(result.affectedRows !== 1) {
            return res.cc('修改地址信息失败')
        }
        res.send({
            status:0,
            message:'修改地址信息成功'
        })
    })
}
// 查询显示地址
exports.selectAddress = (req,res)=>{
    const open_id = req.auth.open_id;
    const selectSql = 'select * from ev_address where is_delete=0 and open_id=?'
    db.query(selectSql,open_id,(err,results)=>{
        if(err){
            res.cc(err)
        }
        res.send({
            status:0,
            data: results
        })
    })
}
// 查找某个地址
exports.selectOne = (req,res)=>{
    const id = req.query.id;
    const selectSql = 'select * from ev_address where id=?'
    db.query(selectSql,id,(err,result)=>{
        if(err){
            res.cc(err)
        }
        res.send({
            status:0,
            data: result
        })
    })
}
// 查找默认地址，订单页面
exports.selectDefault = (req,res)=>{
    const open_id = req.auth.open_id;
    const sql = 'select * from ev_address where open_id=? and default_one=1'
    db.query(sql,open_id,(err,result)=>{
        if(err){
            res.cc(err)
        }
        res.send({
            status:0,
            data: result
        })
    })
}