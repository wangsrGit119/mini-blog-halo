Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    scanImage(e){
      console.log(e.currentTarget.dataset.url)
      let curImg = e.currentTarget.dataset.url
      let list = [curImg]
      wx.previewImage({
        current: curImg, // 当前显示图片的http链接
        urls: list // 需要预览的图片http链接列表
      })
    },

  }
})