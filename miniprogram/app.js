//app.js
import deviceUtil from "./lin-ui/dist/utils/device-util"
App({

  // 引入`towxml3.0`解析方法
	towxml:require('/towxml/index'),
  //自定义bar height
  capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
  // 自定义tabbar
  list:[
    {
        pagePath:"/pages/index/index",
        text:"首页",
        iconPath:"/images/home.png",
        selectedIconPath:"/images/home-active.png"
    },
    {
      pagePath:"/pages/history/history",
      text:"分类",
      "iconPath": "/images/history_record.png",
      "selectedIconPath": "/images/history_record-active.png"
    },
    {
    pagePath:"/pages/mine/mine",
    text:"我的",
    "iconPath": "/images/footer-icon-04.png",
    "selectedIconPath": "/images/footer-icon-04-active.png"
    },
  ],
 
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'suke-blog-dev-3g5mwey7b0ffec16',
        traceUser: true,
      })
    }

    this.globalData = {
      baseUrl: 'https://wangsrbus.cn/api', //api
      api_access_key:"wangjianlong", //token
      index_bg_image_url:"https://cdn.jsdelivr.net/gh/wangsrGit119/wangsr-image-bucket/img-article/photo-1507738978512-35798112892c.jfif",//首页背景
      title:"SUKE'S SHARE",//自定义title
    
    }
  }
})
