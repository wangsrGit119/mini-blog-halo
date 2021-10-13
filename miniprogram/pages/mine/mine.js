// miniprogram/pages/mine/mine.js
const app = getApp()
import Dialog from '../../components/vant/components/dist/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorInfo:{},
    statisticsInfo:{},
    globalData:app.globalData,
    adminQ:false,//管理入口提问弹窗
    keyInputShow:false,//密钥输入框弹窗
    inputSecretKey:null,//输入的密钥
    loading:false,//全屏加载

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
    this.loadUserInfo()
    this.loadStatistics();

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
        duration: 3000,
        image:'../../images/validateSuccess.png'
      })
    }else if(type === 'fail'){
      wx.showToast({
        title: title,
        image:'../../images/validateError.png'
      })
    }
  },
  popupMessage(message,type){
    wx.lin.showMessage({
      top:60,
      duration:4000,
      type:type,
      content:message
  })
  },
   //user info 
   loadUserInfo(){
    const that = this;
    wx.request({
      url: app.globalData.baseUrl + '/content/users/profile?api_access_key='+app.globalData.api_access_key,
      method: 'GET',
      success: function (res) {
        console.log(res);
        if(res.data.status == 200){
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
  loadStatistics(){
    const that = this;
    wx.request({
      url: app.globalData.baseUrl + '/content/statistics?api_access_key='+app.globalData.api_access_key,
      method: 'GET',
      success: function (res) {
        let temp = res.data.data;
        if(res.data.status == 200){
          that.setData({
            statisticsInfo:temp,
          })
        }
      },
      fail: function (res) {
        console.log("请求异常",res)
      }
    })
  },
  showAbout(){
    Dialog.alert({
      title: '温馨提示',
      message: '此小程序是基于开源博客Halo提供的API所开发，数据来源均来源于的博客系统，最后感谢Halo'
    }).then(() => {
      // on close
    });
  },
  // 监听输入的key
  inputKeyOnChange(e){
    this.setData({
      inputSecretKey:e.detail.value
    })
  },
  // 手动输入密钥校验
  validateAccessOK(e){
    this.setData({
      loading:true
    })
    let key = e.currentTarget.dataset.inputSecretKey
    this.getLoginInfo(2,key);
  },
  getLoginInfo(type,key){
    const that = this;
    wx.cloud.callFunction({
      name: 'login-halo',
      data:{
        key:key,
        type:type,
      },
      success:(res)=>{
        console.log(res)
        let haloRes = res.result.haloRes
        if(haloRes.status === 200){
          that.getToken(haloRes.params)
        }else{
          that.showMyToast(haloRes.message,'fail')
        }
        that.setData({
          loading:false
        })
      },
      fail:err=>{
        console.log(err)
      }
    })
  },
  getToken(params){
    const that = this;
    wx.request({
      url: app.globalData.baseUrl + '/admin/login',
      data:params,
      method: 'POST',
      header: {ContentType: 'application/json'},
      success:(res)=>{
        that.setData({
          loading:false
        })
        if(res.data.status === 200){
          app.globalData.admin_token = res.data.data.access_token
          that.showMyToast('验证成功','success')
          setTimeout(()=>{
              // 跳转
              wx.navigateTo({
                url: '/pages/admin-manager/admin-manager',
              })
          },1000)
        }else{
          that.showMyToast('非法登录','fail')
        }
      },
      fail:(err)=>{
        that.showMyToast('服务异常','fail')
        console.log(err)
      }
    })
  },
  // 管理入口提问
  showDoorForAdmin(){
   this.setData({
     adminQ:true
   })
  },
  // 是管理员
  adminQConfirm(){
    this.setData({
      loading:true
    })
    this.getLoginInfo(1,null)
  },
  // 非管理员
  adminQCancel(){
    this.setData({
      keyInputShow:true
    })

  },
  /**
   * 获取openID 点击头像
   */
  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
       
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      
      }
    })
  },
  doCopyDomain(){
    wx.setClipboardData({
      data: app.globalData.domain,
      success: function (res) {
       console.log("复制内容",app.globalData.domain)
      }
    })
  },

})