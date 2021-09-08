
var http = require('http');
let co = require('co');//异步控制器


/**获取列表 */
let getLinkRouteLevelList = async (ctx, next) => {
    let request = ctx.request;
    let req_headers= request.headers
    let req_body = request.body;//从请求body中获取参数
    let req_query = request.query;
    let postdata = JSON.stringify(req_body);//转换成字符串
    var content = '';
    var body_request = {
        hostname:"newtest-logistics-api.intramirror.com",
        port: 80,
        path: `/tracking/monitor/getLinkRouteLevelList?type=${req_query.type}`,
        method: "get",
        headers: {
            // "Accept": "application/json",
            // "Content-Type": "application/json;charset=UTF-8",
            // 'Content-Length': postdata.length,//填写数据长度
            "token": req_headers.token
        }
    };

	/***请求第三方接口***/
    function sendHttpRequest() {
    	/*****创建promise函数****/
        const start = new Date()
        return new Promise(function (resolve, reject) {
        	/*****正常的发请求****/
            var req = http.request(body_request, (res) => {
				/*****设置编码****/
                res.setEncoding('utf-8');
                /*****合并返回数据****/
                res.on('data', (chunk) => {
                    content += chunk;
                });
                /*****数据获取完成后 resolve提交****/
                res.on('end', () => {
                    console.log(content)
                    resolve({ result: true, data: JSON.parse(content), time: new Date() - start });
                });
            })
			/*****发送请求体*****/
            req.write(postdata);
			/*****异常处理*****/
            req.on('error', function (err) {
                resolve({ result: false, errmsg: err.message });
            });
			/*****结束请求*****/
            req.end();
        });
    }
    let res = await co(function* () {//使用生成器函数并且掉用请求 res保存返回内容
        let req_res = yield sendHttpRequest();
        /**********/
        //todo
        /**********/
        return req_res
    });
	/*****把接口返回的数据发送给前端*****/
    return res
}

module.exports = { getLinkRouteLevelList }
