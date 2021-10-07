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
    authorInfo:{},//作者信息
    myStyle:{  //自定义mp主题
     
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      authorInfo:app.globalData.authorInfo,
      myStyle:new MpCuConfig("default").defaultConfig().myStyle
    })
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
          let list = res.data.data.content;
          // let temp = [];
          // list.forEach(e=>{
          //   let obj = app.towxml(e.content,'markdown',{
          //     // theme:'dark',
          //     events:{
          //       tap:e => {
          //         console.log('tap',e);
          //       },
          //       change:e => {
          //         console.log('todo',e);
          //       }
          //     }
          //   });
          //   e.wxsource = obj;
          //   temp.push(e)
          // })
          that.setData({
            journalList:list
          })
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
    console.log(e)
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
          that.listPageJournal();
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
})