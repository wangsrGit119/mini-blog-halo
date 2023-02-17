// miniprogram/pages/comments/comments.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:app.globalData.userInfo,
    capsuleBarHeight:app.capsuleBarHeight,//顶部高度
    page:0, //页号
    pageSize:10,//数量
    comments:[],//评论集合
    totalComment:0,//评论总数
    inputComment:"",//输入的评论回复
    commentInputShow:false,//评论输入框展示
    currentComment:{},//当前评论
    currentItem:'one',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initParams()
    this.loadLastesComments()
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
      if(this.data.currentItem === 'one'){
        this.loadLastesComments();
      }else if(this.data.currentItem === 'two'){
        this.loadSheetComment()
      }
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
    wx.showLoading({		
      title: '加载中',
    })
    const sort1 = "createTime,desc";
    wx.request({
      url: app.globalData.baseUrl + '/admin/posts/comments?admin_token='+app.globalData.admin_token+'&page='+page+'&size='+size+'&sort='+sort1,
      method: 'GET',
      success: function (res) {
        wx.hideLoading()
        if(res.data.status == 200){
          that.setData({
            totalComment:res.data.data.total
          })
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
      title: '回复中'
    })
    if(that.data.currentItem === 'one'){
      that.doPostComments();
    }else if(that.data.currentItem === 'two'){
      that.doSheetComments()
    }
  },
  doPostComments(){
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
  // 更改评论状态
  updatePostComment(e){
    const that = this;
    let commentId = e.currentTarget.dataset.item.id;
    let status = e.currentTarget.dataset.status;
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
  },
  /**
   * 切换选项卡
   */
  onSwitchItem(e){
    this.setData({
      currentItem:e.detail.activeKey
    })
    if(e.detail.activeKey === 'one'){
      this.initParams()
      this.loadLastesComments()
    }else if(e.detail.activeKey === 'two'){
      this.initParams()
      this.loadSheetComment()
    }
  },
  /**
   * 页面评论
   */
  loadSheetComment(){
    const that = this;
    const page = that.data.page;
    const size = that.data.pageSize;
    wx.showLoading({		
      title: '加载中',
    })
    const sort1 = "createTime,desc";
    wx.request({
      url: app.globalData.baseUrl + '/admin/sheets/comments?admin_token='+app.globalData.admin_token+'&page='+page+'&size='+size+'&sort='+sort1,
      method: 'GET',
      success: function (res) {
        wx.hideLoading()
        if(res.data.status == 200){
          that.setData({
            totalComment:res.data.data.total
          })
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
        console.log("请求异常",res)
      }
    })
  },
  doSheetComments(){
    const that = this;

    let params = {
      "content": that.data.inputComment,
      "parentId": that.data.currentComment.id,
      "postId": that.data.currentComment.sheet.id
    }
    wx.request({
      url: app.globalData.baseUrl + '/admin/sheets/comments?admin_token='+app.globalData.admin_token,
      data:params,
      method: 'POST',
      header: {ContentType: 'application/json'},
      success: function (res) {
        wx.hideLoading()
        if(res.data.status == 200){
          that.showMyToast('评论成功','success');
           // 加载列表
           that.initParams()
           that.loadSheetComment()   
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
  /**
   * 页面评论状态更新
   * @param {*} e 
   */
  updateSheetComment(e){
    const that = this;
    console.log(e)
    let item = e.currentTarget.dataset.item;
    let commentId = item.id;
    let status = e.currentTarget.dataset.status;
    let index = e.currentTarget.dataset.index+1;
    console.log(that.data.comments)
    item.status = status;
    console.log(that.data.comments[index])
    console.log(that.data.comments)

    wx.request({
      url: app.globalData.baseUrl + '/admin/sheets/comments/'+commentId+'/status/'+status+'?admin_token='+app.globalData.admin_token,
      method: 'PUT',
      success: function (res) {
        if(res.data.status === 200){
          that.initParams()
          that.loadSheetComment()
        }else{
          that.showMyToast("状态更改失败",'fail')
        }
      },
      fail: function (res) {
        console.log("请求异常",res)
        that.showMyToast("请求异常",'fail')
      }
    })
  },
  // 永久删除
  deleteForeverSheetComment(e){
    const that = this;
    let commentId = e.currentTarget.dataset.item.id;
    wx.request({
      url: app.globalData.baseUrl + '/admin/sheets/comments/'+commentId+'?admin_token='+app.globalData.admin_token,
      method: 'DELETE',
      success: function (res) {
        console.log(res)
        if(res.data.status === 200){
          that.showMyToast("已永久删除",'success')
          that.initParams()
          that.loadSheetComment()
        }
      },
      fail: function (res) {
        console.log("请求异常",res)
      }
    })
  },
})