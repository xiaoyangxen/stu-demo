const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
// 密码的验证规则
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required()
const nickName = joi.required()
const avatarUrl = joi.required()
const open_id = joi.required()
// 注册和登录表单的验证规则对象
exports.login_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    username,
    password,
  },
}
exports.reg_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    username,
    password,
    nickName,
    open_id,
    avatarUrl
  },
}