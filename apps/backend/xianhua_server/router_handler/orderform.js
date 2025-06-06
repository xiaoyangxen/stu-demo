const db = require('../db/index')
const {nanoid} = require('nanoid')
exports.createOrder = (req,res)=>{
    const commodity = req.body.commodity
    const num = req.body.num
    const open_id = req.auth.open_id;
    const totalPrice = req.body.totalPrice;
    const pub_date = new Date();
    const id = nanoid();
    const insertSql = 'insert into ev_orderform set ?'
    db.query(insertSql,{commodity:commodity,num:num,open_id:open_id,pub_date:pub_date,id:id,totalPrice:totalPrice},(err,result)=>{
        if(err) {
            return res.cc(err)
        }
        // sql执行成功，但影响行数不为1
        if(result.affectedRows !== 1) {
            return res.cc('添加订单失败')
        }
        res.send({
            status:0,
            orderId:id
        })

    })
}

exports.selectOrder = (req,res)=>{
    const id = req.body.id;
    const open_id = req.auth.open_id;
    const selectSql = 'select * from ev_orderform where id=? and open_id=?';
    db.query(selectSql,[id,open_id],(err,result)=>{
        if(err) {
            return res.cc(err)
        }
        // sql执行成功，但影响行数不为1
        if(result.length !== 1) {
            return res.cc('查找订单失败')
        }
        res.send({
            status:0,
            data:result
        })
    })
}
exports.payOrder = (req,res)=>{
    const id = req.body.id;
    const address_id = req.body.address_id;
    const open_id = req.auth.open_id;
    let info = {
        status: '支付成功',
        address_id: address_id
    }
    const updateSql = 'update ev_orderform set ? where id=? and open_id=?';
    db.query(updateSql,[info,id,open_id],(err,result)=>{
        if(err) {
            return res.cc(err)
        }
        // sql执行成功，但影响行数不为1
        if(result.affectedRows !== 1) {
            return res.cc('支付失败')
        }
        res.cc('支付成功',0)
    })
}

exports.myOrderform = (req,res)=>{
    const open_id = req.auth.open_id;
    const selectSql = 'select * from ev_orderform where open_id=?'
    db.query(selectSql,open_id,(err,results)=>{
        if(err) {
            return res.cc(err)
        }
        res.send({
            status:0,
            data:results
        })
    })
}