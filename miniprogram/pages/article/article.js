// miniprogram/pages/article/article.js
import Toast from '../../components/vant/components/dist/toast/toast';
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleDetail:{},
    showSkeleton:true,
    capsuleBarHeight:app.capsuleBarHeight,//顶部高度
    comments:[],//评论

  },
  loadFont(){
    if (wx.canIUse('loadFontFace')) {
      console.log("支持自定义字体");
      wx.loadFontFace({
        family: 'CUSTOM_FONT_T',
        source: 'url("https://7375-suke-blog-dev-3g5mwey7b0ffec16-1259221562.tcb.qcloud.la/font/fangzhengziji_xingkaijianti.ttf?sign=e5d4d88dfc3de9b74e6aa51506ebce5a&t=1616579572")',
        success: function(res) {
          console.log(res)
          console.log("字体加载成功") //  loaded
        },
        fail: function(res) {
          console.log("字体加载失败") //  error
        },
        complete: function(res) {
          console.log(res)
        console.log("加载完成");
        }
      });
    } else {
      console.log('不支持自定义字体')
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    //加载字体
    that.loadFont();
    // 骨架屏显示
    setTimeout(function(){
      that.setData({
        showSkeleton:false
      })
    },2000)
    const data = JSON.parse(decodeURIComponent(options.item));
    // console.log(data)
    this.loadArticleDetail(data.id);
    this.loadComments(20)   
  },
  //返回首页
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
          let data = JSON.parse(JSON.stringify(res.data.data));
          data.content = app.towxml.toJson(data.originalContent, 'markdown',{
            theme:'light',                   // 主题，默认`light`
            events:{                    // 为元素绑定的事件方法
                tap:(e)=>{
                    console.log('tap',e);
                }
            }
          });
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
//增加分享屏幕
onShareAppMessage: function (res) {
  if (res.from === 'button') {
    // 来自页面内转发按钮
    console.log(res.target)
  }
  return {
    title: 'suke的博客',
    path: '/pages/index/index'
  }
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
    const that = this;
    wx.request({
      url: app.globalData.baseUrl + '/content/posts/'+postId+'/comments/tree_view?api_access_key='+app.globalData.api_access_key,
      method: 'GET',
      success: function (res) {
        console.log("comments")
        console.log(res)
        if(res.data.status == 200){
          that.setData({
            comments:res.data.data.content
          })
        }
      },
      fail: function (res) {
        console.log("请求异常",res)
      }
    })
  }
})