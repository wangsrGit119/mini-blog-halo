// miniprogram/pages/comments/comments.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:app.globalData.userInfo,
    capsuleBarHeight:app.capsuleBarHeight,//顶部高度
    index_bg_image_url:app.globalData.index_bg_image_url,//首页背景
    page:0, //页号
    pageSize:15,//数量
    comments:[],//评论集合
    totalComment:0,//评论总数
    inputComment:"",//输入的评论回复
    commentInputShow:false,//评论输入框展示
    currentComment:{},//当前评论
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
    this.initParams()
    this.loadLastesComments()
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
      this.loadLastesComments();
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
      url: 'pages/admin-manager/admin-manager',
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
    }
  },
  // 初始化参数
  initParams(){
    this.setData({
      page:0,
      pageSize:15,
      comments:[],
    })
  },

  // 评论列表追加
  appendArticleList(resList){
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
  loadLastesComments(){
    const that = this;
    const page = that.data.page;
    const size = that.data.pageSize;
    const sort1 = "createTime,desc";
    wx.request({
      url: app.globalData.baseUrl + '/admin/posts/comments?admin_token='+app.globalData.admin_token+'&page='+page+'&size='+size+'&sort='+sort1,
      method: 'GET',
      success: function (res) {
        console.log(res)
        if(res.data.status == 200){
          that.setData({
            totalComment:res.data.data.total
          })
          that.appendArticleList(res.data.data.content)
        }else{
          console.log("数据加载异常")
        }
      },
      fail: function (res) {
        console.log("请求异常",res)
      }
    })
  },
  // 回复评论
  replyComment(e){
    console.log(e)
   this.setData({
    commentInputShow:true,
    currentComment:e.currentTarget.dataset.item,
   })
  },
  // 监听评论输入
  inputCommentOnChange(e){
    this.setData({
      inputComment:e.detail.value
    })
  },
  // 提交评论
  confirmCommitCommet(){
    const that = this;
    if(that.data.inputComment.trim() === ""){
      this.showMyToast('内容不能为空','fail')
      return
    }
    wx.showLoading({							
      title: '内容校验中...',
    })
    wx.cloud.callFunction({
      name: 'msgseccheck',
      data: {
        content:that.data.inputComment
      },
      success:(res)=>{
        console.log(res)
        if(res.result.errCode!=0){
            this.showMyToast('非法内容','fail')
            that.setData({
              inputComment:""
            })
        }else if(res.result.errCode==0){
          that.doComments();
        }
      },
      fail:err=>{
        console.log(err)
      }
    })
  },
  doComments(){
    const that = this;

    let params = {
      "content": that.data.inputComment,
      "parentId": that.data.currentComment.id,
      "postId": that.data.currentComment.post.id
    }
    wx.request({
      url: app.globalData.baseUrl + '/admin/posts/comments?admin_token='+app.globalData.admin_token,
      data:params,
      method: 'POST',
      header: {ContentType: 'application/json'},
      success: function (res) {
        wx.hideLoading()
        if(res.data.status == 200){
          that.showMyToast('评论成功','success');
           // 加载列表
           that.initParams()
           that.loadLastesComments()   
           that.setData({
             commentInputShow : false,
             inputComment:""
            });
        }else{
          that.showMyToast('评论失败','fail');
        }
      },
      fail: function (res) {
        that.showMyToast('请求异常','fail');
        wx.hideLoading()
      }
    })
  },
  // 审核通过评论
  accessComment(e){
    let commentId = e.currentTarget.dataset.item.id;
    let status = 'PUBLISHED';
    this.updateComment(commentId,status)
  },
  // 删除评论（到回收站）
  deleteComment(e){
    console.log(e)
    let commentId = e.currentTarget.dataset.item.id;
    let status = 'RECYCLE';
    this.updateComment(commentId,status)
  },
  // 还原评论
  recycleComment(e){
    let commentId = e.currentTarget.dataset.item.id;
    let status = 'PUBLISHED';
    this.updateComment(commentId,status)
  },
  // 永久删除
  deleteForeverComment(e){
    const that = this;
    let commentId = e.currentTarget.dataset.item.id;
    wx.request({
      url: app.globalData.baseUrl + '/admin/posts/comments/'+commentId+'?admin_token='+app.globalData.admin_token,
      method: 'DELETE',
      success: function (res) {
        console.log(res)
        if(res.data.status === 200){
          that.showMyToast("已永久删除",'success')
          that.initParams()
          that.loadLastesComments()
        }
      },
      fail: function (res) {
        console.log("请求异常",res)
      }
    })
  },
  updateComment(commentId,status){
    const that = this;
    wx.request({
      url: app.globalData.baseUrl + '/admin/posts/comments/'+commentId+'/status/'+status+'?admin_token='+app.globalData.admin_token,
      method: 'PUT',
      success: function (res) {
        if(res.data.status === 200){
          that.showMyToast("状态更改成功",'success')
          that.initParams()
          that.loadLastesComments()
        }else{
          that.showMyToast("状态更改失败",'fail')
        }
      },
      fail: function (res) {
        console.log("请求异常",res)
        that.showMyToast("请求异常",'fail')
      }
    })
  }
})