// miniprogram/pages/edit-journal/edit-journal.js
const app = getApp()
import MpCuConfig from '../common/mp-custom-config'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempContent:undefined,
    capsuleBarHeight:app.capsuleBarHeight,//顶部高度
    articleList:[],//日记集合 
    page: 0,										//当前请求数据是第几页
    pageSize: 5,									//每页数据条数
    hasMoreData: true,								//上拉时是否继续请求数据，即是否还有更多数据
    authorInfo:{},//作者信息
    journal:{
      content:undefined,//日志内容
    },
    showJournalPop:false,//展示弹框
    myStyle:{  //自定义mp主题
     
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("token",app.globalData.admin_token)
    this.loadAllJournals();
    this.setData({
      authorInfo:app.globalData.authorInfo,
      myStyle:new MpCuConfig("journal").defaultConfig().myStyle
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
    if (this.data.hasMoreData) {
      this.loadAllJournals();
    } else {
      wx.showToast({
        title: '没有更多数据',
        image:'../../images/noneData.png',
        duration: 2000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
     //返回上一级
  onClickLeft(){
    wx.redirectTo({
      url: '/pages/admin-manager/admin-manager',
    })
  },
      // 初始化参数
  initParams(){
    this.setData({
      page:0,
      pageSize:10,
      articleList:[],
    })
  },
   // 日志列表追加
   appendArticleList(resList){
    let allPageArticleList = this.data.articleList;
    if (resList.length < this.data.pageSize || resList.length ==0) {
      this.setData({
        articleList: allPageArticleList.concat(resList),
        hasMoreData: false
      })
    } else {
      this.setData({
        articleList: allPageArticleList.concat(resList),
        hasMoreData: true,
        page: this.data.page + 1
      })
    }
  },
  loadAllJournals(){
    const that = this;
    wx.showLoading({	
      title: '加载中',
    })
    const page = that.data.page;
    const size = that.data.pageSize;
    const sort1 = "createTime,desc";
    wx.request({
      url: app.globalData.baseUrl + '/admin/journals?admin_token='+app.globalData.admin_token+'&page='+page+'&size='+size+'&sort='+sort1,
      method: 'GET',
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        if(res.data.status == 200){
          that.appendArticleList(res.data.data.content)
        }else{
          wx.showToast({
            title: '数据加载异常',
            icon:'none'
          })
        }
      },
      fail: function (res) {
        wx.hideLoading()
        wx.showToast({
          title: '服务异常',
          icon:'none'
        })
      }
    })
  },
  deleteJournal(e){
    const that = this;
    let id = e.currentTarget.dataset.itemId;
    wx.request({
      url: app.globalData.baseUrl +'/admin/journals/'+id+'?admin_token='+app.globalData.admin_token,
      method:'DELETE',
      success:function(res){
        console.log(res);
        if(res.data.status == 200){
          wx.showToast({
            title: '已删除',
            icon:'none'
          })
          that.initParams();
          that.loadAllJournals();
        }else{
          wx.showToast({
            title: '删除失败',
            icon:'none'
          })
        }
      },
      fail: function(err){
        console.error("服务异常",err);
        wx.showToast({
          title: '服务异常',
          icon:'none'
        })
      }
    })
  },
  // 监听输入内容
  inputJournalContent(e){
    this.setData({
      journal:{
        content:e.detail.value
      }
    })
  },

  submitContent(){
    const that = this;
    let content = that.data.journal.content;
    if(!content || content.trim() === ""){
      wx.showToast({
        title: '内容不能为空',
        icon:'none'
      })
      return
    };
    wx.showLoading({							
      title: '内容校验中...',
    })
    wx.cloud.callFunction({
      name: 'msgseccheck',
      data: {
        content:content
      },
      success:(res)=>{
        wx.hideLoading()
        console.log(res)
        if(res.result.errCode!=0){
            wx.showToast({
              title: '非法内容',
              icon:'none'
            })
        }else if(res.result.errCode==0){
          that.saveJournal(content);
        }
      },
      fail:err=>{
        wx.hideLoading()
        console.log(err)
        wx.showToast({
          title: '云函数调用出错',
          icon:'none'
        })
      }
    })

  },
  cancelPub(){
    this.setData({
      showJournalPop:false
    })
  },
  showEditJournalDialog(){
    this.setData({
      showJournalPop:true
    })
  },
  saveJournal(content){
    const that = this;
    let params = {
      "sourceContent": content,
      "type": 'PUBLIC',
    }
    wx.request({
      url: app.globalData.baseUrl + '/admin/journals?admin_token='+app.globalData.admin_token,
      data:params,
      method: 'POST',
      header: {ContentType: 'application/json'},
      success: function (res) {
        console.log(res)
        if(res.data.status == 200){
          wx.showToast({
            title: '已发布',
            icon:'none'
          })
          that.setData({
            showJournalPop:false,
          })
           // 加载列表
           that.initParams();
           that.loadAllJournals();
           that.setData({
            journal:{
              content:undefined,
            }
           });   

        }else{
          wx.showToast({
            title: '发布失败',
            icon:'none'
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '发布异常',
          icon:'none'
        })
      }
    })
  },
})