// miniprogram/pages/collect-article-details/collect-article-details.js
const app = getApp()

import MpCuConfig from '../common/mp-custom-config'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:undefined,
    authorInfo:undefined,
    articleDetail:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.setData({
      articleId:options.articleId,
      //初始化变量全局新的
      userInfo:app.globalData.userInfo,
      authorInfo:app.globalData.authorInfo
    })
    //mp主题
    this.setData({
      myStyle:new MpCuConfig("default").defaultConfig().myStyle
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
      let articleDetail = this.data.articleDetail;
      let path = '/pages/article/article?articleId=' + articleDetail.id+'&status='+articleDetail.status+'&password='+articleDetail.password;
      return {
        title: articleDetail.title,
        path: path
      }
  },

})