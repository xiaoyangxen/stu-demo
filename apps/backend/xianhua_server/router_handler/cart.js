const db = require('../db/index')
// 添加购物车
exports.addCart = (req,res)=>{
    const open_id = req.auth.open_id;
    const commodity_id = req.query.id;
    // 首先是判断一下自己的购物车中是否有这个商品
    const selectSql = 'select commodity_id,num from ev_cart where open_id=?';
    db.query(selectSql,open_id,(err,results)=>{
        if(err) {
            return res.cc(err)
        }
        let updates =0;
        for(var i = 0;i < results.length;i++) {
            // let num = results[i].num;
            // console.log(num);
            // console.log(results[i].commodity_id);
            // console.log(commodity_id);
            if(results[i].commodity_id == commodity_id) {
                updates = 1
                console.log(updates);
                let num = ++results[i].num;
                // console.log(results[i].num++);
                const upSql = 'update ev_cart set num=? where open_id=? and commodity_id=?'
                db.query(upSql,[num,open_id,commodity_id],(err,result)=>{
                    console.log(result);
                    if(err) {
                        return res.cc(err)
                    }
                    if(result.affectedRows !== 1) {
                        return res.cc('更新购物车中数据数据失败')
                    }
                    res.send({
                        status:0,
                        message:'修改购物车成功'
                    })
                })
            }
        }
        if(updates === 0) {
            const addSql = 'insert into ev_cart set ?'
            db.query(addSql,{commodity_id:commodity_id,open_id:open_id},(err,result)=>{
                if(err) {
                    return res.cc(err)
                }
                if(result.affectedRows !== 1) {
                    return res.cc('插入数据失败')
                }
                res.send({
                    status:0,
                    message: '添加购物车成功'
                })
            })
        }
    })
    
    
}
// 获取到购物车列表
exports.getMyCart = (req,res)=>{
    const open_id = req.auth.open_id;
    console.log(open_id);
    const getUserId = 'select commodity_id,num from ev_cart where open_id=? and is_delete=0 order by commodity_id asc';
    db.query(getUserId,open_id,(err,results)=>{
        if(err) {
            return res.cc(err)
        }
        var cartList = [];
        for(var i = 0;i<results.length;i++) {
            const data = results[i].commodity_id;
            console.log(results[i]);
            cartList.push(data)
        }
        console.log(cartList);
        // 更新ev_commodity中的num
        const updateSql = 'update ev_commodity set num=? where id=?';
        for(var i=0;i<cartList.length;i++) {
            db.query(updateSql,[results[i].num,cartList[i]],(err,resultt)=>{
                if(err) {
                    return res.cc(err)
                }
            })
        }
        // 最终查找到的数据
        const getCommidity = 'select id,name,img,price,descriptions,payNum,num,selected from ev_commodity where id=? order by id desc'
        let list = []
        for(var i=0;i< cartList.length;i++) {
            db.query(getCommidity,cartList[i],(err,result)=>{
                if(err) {
                    return res.cc(err)
                }
                if(result.length !== 1) {
                    return res.cc('获取某商品失败')
                }
                console.log(result);
                // console.log(result);
                list.push(JSON.parse(JSON.stringify(result[0])))
                if(cartList.length === list.length) {
                    res.send({
                    status:0,
                    data:list
                 })
                }
            })
        }
    })
}
exports.reviseCart = (req,res)=>{
    const openid = req.auth.open_id
    const num = req.query.num
    const id = req.query.id
    const updateSql = 'update ev_cart set num=? where commodity_id=? and open_id=?'
    db.query(updateSql,[num,id,openid],(err,result)=>{
        if(err) {
            return res.cc(err)
        }
        if(result.affectedRows !== 1) {
            return res.cc('修改失败')
        }
        res.send({
            starus:0,
            message:'修改成功'
        })
    })
}
exports.removeCart = (req,res) =>{
    // const removeSql = 'update ev_cart set is_delete=1 where commodity_id=? and open_id=?';
    const removeSql = 'delete from ev_cart where commodity_id=? and open_id=?';
    const commodity_id = req.query.commodity_id;
    const open_id = req.auth.open_id
    db.query(removeSql,[commodity_id,open_id],(err,result)=>{
        if(err) {
            return res.cc(err)
        }
        if(result.affectedRows !== 1) {
            return res.cc('删除失败')
        }
        res.send({
            status: 0,
            message: '删除成功'
        })
    })
}