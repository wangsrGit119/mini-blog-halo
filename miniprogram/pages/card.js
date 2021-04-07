
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
    {
      "type": "image",
      "url": "/images/recommend.png",
      "css": {
        "background": "#ffffff",
        "top": "75px",
        "right": "50px",
        "width": "50px",
        "rotate": "0",
        "borderRadius": "",
        "borderWidth": "",
        "borderColor": "#000000",
        "shadow": "",
        "mode": "scaleToFill"
      }
    },
    {
      // 推荐
      "type": "text",
      "text": "今日份推荐",
      "css": {
        "color": "#000000",
        "background": "rgba(0,0,0,0)",
        "width": "334.5px",
        "height": "42.89999999999999px",
        "top": "75px",
        "left": "100px",
        "rotate": "0",
        "borderRadius": "",
        "borderWidth": "",
        "borderColor": "#000000",
        "shadow": "",
        "padding": "0px",
        "fontSize": "30px",
        "fontWeight": "normal",
        "maxLines": "1",
        "lineHeight": "43.290000000000006px",
        "textStyle": "fill",
        "textDecoration": "none",
        "fontFamily": "",
        "textAlign": "left"
      }
    },
    // 概要
    {
      "type": "text",
      "text": this.summary,
      "css": {
        "color": "#000000",
        "background": "",
        "width": "531.301300292866px",
        "height": "23.939999999999994px",
        "top": "171.99999999999997px",
        "left": "90.5px",
        "rotate": "0",
        "borderRadius": "",
        "borderWidth": "0.1px",
        "borderColor": "#000000",
        "shadow": "10rpx 10rpx 5rpx #888888",
        "padding": "",
        "margin": "35px",

        "fontSize": "22px",
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
      "type": "image",
      "url": "/images/common-share.png",
      "css": {
        "color": "#000000",
        "background": "",
        "top": "354px",
        "left": "149px",
        "rotate": "0",
        "borderRadius": "",
        "borderWidth": "",
        "borderColor": "#000000",
        "shadow": "",
        "padding": "0px",
      }
    },
    {
      "type": "image",
      "url": "/images/heats.png",
      "css": {
        "background": "#ffffff",
        "top": "590px",
        "left": "100px",
        "rotate": "0",
        "borderRadius": "",
        "borderWidth": "",
        "borderColor": "#000000",
        "shadow": "",
        "mode": "scaleToFill"
      }
    },
    // 文章标题
    {
      "type": "text",
      "text": this.title,
      "css": {
        "color": "#000000",
        "background": "",
        "width": "475px",
        "height": "75.02px",
        "top": "604px",
        "left": "119px",
        "rotate": "0",
        "borderRadius": "",
        "borderWidth": "",
        "borderColor": "#000000",
        "shadow": "",
        "padding": "0px",
        "fontSize": "20px",
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
        "width": "100px",
        "height": "110px",
        "bottom": "20px",
        "left": "50px",
        "rotate": "0",
        "borderRadius": "50px",
        "borderWidth": "",
        "shadow": "10rpx 10rpx 5rpx #888888",
      }
    },
     // 用户昵称
    {
      "type": "text",
      "text": this.nickname+" 邀你一起阅读",
      "css": {
        "width": "300px",
        "height": "110px",
        "bottom": "40px",
        "right": "40px",
        "rotate": "0",
        "fontSize": "28px",
        "fontWeight": "normal",
        "maxLines": "1",
        "lineHeight": "37.74px",
        "textStyle": "fill",
        "textDecoration": "none",
        "borderRadius": "50px",
        "borderWidth": "",
        "shadow": "10rpx 10rpx 5rpx #888888",
      }
    }
  ]
 }
        );
      }
    }
    