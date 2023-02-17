//app.js
import deviceUtil from "./lin-ui/dist/utils/device-util"
App({


  //自定义bar height
  capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
  onLaunch: function () {
    // if (!wx.cloud) {
    //   console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    // } else {
    //   wx.cloud.init({
    //     // env 参数说明：
    //     //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
    //     //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
    //     //   如不填则使用默认环境（第一个创建的环境）
    //     env: 'suke-blog-dev-3g5mwey7b0ffec16',
    //     traceUser: true,
    //   })
    // }

    //校验版本
    this.autoUpdate()


    this.globalData = {
      domain:'https://blog.wangsrbus.cn',
      baseUrl: 'https://blog.wangsrbus.cn/api', //api
      api_access_key:"xxx", //token
      loading_img:"https://blog.wangsrbus.cn/upload/2021/10/Loading-91388981b05149a69fb9132088b127d1.gif",
      empty_img:"https://blog.wangsrbus.cn/upload/2021/10/empty-img-gift-2021101002-32b4e4acc7774c658093571a8846f498.gif",
      title:"Hi,I'm suke",//自定义title
      shareName:'suke’s share',//小程序分享名称
      openComment:false,//是否开启评论 true为开启 false为关闭 -----------  云端控制请到halo后台配置系统变量 key:suke_wechat_comment value:show/noshow
      index_art_style:'card01', //首页最新文章样式 内置：card01/card02
      openAd:true,//流量主开通则打开
      unitId:'adunit-5d99f79277c3f856',//原生模板广告ID  自定义的时候自己可以选择样式
      unitId2:'adunit-daf156fc94de2fc4',//视频激励广告--用于文章设置观看视频阅读更多功能
      customSlug_one_title:'科技动态',//分类自定义标题 【小程序展示title】
      customSlug_one:'新闻',//分类 【halo文章的分类名称】
      //留言板ID----需要数据库去查询或者F12查看网页端留言页面的id或者去后台管理找到页面F12 然后查看network 还不会的话请联系博主帮助
      sheetId:34,
    }
    //评论
    this.loadCustomOptionForComment()
  },
  loadCustomOptionForComment: function(){
    const that = this
    wx.request({
      url: that.globalData.baseUrl + '/content/options/keys/suke_wechat_comment?api_access_key='+that.globalData.api_access_key,
      method: 'GET',
      success: function (res) {
        if (res.data.data) {
          if(res.data.data === 'show'){
            that.globalData.openComment = true
          }else{
            that.globalData.openComment = false
          }
        } else {
          wx.showToast({
            title: '后台未配置 【suke_wechat_comment】系统变量',
            icon:'none'
          })
        }
      },
      fail: function (res) {
        console.log("请求异常",res)
      }
    })
  },
  autoUpdate:function(){
     // 版本自动更新代码
     const updateManager = wx.getUpdateManager()
     updateManager.onCheckForUpdate(function (res) {
       console.log(res.hasUpdate)
     })
     updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新检测',
        content: '检测到新版本，是否重启小程序？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: '新版本自动更新失败',
        content: '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索“技术源share”打开',
        showCancel: false
      })
    })
  },
})
