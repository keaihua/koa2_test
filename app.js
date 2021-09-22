const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const static_ = require('koa-static')
const path = require('path')
const { FMTDT } = require('./utils/utils')


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(static_(__dirname, './'))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  console.log('---logger - start ---',FMTDT(start,'yyyy-MM-dd HH:mm:ss:ms'))
  await next()
  const end = new Date()
  const ms = end - start
  console.log('---logger - end   ---',FMTDT(end,'yyyy-MM-dd HH:mm:ss:ms'))
  console.log(`                        ${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
