const express = require('express')
const { existsSync } = require('fs')
const path = require('path')
const { lookup } = require('mime-types')
const app = express()
// 托管静态资源
app.use(
  '/img',
  express.static('public', {
    setHeaders: (res, path) => {
      res.setHeader(
        'Cache-Control',
        'public, max-age=31536000, immutable'
      )
      res.setHeader(
        'Expires',
        new Date(Date.now() + 31536000000).toUTCString()
      )
    }
  })
)
app.use('/upload', express.static('./uploads'))
// 先添加gzip处理中间件
app.get('/dist/*', (req, res, next) => {
  console.log('原始请求路径:', req.url)

  const acceptEncoding = req.headers['accept-encoding'] || ''
  // 获取原始请求路径（不带/dist前缀）
  const relativePath = req.params[0] // Express路由参数获取
  const mimeType = lookup(relativePath)
  console.log(`文件路径: ${relativePath} => MIME类型: ${mimeType}`)
  // 正确路径：检查./dist目录下的文件
  const filePath = path.join(__dirname, './web/dist', relativePath)
  console.log(
    '处理后路径:',
    path.join(__dirname, './web/dist', req.params[0])
  )
  if (
    acceptEncoding.includes('gzip') &&
    existsSync(filePath + '.gz')
  ) {
    // 仅修改请求路径，不改变路由前缀
    req.url = `/dist/${relativePath}.gz` // 保持/dist前缀
    res.set('Content-Encoding', 'gzip')
    res.type(lookup(relativePath)) // 直接使用原始路径类型
  }
  next()
})

// 后托管静态资源
app.use(
  '/dist',
  express.static(path.join(__dirname, './web/dist'), {
    index: ['index.html.gz', 'index.html'], // 允许查找压缩文件
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.gz')) {
        res.set('Content-Encoding', 'gzip')
        // 修正Content-Type（重要！）
        res.type(lookup(path.basename(filePath, '.gz')))
      }
    }
  })
)
// app.use("/dist", express.static("./dist"));
// app.use("/static", express.static("./dist/static"));
// app.use("/static/css", express.static("./dist/static/css"));
// app.use("/static/js", express.static("./dist/static/js"));
// app.use("/static/png", express.static("./dist/static/png"));

const cors = require('cors')
// 校验
const joi = require('@hapi/joi')
app.use(cors())
// 定义一个全局中间件，res.cc(),处理res.send()
app.use((req, res, next) => {
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断err是错误对象还是字符串
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})
app.use(express.json())
const parser = require('body-parser')
app.use(parser.urlencoded({ extended: false }))
// 解析token的中间件
const config = require('./config')
/** expressjwt 自动解密验证 token 的签名有效性,会将解密后的 payload 挂载到 req.auth 对象 */
var { expressjwt } = require('express-jwt')
app.use(
  expressjwt({
    secret: config.jwtSecretKey,
    algorithms: ['HS256']
  }).unless({
    path: [
      /^\/api\//,
      /^\/hp\//,
      /^\/article\//,
      /^\/commodity\//,
      /^\/static\//,
      /^\/index.html/
    ]
  }),
  (req, res, next) => {
    const now = Date.now()
    /** token续期 */
    if (req.auth && req.auth.exp * 1000 - now < 300000) {
      const tokenStr = jwt.sign(
        {
          ...req.auth,
          exp: Math.floor(Date.now() / 1000) + 30 * 60 * 60
        },
        config.jwtSecretKey
      )
      res.header('X-Refresh-Token', tokenStr)
    }
    next()
  }
)

// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
// 导入用户信息模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)
// 导入轮播信息模块
const lunbo = require('./router/lunbo')
app.use('/hp', lunbo)
// 导入查找首页轮播图文章模块
const getHpArticle = require('./router/lunboChoice')
app.use('/article', getHpArticle)
// 获取所有文章
const getAllArticle = require('./router/allArticle')
app.use('/article', getAllArticle)
// 查找某个文章
const getArticleChoice = require('./router/articleChoice')
app.use('/article', getArticleChoice)
// 添加文章
const addArticle = require('./router/myArticle')
app.use('/myArticle', addArticle)
// 显示我的文章
const myArticle = require('./router/myArticle')
app.use('/myArticle', myArticle)
//获取某个城市的所有商品
const getAllCommodity = require('./router/commodity')
app.use('/commodity', getAllCommodity)
// 模糊查询
// 获取购物车列表
const getMyCart = require('./router/cart')
app.use('/cart', getMyCart)
const removeCart = require('./router/cart')
app.use('/cart', removeCart)
// 获取地址
const getAddress = require('./router/address')
app.use('/address', getAddress)
// 添加地址
const addAddress = require('./router/address')
app.use('/address', addAddress)
// 删除地址
const deleteAddress = require('./router/address')
app.use('/address', deleteAddress)
// 更新地址
const updateAddress = require('./router/address')
app.use('/address', updateAddress)
// 查找显示某个地址
const selectOne = require('./router/address')
app.use('/address', selectOne)
const selectDefault = require('./router/address')
app.use('/address', selectDefault)
// 创建订单
const createOrder = require('./router/orderform')
app.use('/oredrform', createOrder)
// 查找订单
const selectOrder = require('./router/orderform')
app.use('/oredrform', selectOrder)
// 支付订单
const payOrder = require('./router/orderform')
app.use('/oredrform', payOrder)
// 我的订单页面
const myOrderform = require('./router/orderform')
app.use('/oredrform', myOrderform)
// 错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 未知错误
  res.cc(err)
})
// 错误中间件
app.use(function (err, req, res, next) {
  // 省略其它代码...

  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError')
    return res.cc('身份认证失败！')

  // 未知错误...
})
app.listen(3000, () => {
  console.log('api server running at http://127.0.1:3000')
})
