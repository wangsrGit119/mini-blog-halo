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
    articleId:undefined,
    showSkeleton:true,
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
    
    const data = JSON.parse(decodeURIComponent(options.item));
    // 骨架屏显示
    setTimeout(function(){
      that.setData({
        showSkeleton:false,
        articleId:data.id
      })
    },1000)
    console.log(data)
    // console.log(data)
    this.loadArticleDetail(data.id);
    this.loadComments(data.id)   
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
        console.log(res)
        if(res.data.status == 200){
          let data = JSON.parse(JSON.stringify(res.data.data));
          let obj = app.towxml(data.originalContent,'markdown',{
            // theme:'dark',
            events:{
              tap:e => {
                console.log('tap',e);
              },
              change:e => {
                console.log('todo',e);
              }
            }
          });
          data.content = obj;
          
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
    console.log("ok",e)
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
  saveEvent(e){
    const that = this;
    if(that.data.myComment !== undefined 
      && that.data.email !== undefined
      && that.data.myComment !== ""){
        wx.cloud.callFunction({
          name: 'msgseccheck',
          data: {
            content:that.data.myComment
          },
          success:(res)=>{
            console.log(res)
            if(res.result.errCode!=0){
              wx.showToast({
                title: '非法内容',
                icon: 'error',
                })
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
      wx.showToast({
        title: '内容不能为空',
        icon: 'error',
        })
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
        wx.showToast({
          title: '非法邮箱',
          icon: 'error',
          })
          return false 
     }  
  },
  doComments(){
    const that = this;
    console.log(this.data)
    let params = {
      "allowNotification": true,
      "author": app.globalData.userInfo.nickName,
      "authorUrl": app.globalData.userInfo.avatarUrl,
      "content": this.data.myComment,
      "email": this.data.email,
      "parentId": this.data.currentComment === undefined ? 0 :this.data.currentComment.id,
      "postId": this.data.articleId
    }
    wx.request({
      url: app.globalData.baseUrl + '/content/posts/comments?api_access_key='+app.globalData.api_access_key,
      data:params,
      method: 'POST',
      header: 'Content-Type: application/json',
      success: function (res) {
        console.log(res)
        if(res.data.status == 200){
          that.loadComments(that.data.articleId)   
          that.setData({actionSheetShow : false});
          wx.showToast({
            title: '评论成功',
            icon: 'succcess',
            })
        }else{
          wx.showToast({
            title: '评论失败',
            icon: 'error',
            })
        }
      },
      fail: function (res) {
        console.log("请求异常",res)
      }
    })
  }
})