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
    index_bg_image_url:app.globalData.index_bg_image_url,//首页背景
    currentTab:'latestTag',//当前标签页 默认为 latestTag
    latestTag:"latestTag",//最新标签值
    searchKey:"",//搜索关键词
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
    // 当前页面显示导航条加载动画
    wx.showNavigationBarLoading()
    // 加载最新文章
    this.loadArticleByPage();
    // 初始化参数
    this.initParams();
    // 获取所有分类
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
    console.log("下拉刷新")
    // this.initParams()
    // this.loadArticleByPage();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      // 搜索
      if(this.data.searchKey != null){
        this.searchArticles(this.data.searchKey)
        return;
      }
      // 切换类别
      if(this.data.currentTab === this.data.latestTag){
        this.loadArticleByPage();
      }else{
        this.loadPostsBySlug(this.data.currentTab)
      }
    } else {
      wx.showToast({
        title: '没有更多数据',
        image:'../../images/noneData.png',
        duration: 2000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 初始化参数
  initParams(){
    this.setData({
      page:0,
      pageSize:5,
      articleList:[],
      currentTab:'latestTag',//当前标签页 默认为 latestTag
      searchKey:null,
    })
  },
  onSearch(key){
    this.initParams();
    this.setData({
      searchKey:key.detail
    })
    this.searchArticles(key.detail);
  },
  onClear(){
    this.initParams()
    this.loadArticleByPage()
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
  // search article
  searchArticles(keyword){
    const that = this;
    const page = that.data.page;
    const size = that.data.pageSize;
    const sort = "createTime,desc";
    wx.showLoading({								//显示 loading 提示框
      title: '搜索中',
    })
    wx.request({
      url: app.globalData.baseUrl + '/content/posts/search?api_access_key='+app.globalData.api_access_key+'&page='+page+'&size='+size+'&sort='+sort+'&keyword='+keyword,
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        if (res.data.status == 200) {
          that.appendArticleList(res.data.data.content)
        } else {
          console.log("请求异常")
        }
      },
      fail: function (res) {
        wx.hideLoading()
        console.log("请求异常",res)
      }
    })
  },
  loadArticleByPage(){
    const that = this;
    const page = that.data.page;
    const size = that.data.pageSize;
    const sort1 = "topPriority,desc";
    const sort2 = "createTime,desc";
    wx.showLoading({								//显示 loading 提示框
      title: '文章加载中',
    })
    wx.request({
      url: app.globalData.baseUrl + '/content/posts?api_access_key='+app.globalData.api_access_key+'&page='+page+'&size='+size+'&sort='+sort1+'&sort='+sort2,
      method: 'GET',
      success: function (res) {
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        if (res.data.status == 200) {
          that.appendArticleList(res.data.data.content)
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
    const article = data.currentTarget.dataset.articleItem.id;
    const status = data.currentTarget.dataset.articleItem.status;
    const password = data.currentTarget.dataset.articleItem.password;
    let url = '/pages/article/article?articleId=' + article+'&status='+status+"&password="+password;
    wx.navigateTo({
      url: url,
    })
  },
  // 切换类别
  changeTabs(tab){
    this.initParams()
    if(tab.detail.activeKey === this.data.latestTag){
        this.loadArticleByPage()
    }else{
      let slug = tab.detail.cell;
      this.setData({
        currentTab:slug
      })
      this.loadPostsBySlug(slug);
    }
  },
  // 分类加载
 loadPostsBySlug(slug){
  const that = this;
  wx.showLoading({								//显示 loading 提示框
    title: '文章加载中',
  })
  const page = that.data.page;
  const size = that.data.pageSize;
  wx.request({
    url: app.globalData.baseUrl + '/content/categories/'+slug+'/posts?api_access_key='+app.globalData.api_access_key+'&page='+page+'&size='+size,
    method: 'GET',
    success: function (res) {
      wx.hideLoading()
      if (res.data.status == 200) {
        that.appendArticleList(res.data.data.content)
      } else {
        console.log("请求异常")
      }
    },
    fail: function (res) {
      wx.hideLoading()
      console.log("请求异常",res)
    }
  })

 },

})
