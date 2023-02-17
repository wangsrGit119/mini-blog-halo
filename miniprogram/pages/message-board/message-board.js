// pages/message-board/message-board.js
import MpCuConfig from '../common/mp-custom-config'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myStyle:{},
    comments:[],
    sheetId:app.globalData.sheetId,
    currentComment:{},//当前评论
    page:0,
    pageSize:10,
    globalData:app.globalData,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   //mp主题
   this.setData({
    myStyle:new MpCuConfig("default").defaultConfig().myStyle
  })
  this.loadMessageBoardComments()
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
      globalData:app.globalData
    })
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
      this.loadMessageBoardComments();
    } else {
      wx.showToast({
        title: '没有更多数据了',
        icon:'loading',
        duration: 2000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  initParams(){
    this.setData({
      page:0,
      pageSize:10,
      comments:[],
    })
  },
  appendCommentList(resList){
    let allPagecomments = this.data.comments;
    if (resList.length < this.data.pageSize || resList.length ==0) {
      this.setData({
        comments: allPagecomments.concat(resList),
        hasMoreData: false
      })
    } else {
      this.setData({
        comments: allPagecomments.concat(resList),
        hasMoreData: true,
        page: this.data.page + 1
      })
    }
  },
  loadMessageBoardComments(){
    const that = this;
    const page = that.data.page;
    const pageSize = that.data.pageSize;
    wx.showLoading({
      title: '加载中请稍后'
    })
    wx.request({
      url: app.globalData.baseUrl + '/content/sheets/'+that.data.sheetId+'/comments/tree_view?api_access_key='+app.globalData.api_access_key+'&page='+page+'&pageSize='+pageSize,
      method: 'GET',
      success: function (res) {
        wx.hideLoading()
        if(res.data.status == 200){
          that.appendCommentList(res.data.data.content)
        }
      },
      fail: function (res) {
        console.log("请求异常",res)
      }
    })
  },
  onTextareaInput(e){
    this.setData({
      myComment:e.detail.value
    })
  },
  // 评论按钮事件
  toComment(e){
    const that = this;
    this.setData({
      currentComment:e.detail.commentItem
    })

    if(app.globalData.userInfo){
      that.setData({
        actionSheetShow:true,
      })
    }else{
      wx.showModal({
        title: '温馨提示',
        content: '评论需要使用你的微信昵称',
        success(res) {
          if (res.confirm) {
            wx.getUserProfile({
            desc: "获取你的昵称、头像、地区及性别",
            success: res => {
              console.log(res)
              app.globalData.userInfo = res.userInfo;
              that.setData({
                actionSheetShow:true,
                userInfo:res.userInfo
              })

            },
            fail: res => {
              //拒绝授权
              return;
            }
          })} else if (res.cancel) {
            //拒绝授权 showErrorModal是自定义的提示
            return;
          }
        }
      })
    }
    
  },
  onClickHide(e){
    this.setData({actionSheetShow : false});
  },
   // 提交评论
   saveEvent(e){
    const that = this;
    if(that.data.myComment !== undefined 
      && that.data.email !== undefined
      && that.data.myComment.trim() !== ""){
        wx.showLoading({							
          title: '评论审核通过后可展示',
        })
        that.doComments();
    }else{
      wx.showToast({ title: '内容不能为空',icon:'none'})
    }
  },
  //邮箱失焦验证
  validateEmail(e){
    if(!this.checkEmail(e.detail.value)){
      this.setData({
        email:""
      })
    }
  },
  checkEmail(email){
    let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    if (str.test(email)) {
      return true
      } else {
      wx.showToast({ title: '非法邮箱',icon:'none'})
      return false 
     }  
  },
  doComments(){
    const that = this;
    let params = {
      "allowNotification": true,
      "author": app.globalData.userInfo.nickName,
      "authorUrl": app.globalData.userInfo.avatarUrl,
      "content": this.data.myComment,
      "email": this.data.email,
      "parentId": this.data.currentComment === undefined ? 0 :this.data.currentComment.id,
      "postId": this.data.sheetId
    }
    wx.request({
      url: app.globalData.baseUrl + '/content/sheets/comments?api_access_key='+app.globalData.api_access_key,
      data:params,
      method: 'POST',
      header: {ContentType: 'application/json'},
      success: function (res) {
        wx.hideLoading()
        if(res.data.status == 200){
          that.setData({actionSheetShow : false});
          wx.showToast({ title: '评论成功',icon:'loading'})
          setTimeout(()=>{
            that.initParams();
            that.loadMessageBoardComments()
          },3000)
        }else{
          wx.showToast({ title: '评论失败',icon:'loading'})
        }
      },
      fail: function (res) {        
        console.log("请求异常",res)
        wx.hideLoading()
      }
    })
  },
})