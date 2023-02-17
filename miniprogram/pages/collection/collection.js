// miniprogram/pages/collection/collection.js

import Toast from '../../components/vant/components/dist/toast/toast';

const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionList:[],//收藏文章集合
    index_bg_image_url:app.globalData.index_bg_image_url,//首页背景
    capsuleBarHeight:app.capsuleBarHeight,//顶部高度

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryALLArticlesRecordFromCloud();
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
  
})