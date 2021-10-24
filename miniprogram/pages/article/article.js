// miniprogram/pages/article/article.js

import Card from '../common/card';
import Toast from '../../components/vant/components/dist/toast/toast';
import MpCuConfig from '../common/mp-custom-config'
let videoAd = null;


const app = getApp()
const db = wx.cloud.database()
const _ = db.command

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
    globalData:app.globalData,
    openComment:app.globalData.openComment === undefined ? true : app.globalData.openComment,//是否开启评论
    capsuleBarHeight:app.capsuleBarHeight,//顶部高度
    comments:[],//评论
    userInfo:undefined,
    authorInfo:undefined,
    actionSheetShow:false,
    myComment:undefined,
    email:"",
    currentComment:undefined,//选中的当前评论
    myStyle:{  //自定义mp主题

    },
    maxShowHeight: 1024, // 最大默认显示高度
    cuAd:'noAd',//默认无广告激励
    showLine:50,//有广告激励时默认展示文本行数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;

    //mp主题
    this.setData({
      myStyle:new MpCuConfig("default").defaultConfig().myStyle
    })
    //初始化变量
    that.setData({
      articleId:options.articleId,
      status:options.status,
      password:options.password,
      userInfo:app.globalData.userInfo,
    })

    //加载作者信息
    this.loadUserInfo();

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


    // 创建激励视频广告实例
    // if (app.globalData.openAd && wx.createRewardedVideoAd) {
    //   console.log("创建激励视频广告实例")
    //   videoAd = wx.createRewardedVideoAd({
    //     adUnitId: 'adunit-daf156fc94de2fc4'
    //   })
    //   videoAd.onLoad(() => {})
    //   videoAd.onError((err) => {})
    //   videoAd.onClose((res) => {})
    // }


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
    console.log("hidden")
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
    let articleDetail = this.data.articleDetail;
    let path = '/pages/article/article?articleId=' + articleDetail.id+'&status='+articleDetail.status+'&password='+articleDetail.password;
    return {
      title: articleDetail.title,
      path: path
    }
  },
  onShareTimeline(){
    let articleDetail = this.data.articleDetail;
    let path = '/pages/article/article?articleId=' + articleDetail.id+'&status='+articleDetail.status+'&password='+articleDetail.password;
    return {
      title: articleDetail.title,
      path: path
    }
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
  //user info
  loadUserInfo(){
    const that = this;
    wx.request({
      url: app.globalData.baseUrl + '/content/users/profile?api_access_key='+app.globalData.api_access_key,
      method: 'GET',
      success: function (res) {
        if(res.data.status == 200){
          app.globalData.authorInfo  = res.data.data;
          that.setData({
            authorInfo:res.data.data,
          })
        }
      },
      fail: function (res) {
        console.log("请求异常",res)
      }
    })
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
      url: app.globalData.baseUrl + '/content/posts/'+articleId+'?api_access_key='+app.globalData.api_access_key+'&formatDisabled=false'+'&sourceDisabled = true',
      method: 'GET',
      success: function (res) {
        if(res.data.status == 200){
          let data = JSON.parse(JSON.stringify(res.data.data));
          wx.hideLoading()
          that.setData({
            articleDetail:data,
          })
          console.log(data.metas)
          that.caculateMask(data)

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
  /**
   * 计算 maxheight
   */
  caculateMask(data){
    const that = this;
    data.metas.forEach(e =>{
      //showAd
      if(e.key === 'showAd'){
        if(e.value && e.value === 'true'){
          that.setData({
            cuAd: 'showAd',
            maxShowHeight:1524,
          })
        }else{
          that.setData({
            cuAd: 'noAd',
          })
        }
      }
      //maxShowHeight
      if(e.key==='maxShowHeight'){
        if(e.value && that.data.cuAd == 'showAd'){
          that.setData({
            maxShowHeight:parseInt(e.value),
          })
        }
      }
    })
  },
  markPosters(){
    let tempArticle = this.data.articleDetail;
    this.setData({
      paintPallette: new Card(
          '/images/bg-image004.jpg',
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
  //点赞喜欢
  onLikeAction(e){
    const that = this;
    const id = e.currentTarget.dataset.id;
    wx.request({
      url:  app.globalData.baseUrl + '/content/posts/'+id+'/likes?api_access_key='+app.globalData.api_access_key,
      method:'POST',
      success:function(res){
        console.log(res)
        if(res.data.status == 200){
          wx.showToast({
            title: '谢谢厚爱',
            icon:'none'
          })
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
  },
  // 收藏文章
  saveArticle(){
    const data = this.data.articleDetail;
    this.queryArticleRecordFromCloud(data.id)

  },
  //数据入库
  collectArticle(){
    const data = this.data.articleDetail;
    db.collection(app.globalData.myCollectArticle).add({
      data:{
        date:db.serverDate(),
        articleId:data.id,
        formatContent:data.formatContent,
        title: data.title,
        thumbnail:data.thumbnail,
        createTime:data.createTime,//文章发表时间
        desc: null
      }
    }).then(res=>{
      console.log(res)
      Toast.success("已收藏")

    }).catch(err=>{
      //保存异常
      console.error(err)
      Toast.fail("收藏失败")
    })
  },

  // 查询是否收藏
  queryArticleRecordFromCloud(articleId){
    const that = this;
    // 调用云函数获取openID
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        let openID =  res.result.openid
        db.collection(app.globalData.myCollectArticle)
            .where({
              _openid: openID,
              articleId:articleId,
            })
            .get()
            .then(res=>{
              console.log(res)
              if(res.data.length >0){
                Toast.fail("文章已收藏过")
              }else{
                that.collectArticle()
              }
            })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  // 阅读更多
  readMoreInfo() {
    const that = this;
    that.setData({
      cuAd:'noAd',
      maxShowHeight:100000
    })
    if (videoAd) {
      videoAd.show().catch(() => {
        // 失败重试
        videoAd.load()
            .then(() => videoAd.show())
            .catch(err => {
              console.log('激励视频 广告显示失败')
            })
      })
      setTimeout(()=>{
        that.setData({
          cuAd:'noAd',
          maxShowHeight:that.data.maxShowHeightTemp
        })
      },3000)
    }
  }

})
