// miniprogram/pages/journal/journal.js
const app = getApp()
import {formatTimes} from '../../utils/util'
import MpCuConfig from '../common/mp-custom-config'


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
    hasMoreData:true,
    authorInfo:{},//作者信息
    myStyle:{ //自定义mp主题

    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      authorInfo:app.globalData.authorInfo,
      myStyle:new MpCuConfig("journal").defaultConfig().myStyle
    })
    this.listPageJournal()
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
    this.initParams()
    this.listPageJournal()
    wx.stopPullDownRefresh() 
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.listPageJournal();
    } else {
      wx.showToast({
        title: '没有更多内容了...',
        icon:'none',
        duration: 2000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 初始化参数
  initParams(){
    this.setData({
      page:0,
      pageSize:15,
      journalList:[],
    })
  },
  // journal列表追加
  appendArticleList(resList){
    let allPageArticleList = this.data.journalList;
    if (resList.length < this.data.pageSize || resList.length ==0) {
      this.setData({
        journalList: allPageArticleList.concat(resList),
        hasMoreData: false
      })
    } else {
      this.setData({
        journalList: allPageArticleList.concat(resList),
        hasMoreData: true,
        page: this.data.page + 1
      })
    }
  },
  listPageJournal(){
    const that = this;
    wx.showLoading({	
      title: '加载中',
    })
    const page = that.data.page;
    const size = that.data.pageSize;
    const sort = "createTime,desc";
    wx.request({
      url: app.globalData.baseUrl + '/content/journals?api_access_key='+app.globalData.api_access_key+'&page='+page+'&size='+size+'&sort='+sort,
      method: 'GET',
      success: function (res) {
        wx.hideLoading()
        if (res.data.status == 200) {
          that.appendArticleList(res.data.data.content)
        } else {
          console.log("请求异常")
        }
      },
      fail: function (res) {
        wx.hideLoading()
        console.log("请求异常",res)
      }
    })
  },

  //点赞喜欢
  onLikeAction(e){
    const that = this;
    const id = e.currentTarget.dataset.id;
    wx.request({
      url:  app.globalData.baseUrl + '/content/journals/'+id+'/likes?api_access_key='+app.globalData.api_access_key,
      method:'POST',
      success:function(res){
        console.log(res)
        if(res.data.status == 200){
          wx.showToast({
            title: '谢谢厚爱',
            icon:'none'
          })
          // that.listPageJournal();
        }
      },
      fail:function(err){
        wx.showToast({
          title: '点赞失败',
          icon:'none'
        })
      }
    })
  },
  readyAA(e){
    var ctx = this.selectComponent('#article')
  },
})