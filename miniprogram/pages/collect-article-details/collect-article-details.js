// miniprogram/pages/collect-article-details/collect-article-details.js
const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:undefined,
    authorInfo:undefined,
    articleDetail:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.setData({
      articleId:options.articleId,
      //初始化变量全局新的
      userInfo:app.globalData.userInfo,
      authorInfo:app.globalData.authorInfo
    })
    that.queryArticleRecordFromCloud(options.articleId)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
   // 获取文章根据用户信息和当前文章信息
   queryArticleRecordFromCloud(articleId){
    const that = this;
    wx.showLoading({					
      title: '加载中',
    })
    // 调用云函数获取openID
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
          let openID =  res.result.openid
          db.collection("myCollectArticle")
              .where({
                _openid: openID,
                articleId:parseInt(articleId),
              })
              .get()
              .then(articleRes=>{
                wx.hideLoading()
                let data = articleRes.data[0];
                let obj = app.towxml(data.formatContent,'html',{
                  // theme:'dark',
                  events:{
                    tap:e => {
                      console.log(e)
                      if(e.currentTarget.dataset.data.tag === 'img'){
                          wx.previewImage({
                            urls: [e.currentTarget.dataset.data.attr.src],
                          })
                      }
                      if(e.currentTarget.dataset.data.tag === "navigator"){
                        wx.setClipboardData({
                          data: e.currentTarget.dataset.data.attr.href,
                          success:(res)=>{
                            console.log(res)
                          }
                        })
                      }
                    },
                    change:e => {
                      console.log('todo',e);
                    }
                  }
                });
                data.content = obj;
                that.setData({
                  articleDetail:data,
                })
            })
      },
      fail: err => {
        wx.hideLoading()
        console.error('[云函数] [login] 调用失败', err)
      }
    })
},
})