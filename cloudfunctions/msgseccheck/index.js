// 云函数入口文件
const cloud = require('wx-server-sdk')


// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

/**
 * 敏感词校验
 * @param {*} event 
 * @param {*} context 
 */
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const res = await cloud.openapi.security.msgSecCheck({
      content: event.content
    })
    return res;
  } catch (err) {
    return err;
  }
}