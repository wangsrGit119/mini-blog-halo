// miniprogram/pages/collection/collection.js

import Toast from '../../components/vant/components/dist/toast/toast';

const app = getApp()
const db = wx.cloud.database()
const _ = db.command

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
  // 获取所有收藏文章
  queryALLArticlesRecordFromCloud(){
    const that = this;
    wx.showLoading({					
      title: '加载中',
    })
    // 调用云函数获取openID
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
          let openID =  res.result.openid
          db.collection(app.globalData.myCollectArticle)
              .where({
                _openid: openID,
              })
              .orderBy("date","desc")
              .get()
              .then(res=>{
                wx.hideLoading()
                that.setData({
                  collectionList:res.data
                })
            })
      },
      fail: err => {
        wx.hideLoading()
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  toCollectArticleDetail(data){
    let articleId = data.currentTarget.dataset.articleId;
    let url = '/pages/collect-article-details/collect-article-details?articleId=' + articleId;
    wx.navigateTo({
      url: url,
    })
  },
  removeFromCloudDB(data){
    const that = this;
    let id = data.currentTarget.dataset.item._id;
    if(!id){
      return;
    }
    db.collection(app.globalData.myCollectArticle).doc(id).remove({
      success: res => {
        wx.showToast({
          title: '删除成功',
        })
        that.queryALLArticlesRecordFromCloud()
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '删除失败',
        })
        console.error('[数据库] [删除记录] 失败：', err)
      }
    })
  },
})