// miniprogram/pages/history/history.js
import Toast from '../../components/vant/components/dist/toast/toast';

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:"",
    authorInfo:{},
    articleList:[],//page list
    allCategories:[],//所有分类
    page: 0,										//当前请求数据是第几页
    pageSize: 5,									//每页数据条数
    hasMoreData: true,								//上拉时是否继续请求数据，即是否还有更多数据
    list:app.list,// 自定义tabbar
    capsuleBarHeight:app.capsuleBarHeight,
    index_bg_image_url:app.globalData.index_bg_image_url,//首页背景
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      authorInfo:app.globalData.authorInfo
    })
    this.data.page = 0;
    this.loadArticleByPage();
    this.loadCategories()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.page = 0;
    this.loadArticleByPage();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const that = this;
    if (that.data.hasMoreData) {
      this.loadArticleByPage();
    } else {
      wx.showToast({
        icon:'loading',
        title: '没有更多数据',
        duration: 2000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onSearch(key){
    wx.showNavigationBarLoading()					//在当前页面显示导航条加载动画
    wx.showLoading({								//显示 loading 提示框
      title: '搜索中',
    })
    this.data.page = 0;
    this.searchArticles(key.detail);
  },
  onClear(){
    this.data.page = 0;
    this.loadArticleByPage()
  },
  // search article
  searchArticles(keyword){
    const that = this;
    const page = that.data.page;
    const size = that.data.pageSize;
    const sort = "createTime,desc";
    wx.request({
      url: app.globalData.baseUrl + '/content/posts/search?api_access_key='+app.globalData.api_access_key+'&page='+page+'&size='+size+'&sort='+sort+'&keyword='+keyword,
      method: 'POST',
      success: function (res) {
        wx.hideNavigationBarLoading()
        wx.hideLoading()
        var allPageArticleList = that.data.articleList;
        if (that.data.page == 0) {
          allPageArticleList = []
        }
        if (res.data.status == 200) {
          var list = res.data.data.content;
          if (list.length < that.data.pageSize || list.length ==0) {
            that.setData({
              articleList: allPageArticleList.concat(list),
              hasMoreData: false
            })
          } else {
            that.setData({
              articleList: allPageArticleList.concat(list),
              hasMoreData: true,
              page: that.data.page + 1
            })
          }
        } else {
          console.log("请求异常")
        }
      },
      fail: function (res) {
        wx.hideNavigationBarLoading()
        wx.hideLoading()
        console.log("请求异常",res)
      }
    })
  },
  loadArticleByPage(){
    const that = this;
    wx.showNavigationBarLoading()					//在当前页面显示导航条加载动画
    wx.showLoading({								//显示 loading 提示框
      title: '文章加载中',
    })
    const page = that.data.page;
    const size = that.data.pageSize;
    const sort = "createTime,desc";
    wx.request({
      url: app.globalData.baseUrl + '/content/posts?api_access_key='+app.globalData.api_access_key+'&page='+page+'&size='+size+'&sort='+sort,
      method: 'GET',
      success: function (res) {
        wx.hideNavigationBarLoading()
        wx.hideLoading()
        var allPageArticleList = that.data.articleList;
        if (that.data.page == 0) {
          allPageArticleList = []
        }
        if (res.data.status == 200) {
          var list = res.data.data.content;
          if (list.length < that.data.pageSize || list.length ==0) {
            that.setData({
              articleList: allPageArticleList.concat(list),
              hasMoreData: false
            })
          } else {
            that.setData({
              articleList: allPageArticleList.concat(list),
              hasMoreData: true,
              page: that.data.page + 1
            })
          }
        } else {
          console.log("请求异常")
        }
      },
      fail: function (res) {
        wx.hideNavigationBarLoading()
        wx.hideLoading()
        console.log("请求异常",res)
      }
    })
  },
  //load all categories
  loadCategories(){
    const that = this;
    wx.request({
      url: app.globalData.baseUrl + '/content/categories?api_access_key='+app.globalData.api_access_key,
      method: 'GET',
      success: function (res) {
        console.log(res);
        if(res.data.status == 200){
          that.setData({
            allCategories:res.data.data,
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
  changeTabs(tab){
     this.data.page = 0;
    console.log(tab)
    wx.showNavigationBarLoading()					//在当前页面显示导航条加载动画
    wx.showLoading({								//显示 loading 提示框
      title: '文章加载中',
    })
    let slug = tab.detail.cell;
    this.loadPostsBySlug(slug);
  },
 loadPostsBySlug(slug){
  const that = this;
  wx.request({
    url: app.globalData.baseUrl + '/content/categories/'+slug+'/posts?api_access_key='+app.globalData.api_access_key,
    method: 'GET',
    success: function (res) {
      wx.hideNavigationBarLoading()
      wx.hideLoading()
      console.log(res);
      var allPageArticleList = that.data.articleList;
        if (that.data.page == 0) {
          allPageArticleList = []
        }
        if (res.data.status == 200) {
          var list = res.data.data.content;
          if (list.length < that.data.pageSize || list.length ==0) {
            that.setData({
              articleList: allPageArticleList.concat(list),
              hasMoreData: false
            })
          } else {
            that.setData({
              articleList: allPageArticleList.concat(list),
              hasMoreData: true,
              page: that.data.page + 1
            })
          }
        } else {
          console.log("请求异常")
        }
    },
    fail: function (res) {
      wx.hideNavigationBarLoading()
      wx.hideLoading()
      console.log("请求异常",res)
    }
  })

 },

})
