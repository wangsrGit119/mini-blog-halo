//index.js
import Card from '../common/card';

const app = getApp()

Page({
  data: {
    swiperIndex:0,
    swiperHeight:130,
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
    capsuleBarHeight:app.capsuleBarHeight,
    index_bg_image_url:app.globalData.index_bg_image_url,//首页背景
    globalData:app.globalData,
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
    // 初始化查询参数
    this.initParams()
    // 获取文章列表（最新）
    this.loadLastestArticles();
   
  },
  // 轮播组件监听
  bindchange(e) {
    this.setData({
         swiperIndex: e.detail.current
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 初始化查询参数
    this.initParams()
    // 获取文章列表（最新）
    this.loadLastestArticles();
   wx.stopPullDownRefresh() 
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
      pageSize:10,
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
    wx.showLoading({	
      title: '加载中',
    })
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
        wx.hideLoading()
      },
      fail: function (res) {
        console.log("请求异常",res)
        wx.hideLoading()
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
  // 文章详情页面
  toArticleDetail(data){
    const password = data.currentTarget.dataset.articleItem.password;

    const article = data.currentTarget.dataset.articleItem.id;
    const status = data.currentTarget.dataset.articleItem.status;
    let url = '/pages/article/article?articleId=' + article+'&status='+status+'&password='+password;
    wx.navigateTo({
      url: url,
    })
  },
  
  


})
