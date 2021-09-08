const router = require('koa-router')()
const fs = require('fs')
const puppeteer = require('puppeteer')
let path = require('path')
const logistic = require('../controller/logistic/logistic')

router.get('/htmlToImg', async (ctx, next) => {
  const query = ctx.query
  console.log('-query-',query)
  const imgfrom = `http://${ctx.request.header.host}/static/html/jd.html`
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(imgfrom,{
    timeout: 30 * 1000,
    waitUntil: [
      'load', //等待 “load” 事件触发
    ]
  });
 const imgdata = await page.screenshot({
    path: 'example.png', 
    clip: {
      x: 0,
      y: 0,
      width: 740,
      height: 856,
    },
    encoding: 'base64'
  });
  const obj = {
    code: 200,
    data: imgdata
  }
  ctx.body = obj;

  await page.close();
  await browser.close();
  // await next();
})

router.get('/testget', async (ctx, next) => {
  ctx.body = {
    code: 200,
    msg: "hello im from get"
  }
})

router.post('/testpost', async (ctx, next) => {
  ctx.body = {
    code: 200,
    msg: "hello im from post"
  }
})

router.post('/toarr', async (ctx, next) => {
  const query = ctx.query
  let arr = []
  let len = query.len || 100
  for(let i =0; i < len; i++){
    arr.push({
      key: `第${i+1}次`,
      value: i
    })
  }
  ctx.body = {
    code: 200,
    data: {
      arr: arr
    },
    msg: "hello im from post"
  }
})

router.get('/getLinkRouteLevelList', logistic.getLinkRouteLevelList)





module.exports = router
