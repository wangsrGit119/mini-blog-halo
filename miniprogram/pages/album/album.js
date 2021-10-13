// miniprogram/pages/album/album.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:app.list,// 自定义tabbar
    capsuleBarHeight:app.capsuleBarHeight,
    index_bg_image_url:app.globalData.index_bg_image_url,//首页背景
   allImages:[],
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
   this.loadImagesInfo()
   
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
    this.setData({
      allImages:[],
    })
    this.loadImagesInfo()
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
  loadImagesInfo(){
    const that = this;
    that.setData({
      allImages:[]
    })
    wx.showLoading({				
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.baseUrl + '/content/photos/latest?api_access_key='+app.globalData.api_access_key,
      method: 'GET',
      success: function (res) {
        wx.hideLoading()
        if(res.data.status == 200){
          let images = res.data.data;
          if(images.length ==0){
            wx.showToast({
              title: '空空如也',
              image:'../../images/empty.png'
            })
            return
          }
          images.forEach(e=>{
            let item ={image:e.url,title:e.name,describe:e.description,type:e.team} 
            that.data.allImages.push(item)
          })
          wx.lin.renderWaterFlow(that.data.allImages, true ,()=>{
            console.log('渲染成功')
          })
        }else{
          wx.showToast({
            title: '加载相册失败',
            image:'../../images/validateError.png'
          })
        }
      },
      fail: function (res) {
        wx.hideLoading()
        console.log("请求异常",res)
      }
    })
  },
})