// miniprogram/pages/mine/mine.js
const app = getApp()
import Dialog from '../../components/vant/components/dist/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorInfo:{},
    statisticsInfo:{},

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
    this.loadUserInfo()
    this.loadStatistics();

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
   //user info 
   loadUserInfo(){
    const that = this;
    wx.request({
      url: app.globalData.baseUrl + '/content/users/profile?api_access_key='+app.globalData.api_access_key,
      method: 'GET',
      success: function (res) {
        console.log(res);
        if(res.data.status == 200){
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
  loadStatistics(){
    const that = this;
    wx.request({
      url: app.globalData.baseUrl + '/content/statistics?api_access_key='+app.globalData.api_access_key,
      method: 'GET',
      success: function (res) {
        console.log(res);
        if(res.data.status == 200){
          that.setData({
            statisticsInfo:res.data.data,
          })
        }
      },
      fail: function (res) {
        console.log("请求异常",res)
      }
    })
  },
  showAbout(){
    Dialog.alert({
      title: '温馨提示',
      message: '此小程序是基于开源博客Halo提供的API所开发，数据来源均来源于的博客系统，最后感谢Halo'
    }).then(() => {
      // on close
    });
  },
 

})