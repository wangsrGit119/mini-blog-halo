const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})


// 云端获取管理配置用户信息

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const inputOpenId = event.key;
  const type = event.type;// 1.云端校验 2.手动输入校验
  const userOpenId = wxContext.OPENID;
  const params = {
  					  username: process.env.username_halo,
  					  password:process.env.pwd_halo,
  				 }
  if(event.type){
	  if(type === 1){
		  if(userOpenId === process.env.openId_me){
        return {event,haloRes:{status:200,params:params,message:"success"}}
		  }else{
			  console.log("非管理员")
        return {event,haloRes:{status:400,message:"非管理员"}}
		  }
	  }else if(type === 2){
		  if(inputOpenId === process.env.openId_me){
        return {event,haloRes:{status:200,params:params,message:"success"}}
		  }else{
        console.log("非法openId")
        return {event,haloRes:{status:400,message:"非法key"}}
		  }
	  }else{
      console.log("非法参数类型") 		
      return {event,haloRes:{status:400,message:"非法参数类型"}}
	  }	
  }else{
    console.log("参数type空缺")
    return {event,haloRes:{status:400,message:"参数type空缺"}}
  }
  
}

