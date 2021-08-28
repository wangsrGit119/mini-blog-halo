// miniprogram/pages/categories/categories.js
import Toast from '../../components/vant/components/dist/toast/toast';

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorInfo:{},
    list:app.list,// 自定义tabbar
    capsuleBarHeight:app.capsuleBarHeight,
    index_bg_image_url:app.globalData.index_bg_image_url,//首页背景
    allCategories:[],//所有分类
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
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: app.globalData.shareName,
      path: '/pages/categories/categories'
    }
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
          wx.lin.renderWaterFlow(that.data.allCategories, true ,()=>{
            console.log('渲染成功')
          })
        }
      },
      fail: function (res) {
        console.log("请求异常",res)
      }
    })
  },
})