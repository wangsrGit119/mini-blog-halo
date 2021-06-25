// miniprogram/pages/article/article.js
import Card from '../card';

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postersShow:false,//海报弹窗
    imgSuccess:true,//海报制作是否成功
    articleDetail:{},
    //文章信息
    articleId:undefined,
    status:undefined,
    password:undefined,
    showSkeleton:true,//骨架屏
    passwordDialog:false,//密码输入框
    inputPwd:"",//用户输入的密码(私密文章)
    index_bg_image_url:app.globalData.index_bg_image_url,//首页背景
    capsuleBarHeight:app.capsuleBarHeight,//顶部高度
    comments:[],//评论
    userInfo:app.globalData.userInfo,
    actionSheetShow:false,
    myComment:undefined,
    email:"",
    currentComment:undefined,//选中的当前评论

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    console.log(options)
    that.setData({
      articleId:options.articleId,
      status:options.status,
      password:options.password
    })
    // 骨架屏显示
    setTimeout(function(){
      that.setData({
        showSkeleton:false,
      })
    },2000)
    if(options.status === 'INTIMATE'){
      wx.showToast({
        title: '私密文章',
        image:'../../images/privateInfo.png'
      })
      //展示密码输入框
      that.setData({
        passwordDialog:true,
      })
    }else if(options.status === 'PUBLISHED'){
      this.initArticle(options.articleId)
    }    
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
    title: app.globalData.shareName,
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
  // 私密文章密码输入比对
  onValidatePwd(){
    if(this.data.password === this.data.inputPwd){
      this.showMyToast('校验通过','success')
      this.setData({
        passwordDialog:false
      })
      this.initArticle(this.data.articleId)
    }else{
      this.showMyToast('密码错误','fail')
    }
  },
  // 监听密码输入
  onChangingPwd(e){
    console.log(e)
    this.setData({
      inputPwd:e.detail.value
    })
  },
  //初始化文章页面
  initArticle(articleId){
    this.loadArticleDetail(articleId);
    this.loadComments(articleId) 
  },
  //返回上一级
  onClickLeft(){
    wx.navigateBack({
      delta: 1
    })
  },
  loadArticleDetail(articleId){
    const that = this;
    wx.showLoading({								//显示 loading 提示框
      title: '文章加载中',
    })
    wx.request({
      url: app.globalData.baseUrl + '/content/posts/'+articleId+'?api_access_key='+app.globalData.api_access_key,
      method: 'GET',
      success: function (res) {
        console.log(res)
        if(res.data.status == 200){
          let data = JSON.parse(JSON.stringify(res.data.data));
          let obj = app.towxml(data.originalContent,'markdown',{
            // theme:'dark',
            events:{
              tap:e => {
                if(e.currentTarget.dataset.data.tag === 'img'){
                    wx.previewImage({
                      urls: [e.currentTarget.dataset.data.attr.src],
                    })
                }
              },
              change:e => {
                console.log('todo',e);
              }
            }
          });
          data.content = obj;
          wx.hideLoading()
          that.setData({
            articleDetail:data,
          })
        }else{
          wx.hideLoading()
        }
      },
      fail: function (res) {
        wx.hideLoading()
        console.log("请求异常",res)
      }
    })
  },
  markPosters(){
    let tempArticle = this.data.articleDetail;
    this.setData({
      paintPallette: new Card(
        '/images/bg-image002.jpeg',
      tempArticle.thumbnail,
      tempArticle.title,
      tempArticle.summary,
      app.globalData.userInfo.nickName).palette(),
      postersShow:true
    });
    
  },
  closePosters(){
    this.setData({
      postersShow:false
    })
  },
  onImgOK(e) {
    this.setData({imgSuccess:false})
    this.imagePath = e.detail.path;
    this.setData({
      image: this.imagePath
    })
    if (this.isSave) {
      this.saveImage(this.imagePath);
    }
  },
  saveImage() {
    if (this.imagePath && typeof this.imagePath === 'string') {
      this.isSave = false;
      wx.saveImageToPhotosAlbum({
        filePath: this.imagePath,
      });
    }
  },

  //  获取用户信息并制作海报
  getUserProfile() {
    if(app.globalData.userInfo && app.globalData != undefined){
      this.markPosters();
    }else{
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
          app.globalData.userInfo = res.userInfo;
          this.setData({
            avatarUrl: res.userInfo.avatarUrl,
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
          this.markPosters();
        },
        fail:(err)=>{
          console.log(err)
        }
      })

    }
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
  },
  // 评论按钮事件
  toComment(e){
    const that = this;
    this.setData({
      currentComment:e.currentTarget.dataset.commentOne
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
          title: '内容校验中...',
        })
        wx.cloud.callFunction({
          name: 'msgseccheck',
          data: {
            content:that.data.myComment
          },
          success:(res)=>{
            console.log(res)
            if(res.result.errCode!=0){
                this.showMyToast('非法内容','fail')
                that.setData({
                  myComment:""
                })
            }else if(res.result.errCode==0){
              that.doComments();
            }
          },
          fail:err=>{
            console.log(err)
          }
        })
    }else{
      this.showMyToast('内容不能为空','fail')
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
      this.showMyToast('非法邮箱','fail')
      return false 
     }  
  },
  doComments(){
    const that = this;
    let params = {
      "allowNotification": true,
      "author": app.globalData.userInfo.nickName,
      "avatar": app.globalData.userInfo.avatarUrl,
      "content": this.data.myComment,
      "email": this.data.email,
      "parentId": this.data.currentComment === undefined ? 0 :this.data.currentComment.id,
      "postId": this.data.articleId
    }
    wx.request({
      url: app.globalData.baseUrl + '/content/posts/comments?api_access_key='+app.globalData.api_access_key,
      data:params,
      method: 'POST',
      header: {ContentType: 'application/json'},
      success: function (res) {
        wx.hideLoading()
        if(res.data.status == 200){
          that.loadComments(that.data.articleId)   
          that.setData({actionSheetShow : false});
          that.showMyToast('评论成功','success');
        }else{
          that.showMyToast('评论失败','fail');
        }
      },
      fail: function (res) {
        that.showMyToast('请求异常','fail');
        console.log("请求异常",res)
        wx.hideLoading()
      }
    })
  }
})