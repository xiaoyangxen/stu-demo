const jwt = require("jsonwebtoken");

// 加密
// const tokenStr = jwt.sign({ username: "yjq", pwd: "123456" }, "555", {
//   expiresIn: "30h", // token 有效期为 30 个小时
// });
// console.log(tokenStr);
/** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlqcSIsInB3ZCI6IjEyMzQ1NiIsImlhdCI6MTc0NzQ4OTI5NiwiZXhwIjoxNzQ3NTk3Mjk2fQ.4MhOggE_LQORitpa_hAB6_Vw7QJq5qB7Zl6YQIa1Zuc */

// 解密
const user = jwt.verify(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlqcSIsInB3ZCI6IjEyMzQ1NiIsImlhdCI6MTc0NzQ4OTI5NiwiZXhwIjoxNzQ3NTk3Mjk2fQ.4MhOggE_LQORitpa_hAB6_Vw7QJq5qB7Zl6YQIa1Zuc",
  "555"
);
console.log(user);
// { username: 'yjq', pwd: '123456', iat: 1747489296, exp: 1747597296 }
