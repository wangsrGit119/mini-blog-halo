// miniprogram/pages/journal/journal.js
const app = getApp()
import {formatTimes} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:app.list,// 自定义tabbar
    capsuleBarHeight:app.capsuleBarHeight,
    index_bg_image_url:app.globalData.index_bg_image_url,//首页背景
    page:0,
    pageSize:30,
    journalList:[],//所有日志
    steps: [
      
    ],
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
    this.listPageJournal()
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
  listPageJournal(){
    const that = this;
    that.setData({
      journalList:[]
    })
    const page = that.data.page;
    const size = that.data.pageSize;
    const sort = "createTime,desc";
    wx.request({
      url: app.globalData.baseUrl + '/content/journals?api_access_key='+app.globalData.api_access_key+'&page='+page+'&size='+size+'&sort='+sort,
      method: 'GET',
      success: function (res) {
        if (res.data.status == 200) {
          let list = res.data.data.content;
          that.setData({
            journalList:list
          })
        } else {
          console.log("请求异常")
        }
      },
      fail: function (res) {
        console.log("请求异常",res)
      }
    })
  }
})