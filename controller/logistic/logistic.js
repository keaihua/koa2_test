const {apiservice} = require("../utils/serive");

let getLinkRouteLevelList = async (ctx, next) => {
  console.log('---getLinkRouteLevelList ---')
  let request = ctx.request;
  let req_headers = request.headers;
  let req_query = request.query;
  if (!req_headers.token){
    ctx.body = {
      success: false,
      time: "0ms",
      data: {
        msg:"token已失效,请重试"
      },
      old: {},
    };
    return;
  }
  ctx.request_body = {
    hostname: "newtest-logistics-api.intramirror.com",
    port: 80,
    path: `/tracking/monitor/getLinkRouteLevelList?type=${req_query.type}`,
    method: "get",
    headers: {
      token: req_headers.token,
    },
  };

  let res = await apiservice(ctx, next);

  ctx.body = {
    success: res.data.success,
    time: res.time + "ms",
    data: res.data.data,
  };
};
module.exports = {
  getLinkRouteLevelList,
};
