const app = getApp()

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/** 获取dom元素 */
const checkContent = (appid, secret) =>{
  console.log(appid,secret)
  
  
}

const substringUtil = (str) => {
  if (str.length == 0 || str == undefined) {
    return;
  }
  if (str.length > 20) {
    return str.substring(0, 19) + "...";
  } else {
    return str;
  }
}


module.exports = {
  formatTime: formatTime,
  checkContent: checkContent,
  substringUtil:substringUtil
}
