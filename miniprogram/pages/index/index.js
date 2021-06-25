//index.js
import Card from '../card';

const app = getApp()

Page({
  data: {
    swiperIndex:0,
    swiperHeight:170,
    postersShow:false,//海报弹窗
    imgSuccess:true,//海报制作是否成功
    userInfo: {},
    authorInfo:{},//作者信息
    hasUserInfo: false,
    logged: false,
    takeSession: false,
    requestResult: '',
    canIUseGetUserProfile: false,
    articleTopList:[],//文章信息 阅读量最高
    articleList:[],//文章信息  
    page: 0,										//当前请求数据是第几页
    pageSize: 5,									//每页数据条数
    hasMoreData: true,								//上拉时是否继续请求数据，即是否还有更多数据
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl'), // 如需尝试获取用户信息可改为false,
    list:app.list,// 自定义tabbar
    capsuleBarHeight:app.capsuleBarHeight,
    index_bg_image_url:app.globalData.index_bg_image_url,//首页背景
    title:app.globalData.title,//自定义title,
    index_skeleton_show:true,//首页骨架屏
  },
//增加分享屏幕
onShareAppMessage: function (res) {
  if (res.from === 'button') {
    // 来自页面内转发按钮
    console.log(res.target)
  }
  return {
    title: app.globalData.shareName,
    path: '/pages/index/index'
  }
},
onShareTimeline(){
  return {
    title: app.globalData.shareName,
    path: '/pages/index/index'
  }
},
  onShow: function(){
    // 初始化查询参数
    this.initParams()
    // 获取文章列表（最新）
    this.loadLastestArticles();
  },
  onReady: function(){
  
  },
  markPosters(){
    let tempArticle = this.data.articleTopList[0];
    this.setData({
      paintPallette: new Card(
        '/images/bg-image002.jpeg',
      tempArticle.thumbnail,
      tempArticle.title,
      tempArticle.summary,
      app.globalData.userInfo.nickName).palette(),
      postersShow:true
    });
    
  },
  closePosters(){
    this.setData({
      postersShow:false
    })
  },
  onLoad: function() {
    this.loadUserInfo();
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      })
    }
    //文章加载（阅读量最高）
    this.loadTopArticles();
   
  },
  // 轮播组件监听
  bindchange(e) {
    this.setData({
         swiperIndex: e.detail.current
    })
   },
  //  获取用户信息并制作海报
  getUserProfile() {
    
    if(app.globalData.userInfo && app.globalData != undefined){
      this.markPosters();
    }else{
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
          app.globalData.userInfo = res.userInfo;
          this.setData({
            avatarUrl: res.userInfo.avatarUrl,
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
          this.markPosters();
        },
        fail:(err)=>{
          console.log(err)
        }
      })

    }
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
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.loadLastestArticles();
    } else {
      wx.showToast({
        title: '没有更多数据',
        image:'../../images/noneData.png',
        duration: 2000
      })
    }
  },
    // 初始化参数
  initParams(){
    this.setData({
      page:0,
      pageSize:5,
      articleList:[],
    })
  },

  // 文章列表追加
  appendArticleList(resList){
    let allPageArticleList = this.data.articleList;
    if (resList.length < this.data.pageSize || resList.length ==0) {
      this.setData({
        articleList: allPageArticleList.concat(resList),
        hasMoreData: false
      })
    } else {
      this.setData({
        articleList: allPageArticleList.concat(resList),
        hasMoreData: true,
        page: this.data.page + 1
      })
    }
  },

  // load  lastest  article
  loadLastestArticles(){
    const that = this;
    const page = that.data.page;
    const size = that.data.pageSize;
    const sort1 = "topPriority,desc";
    const sort2 = "createTime,desc";
    wx.request({
      url: app.globalData.baseUrl + '/content/posts?api_access_key='+app.globalData.api_access_key+'&page='+page+'&size='+size+'&sort='+sort1+'&sort='+sort2,
      method: 'GET',
      success: function (res) {
        if(res.data.status == 200){
          that.setData({
            index_skeleton_show:false
          })
          that.appendArticleList(res.data.data.content)
        }else{
          console.log("数据加载异常")
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
    const password = data.currentTarget.dataset.articleItem.password;

    const article = data.currentTarget.dataset.articleItem.id;
    const status = data.currentTarget.dataset.articleItem.status;
    let url = '/pages/article/article?articleId=' + article+'&status='+status+'&password='+password;
    wx.navigateTo({
      url: url,
    })
  },
  onImgOK(e) {
    console.log("ok",e)
    this.setData({
      imgSuccess:false
    })
    this.imagePath = e.detail.path;
    this.setData({
      image: this.imagePath
    })
    if (this.isSave) {
      this.saveImage(this.imagePath);
    }
  },
  saveImage() {
    if (this.imagePath && typeof this.imagePath === 'string') {
      this.isSave = false;
      wx.saveImageToPhotosAlbum({
        filePath: this.imagePath,
      });
    }
  },

 
  
})
