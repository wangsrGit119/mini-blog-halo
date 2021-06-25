// miniprogram/pages/admin/admin.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index_bg_image_url:app.globalData.index_bg_image_url,//首页背景
    capsuleBarHeight:app.capsuleBarHeight,//顶部高度
    gridsMenu:[
      {image:'/images/comments.png',text:'评论',event:'commentManager'},
      {image:'/images/journals.png',text:'日记',event:'journalsManager'},
      {image:'/images/album.png',text:'相册',event:'albumManager'},
      {image:'/images/article.png',text:'工具',event:'utilManager'},
      {image:'/images/more.png',text:'更多',event:'haoMore'},
      
    ],
    statistics:{},//统计信息
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
    this.loadStatistics()
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
  //返回上一级
  onClickLeft(){
    wx.navigateBack({
      delta: 1
    })
  },
  showMyToast(title,type){
    if(type === 'success'){
      wx.showToast({
        title: title,
        image:'../../images/validateSuccess.png'
      })
    }else if(type === 'fail'){
      wx.showToast({
        title: title,
        image:'../../images/validateError.png'
      })
    }else if(type === 'warn'){
      wx.showToast({
        title: title,
        image:'../../images/creating.png'
      })
    }
  },
  // 评论
  commentManager(e){
    wx.navigateTo({
      url: '/pages/comments/comments',
    })
  },
  // 日记
  journalsManager(){
    this.showMyToast('开发中','warn')
  },
  // 相册
  albumManager(){
    this.showMyToast('开发中','warn')
  },
  // 工具
  utilManager(){
    this.showMyToast('开发中','warn')
  },
  // 更多
  haoMore(){
    this.showMyToast('开发中','warn')
  },
  loadStatistics(){
    const that = this;
    wx.request({
      url: app.globalData.baseUrl + '/admin/statistics/user?admin_token='+app.globalData.admin_token,
      method: 'GET',
      success: function (res) {
        console.log(res);
        if(res.data.status == 200){
          that.setData({
            statistics:res.data.data,
          })
        }
      },
      fail: function (res) {
        this.showMyToast('请求异常','fail')
      }
    })
  },
})