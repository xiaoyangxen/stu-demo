const db = require("../db/index");
const bcrypt = require("bcryptjs");
// 生成token字符串
const jwt = require("jsonwebtoken");
const config = require("../config");
exports.regUser = (req, res) => {
  const userInfo = req.body;
  console.log(userInfo);
  if (!userInfo.username || !userInfo.password) {
    return res.cc("用户名或密码不能为空");
  }
  // 检测用户是否被占用
  const sqlStr = "select * from ev_users where username=?";
  db.query(sqlStr, [userInfo.username], (err, result) => {
    // sql执行失败
    if (err) {
      return res.cc(err);
    }
    // 用户名被占用
    if (result.length > 0) {
      return res.cc("用户名被占用，请更换用户名");
    }
    // 对密码进行加密，然后插入到数据库中
    userInfo.password = bcrypt.hashSync(userInfo.password, 10);
    // 新用户sql语句
    const sqlStr2 = "insert into ev_users set ?";
    db.query(
      sqlStr2,
      {
        username: userInfo.username,
        password: userInfo.password,
        nickname: userInfo.nickName,
        open_id: userInfo.open_id,
        user_pic: userInfo.avatarUrl,
      },
      (err, result) => {
        // 执行sql语句失败
        if (err) {
          return res.cc(err);
        }
        // sql执行成功，但影响行数不为1
        if (result.affectedRows !== 1) {
          return res.cc("注册用户失败，请稍后重试");
        }
        res.cc("注册成功", 0);
      }
    );
  });
  // res.cc('注册成功',0)
};
exports.login = (req, res) => {
  const userInfo = req.body;
  console.log(userInfo);
  const sqlStr = "select * from ev_users where username = ?";
  db.query(sqlStr, userInfo.username, (err, result) => {
    // 执行sql语句失败
    if (err) return res.cc(err);
    if (result.length !== 1) return res.cc("登录失败");
    // 拿着用户输入的密码,和数据库中存储的密码进行对比
    const compareResult = bcrypt.compareSync(
      userInfo.password,
      result[0].password
    );

    // 如果对比的结果等于 false, 则证明用户输入的密码错误
    if (!compareResult) {
      return res.cc("登录失败！");
    }
    const user = {
      ...result[0],
      id: "",
      password: "",
      user_pic: "",
      nickname: "",
    };
    // const user = [{username: result.username,open_id: result.open_id}]
    console.log(user);
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: "30h", // token 有效期为 30 个小时
    });
    res.send({
      status: 0,
      message: "登录成功！",
      data: result,
      // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
      token: "Bearer " + tokenStr,
    });
  });
  // const sqlStr2 = 'update ev_users set nickname=?,user_pic=? where username=?'
  // db.query(sqlStr2,{nickname:userInfo.nickname,user_pic:userInfo.user_pic,username:userInfo.username},(err,result)=>{
  //     // 执行sql语句失败
  //     if(err) return res.cc(err);
  //     // sql执行成功，但影响行数不为1
  //     if(result.affectedRows !== 1) {
  //         return res.cc('注册用户失败，请稍后重试')
  //     }
  //     res.cc('修改数据库成功',0)
  // })
};
