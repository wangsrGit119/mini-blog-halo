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
    demo:[{
          image: 'https://www.wangsrbus.cn/wangsr-font/bg_images/photo-1543497415-75c0a27177c0.jpeg',
          title: '显瘦中长款系带风衣',
          describe: '柔软顺滑、上身挺括显瘦，垂坠飘逸、不易皱好打理。',
        },{
          image: 'https://www.wangsrbus.cn/wangsr-font/bg_images/photo-1543497415-75c0a27177c0.jpeg',
          title: '显瘦中长款系带风衣',
          describe: '柔软顺滑、上身挺括显瘦，垂坠飘逸、不易皱好打理。',
          count: '888',
          delCount: '666'
        },{
          image: 'https://www.wangsrbus.cn/wangsr-font/bg_images/photo-1543497415-75c0a27177c0.jpeg',
          title: '显瘦中长款系带风衣',
          describe: '柔软顺滑、上身挺括显瘦，垂坠飘逸、不易皱好打理。',
          count: '888',
          delCount: '666'
        },{
          image: 'https://www.wangsrbus.cn/wangsr-font/bg_images/photo-1543497415-75c0a27177c0.jpeg',
          title: '显瘦中长款系带风衣',
          describe: '柔软顺滑、上身挺括显瘦，垂坠飘逸、不易皱好打理。',
          count: '888',
          delCount: '666'
        },{
          image: 'https://www.wangsrbus.cn/wangsr-font/bg_images/photo-1543497415-75c0a27177c0.jpeg',
          title: '显瘦中长款系带风衣',
          describe: '柔软顺滑、上身挺括显瘦，垂坠飘逸、不易皱好打理。',
          count: '888',
          delCount: '666'
        },{
          image: 'https://www.wangsrbus.cn/wangsr-font/bg_images/photo-1543497415-75c0a27177c0.jpeg',
          title: '显瘦中长款系带风衣',
          describe: '柔软顺滑、上身挺括显瘦，垂坠飘逸、不易皱好打理。',
          count: '888',
          delCount: '666'
        },{
          image: 'https://www.wangsrbus.cn/wangsr-font/bg_images/photo-1543497415-75c0a27177c0.jpeg',
          title: '显瘦中长款系带风衣',
          describe: '柔软顺滑、上身挺括显瘦，垂坠飘逸、不易皱好打理。',
          count: '888',
          delCount: '666'
        }],
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
    wx.request({
      url: app.globalData.baseUrl + '/content/photos/latest?api_access_key='+app.globalData.api_access_key,
      method: 'GET',
      success: function (res) {
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
        console.log("请求异常",res)
      }
    })
  },
})