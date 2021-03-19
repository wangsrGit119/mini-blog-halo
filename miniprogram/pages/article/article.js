// miniprogram/pages/article/article.js
import Toast from '../../components/vant/components/dist/toast/toast';
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleDetail:{},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    const data = JSON.parse(decodeURIComponent(options.item));
    this.loadArticleDetail(data.id);   
  },
  onClickLeft(){
    wx.navigateBack({
      delta: 1
    })
  },
  // load details 
  loadArticleDetail(articleId){
    const that = this;
    wx.showNavigationBarLoading()					//在当前页面显示导航条加载动画
    wx.showLoading({								//显示 loading 提示框
      title: '文章加载中',
    })
    wx.request({
      url: app.globalData.baseUrl + '/content/posts/'+articleId+'?api_access_key='+app.globalData.api_access_key,
      method: 'GET',
      success: function (res) {
        if(res.data.status == 200){
          let data = JSON.parse(JSON.stringify(res.data.data))
          console.log(data)
          data.content = app.towxml.toJson(data.originalContent, 'markdown'),
          wx.hideNavigationBarLoading()
          wx.hideLoading()
          that.setData({
            articleDetail:data,
          })
        }else{
          wx.hideNavigationBarLoading()
          wx.hideLoading()
        }
      },
      fail: function (res) {
        wx.hideNavigationBarLoading()
        wx.hideLoading()
        console.log("请求异常",res)
      }
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  loadComments(postId){
    wx.request({
      url: app.globalData.baseUrl + '/content/posts/'+postId+'/comments/tree_view?api_access_key='+app.globalData.api_access_key,
      method: 'GET',
      success: function (res) {
        console.log(res)
        if(res.data.status == 200){
          
        }
      },
      fail: function (res) {
        
        console.log("请求异常",res)
      }
    })
  }
})