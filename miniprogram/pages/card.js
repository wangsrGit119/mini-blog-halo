
    export default class LastMayday {

      constructor(bgUrl,articleCover,title,summary){
        this.bgUrl=bgUrl
        this.title=title
        this.summary=summary
        this.articleCover=articleCover
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
        "color": "#f5f5f5",
        "background": "",
        "width": "400.5px",
        "height": "23.939999999999994px",
        "top": "171.99999999999997px",
        "left": "144.5px",
        "rotate": "0",
        "borderRadius": "",
        "borderWidth": "",
        "borderColor": "#000000",
        "shadow": "",
        "padding": "0px",
        "fontSize": "19px",
        "fontWeight": "normal",
        "maxLines": "4",
        "lineHeight": "37.964000000000006px",
        "textStyle": "fill",
        "textDecoration": "none",
        "fontFamily": "",
        "textAlign": "left"
      }
    },
    {
      "type": "image",
      "url": "/images/heats.png",
      "css": {
        // "width": "127px",
        "background": "#ffffff",
        // "height": "127px",
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
    // 用户头像
    {
      "type": "image",
      "url": "https://wangsrbus.cn/wangsr-font/bg_images/photo-1596162954151-cdcb4c0f70a8.jpeg",
      "css": {
        "width": "100px",
        "height": "100px",
        "bottom": "20px",
        "right": "50px",
        "rotate": "0",
        "borderRadius": "50px",
        "borderWidth": "",
        "borderColor": "#000000",
        "shadow": "10 10 10 #888888",
        "mode": "scaleToFill"
      }
    },
// 二维码
    {
      "type": "image",
      "url": "/images/wechat-q-code.jpg",
      "css": {
        "width": "100px",
        "background": "#ffffff",
        "height": "100px",
        "bottom": "20px",
        "left": "40px",
        "rotate": "0",
        "borderRadius": "50px",
        "borderWidth": "",
        "borderColor": "#000000",
        "shadow": "",
        "mode": "scaleToFill"
      }
    }
  ]
 }
        );
      }
    }
    