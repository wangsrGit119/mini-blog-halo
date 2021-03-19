//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    authorInfo:{},//作者信息
    hasUserInfo: false,
    logged: false,
    takeSession: false,
    requestResult: '',
    canIUseGetUserProfile: false,
    articleTopList:[],//文章信息 阅读量最高
    articleLastestList:[],//文章信息  最新
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') // 如需尝试获取用户信息可改为false
  },

  onShow: function(){
   this.loadTopArticles();
   this.loadLastestArticles();
  },
  loadFont(){
    if (wx.canIUse('loadFontFace')) {
      console.log("支持自定义字体");
      wx.loadFontFace({
        family: 'JHYBKS',
        source: 'url("https://7375-suke-blog-dev-3g5mwey7b0ffec16-1259221562.tcb.qcloud.la/font/fangzhengziji(xingkaijianti).ttf?sign=7073de23c63f71a2e14833f2ed6e4437&t=1616121070")',
        success: function(res) {
          console.log(res)
          console.log("字体加载成功") //  loaded
        },
        fail: function(res) {
          console.log("字体加载失败") //  error
        },
        complete: function(res) {
          console.log(res)
        console.log("加载完成");
        }
      });
    } else {
      console.log('不支持自定义字体')
    }
  },
  onLoad: function() {
    this.loadFont();
    this.loadUserInfo();
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      })
    }
  },

  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      },
      fail:(err)=>{
        console.log(err)
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
       
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      
      }
    })
  },

  //load  top  article

  loadTopArticles(){
    const that = this;
    const page = 0;
    const size = 3;
    const sort = "visits,desc";
    wx.request({
      url: app.globalData.baseUrl + '/content/posts?api_access_key='+app.globalData.api_access_key+'&page='+page+'&size='+size+'&sort='+sort,
      method: 'GET',
      success: function (res) {
        if(res.data.status == 200){
          that.setData({
            articleTopList:res.data.data.content,
          })
        }
      },
      fail: function (res) {
        console.log("请求异常",res)
      }
    })
  },


  // load  lastest  article
  loadLastestArticles(){
    const that = this;
    const page = 0;
    const size = 5;
    const sort = "createTime,desc";
    wx.request({
      url: app.globalData.baseUrl + '/content/posts?api_access_key='+app.globalData.api_access_key+'&page='+page+'&size='+size+'&sort='+sort,
      method: 'GET',
      success: function (res) {
        if(res.data.status == 200){
          that.setData({
            articleLastestList:res.data.data.content,
          })
        }
      },
      fail: function (res) {
        console.log("请求异常",res)
      }
    })
  },

  //user info 
  loadUserInfo(){
    const that = this;
    wx.request({
      url: app.globalData.baseUrl + '/content/users/profile?api_access_key='+app.globalData.api_access_key,
      method: 'GET',
      success: function (res) {
        if(res.data.status == 200){
          app.globalData.authorInfo  = res.data.data;
          that.setData({
            authorInfo:res.data.data,
          })
        }
      },
      fail: function (res) {
        console.log("请求异常",res)
      }
    })
  },
  toArticleDetail(data){
    console.log(data.currentTarget.dataset.articleItem)
    let url = '/pages/article/article?item=' + encodeURIComponent(JSON.stringify(data.currentTarget.dataset.articleItem));
    wx.navigateTo({
      url: url,
    })
  },

  
})
