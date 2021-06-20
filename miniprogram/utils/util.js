const app = getApp()

const formatTime = date => {
  console.log("date",date)
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

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
*/
function formatTimes(number) {
  var format = 'Y/M/D h:m:s'
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];
  var date = new Date(number);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

module.exports = {
  formatTime: formatTime,
  checkContent: checkContent,
  substringUtil:substringUtil,
  formatTimes:formatTimes
}
