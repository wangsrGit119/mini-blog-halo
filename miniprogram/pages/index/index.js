//index.js

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
    articleTopList:[],//文章信息 阅读量最高
    articleList:[],//文章信息  
    page: 0,										//当前请求数据是第几页
    pageSize: 5,									//每页数据条数
    hasMoreData: true,								//上拉时是否继续请求数据，即是否还有更多数据
    list:app.list,// 自定义tabbar
    capsuleBarHeight:app.capsuleBarHeight,
    globalData:app.globalData,
    index_skeleton_show:true,//首页骨架屏
    index_skeleton_show_history:true,//历史上的今天骨架
    customeSlugListOne:[],//自定义分类加载列表 -- 第一个
    historyDayInfo:undefined,//历史上的今天,
    openHisDialog:false,
  },
  onShow: function(){
    this.setData({
      globalData:app.globalData
    })
  },
  onReady: function(){
  
  },

  onLoad: function() {
    this.loadUserInfo();
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      })
    }
    //获取历史上的今天
    this.historyDayInfo()
    //自定义变量加载
    //文章加载（阅读量最高）
    this.loadTopArticles();
    //加载自定义分类
    this.loadCustomBySlugOne();
    this.loadCustomBySlugTwo();
    this.initParams()
    // 获取文章列表（最新）
    this.loadLastestArticles();

   
    
    
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
          let arr =  res.data.data.content;
          that.setData({
            articleTopList:arr,
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
      pageSize:20,
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
        wx.hideLoading()
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
  
  
  // 商品页面
  toGoodsPage(){
    wx.navigateTo({
      url: '/pages/goods/goods',
    })
  },

  // 自定义分类加载 ---one
 loadCustomBySlugOne(){
  const that = this;
  const page = 0;
  const size = 10;
  let slug = app.globalData.customSlug_one;
  if(!slug){
    return;
}
  wx.request({
    url: app.globalData.baseUrl + '/content/categories/'+slug+'/posts?api_access_key='+app.globalData.api_access_key+'&page='+page+'&size='+size,
    method: 'GET',
    success: function (res) {
      if (res.data.status == 200) {
        that.setData({
          customeSlugListOne:res.data.data.content
        })
      } else {
        wx.showToast({
          title: '分类列表加载失败',
          icon:'none'
        })
        console.log("请求异常")
      }
    },
    fail: function (res) {
      console.log("请求异常",res)
    }
  })
 },
 // 自定义分类加载  ---two
 loadCustomBySlugTwo(){
  const that = this;
  const page = 0;
  const size = 10;
  let slug = app.globalData.customSlug_two;
  if(!slug){
    return;
}
  wx.request({
    url: app.globalData.baseUrl + '/content/categories/'+slug+'/posts?api_access_key='+app.globalData.api_access_key+'&page='+page+'&size='+size,
    method: 'GET',
    success: function (res) {
      if (res.data.status == 200) {
        that.setData({
          customeSlugListTwo:res.data.data.content
        })
      } else {
        wx.showToast({
          title: '分类列表加载失败',
          icon:'none'
        })
        console.log("请求异常")
      }
    },
    fail: function (res) {
      console.log("请求异常",res)
    }
  })
 },
 urlValidateUtil(url){
    var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    var objExp=new RegExp(Expression);
    console.log(objExp.test(url));
    return objExp.test(url);
  },

  
  /**
   * 留言页面
   */
  toMessageBoardPage(){
    wx.navigateTo({
      url: '/pages/message-board/message-board',
    })
  },
  /**
   * 点击搜索框触发
   */
  toAllArticleList(){
    wx.switchTab({
      url: '/pages/history/history',
    })
  },
  // 跳转第三方话费充值小程序
 toPddMiniprogram(){
  let params_str = '?apiKey='+app.globalData.third_apikey_coupons+'&positionId='+app.globalData.privateId_coupons;
  wx.request({
    url: app.globalData.third_baseUrl_coupons+'/app/front/api/phone/bribe/v2'+params_str,
    method:'post',
    success:function(res){
      console.log(res)
      wx.navigateToMiniProgram({
        appId:res.data.data.we_app_info.app_id,
        path:res.data.data.we_app_info.page_path,
        success:function (res) {
          console.log(res);
        },
        fail:function (err) {
          console.log(err);
        }
      })
    },
    fail:function(err){
      console.error(err);
      wx.showToast({
        title: '获取失败',
        icon:'none'
      })
    }
  })   
},
historyDayInfo(){
  const that = this;
  wx.request({
    url: 'https://api.wangsrbus.cn/history-day-info/getHistoryDays',
    method:'GET',
    success: function(res){
      console.log(res)
      if(res.data.code==200){
        that.setData({
          historyDayInfo:res.data.data,
          index_skeleton_show_history:false
        })
      }else{
        wx.showToast({
          title: 'API【历史上的今天】获取失败',
          icon:'none'
        })
      }
      
    },
    fail:function(err){
      wx.showToast({
        title: 'API【历史上的今天】获取失败',
        icon:'none'
      })
    }
  })
},
openHistoryDialog(e){
  this.setData({
    openHisDialog:true
  })
},
})
