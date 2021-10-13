
    
    // 海报
    export default class LastMayday {

      constructor(bgUrl,articleCover,title,summary,nickname){
        this.bgUrl = bgUrl
        this.title = title
        this.summary = summary
        this.articleCover = articleCover
        this.nickname = nickname
      }

      palette() {
        return (
     {
  "width": "720px",
  "height": "1280px",
  "background": "#f8f8f8",
  "views": [
    // 背景
    {
      "type": "image",
      "url": this.bgUrl,//"/images/bg-image001.jpeg",  
      "css": {
        "width": "720px",
        "height": "1280px",
        "top": "0px",
        "left": "0px",
        "rotate": "0",
        "borderRadius": "",
        "borderWidth": "",
        "borderColor": "#000000",
        "shadow": "",
        "mode": "scaleToFill"
      }
    },
    
    // 概要
    {
      "type": "text",
      "text": this.summary,
      "css": {
        "color": "#001D2D",
        "background": "",
        "width": "531.301300292866px",
        "height": "23.939999999999994px",
        "bottom": "371.99999999999997px",
        "left": "90.5px",
        "rotate": "0",
      
        "shadow": "10rpx 10rpx 5rpx #888888",
        "padding": "",
        "margin": "35px",

        "fontSize": "26px",
        "fontWeight": "normal",
        "maxLines": "3",
        "lineHeight": "40.964000000000006px",
        "textStyle": "fill",
        "textDecoration": "none",
        "fontFamily": "",
        "textAlign": "left"
      }
    },
    
    // 文章标题
    {
      "type": "text",
      "text": "《"+ this.title +" 》",
      "css": {
        "color": "#001D2D",
        "background": "",
        "width": "475px",
        "height": "75.02px",
        "top": "604px",
        "left": "119px",
        "rotate": "0",
        "shadow": "",
        "padding": "0px",
        "fontSize": "30px",
        "fontWeight": "normal",
        "maxLines": "2",
        "lineHeight": "37.74px",
        "textStyle": "fill",
        "textDecoration": "none",
        "fontFamily": "",
        "textAlign": "center"
      }
    },
    // 二维码
    {
      "type": "image",
      "url": "/images/wechat-q-code.jpg",
      "css": {
        "width": "130px",
        "height": "140px",
        "bottom": "30px",
        "left": "60px",
        "rotate": "0",
        "borderRadius": "50%",
        "borderWidth": "",
        "shadow": "10rpx 10rpx 5rpx #888888",
      }
    },
     // 用户昵称
    {
      "type": "text",
      "text": this.nickname+" 邀你一起阅读",
      "css": {
        "color":"#2F9F9C",
        "width": "500px",
        "height": "110px",
        "bottom": "40px",
        "left": "200px",
        "rotate": "0",
        "fontSize": "28px",
        "fontWeight": "normal",
        "maxLines": "1",
        "lineHeight": "37.74px",
        "textStyle": "fill",
        "textDecoration": "none",
        "borderRadius": "50px",
        "borderWidth": "",
        // "shadow": "10rpx 10rpx 5rpx #888888",
      }
    }
  ]
 }
        );
      }
    }
    