#  小程序配置


## 从git仓库下载[稳定包](https://github.com/wangsrGit119/mini-blog-halo/releases)或者稳定分支[源码](https://github.com/wangsrGit119/mini-blog-halo)，用微信开发工具打开源码
 > `注意：master分支是最新的代码，如果想要体验最新的未发布版本，直接拉取主分支即可，正常来说主分支的代码均可稳定运行`
## **基础配置**

> `项目路径` -> `app.js `文件中

```
    this.globalData = {
      baseUrl: 'https://cxxxxxxxxx.cn/api', //api
      api_access_key:"cxxxxxxxxx", //token
      index_bg_image_url:"https://cdn.jsdelivr.net/gh/wangsrGit119/wangsr-image-bucket/img-article/photo-1507738978512-35798112892c.jfif",//首页背景
      title:"SUKE'S SHARE",//自定义title
      shareName:'suke的个人博客',//小程序分享名称
      userInfo:undefined,//登录用户信息储存处
    }
```
   - `baseUrl`：基础的API（halo博客的）
   - `api_access_key` ：博客后台开启api后设置的token
   - `index_bg_image_url`：首页bar背景图片
   - `title` ： 首页展示的标题
   - `shareName`: 朋友圈分享的名称
   - `userInfo`:基础用户信息，`无需配置`


## **云函数环境配置**
 
 > **重要，不配置则小程序无法评论**（因为用到了云函数所以需要在开发控制台[开通云开发](https://mp.weixin.qq.com/wxamp/clouddevelopment/index)，并在app.js配置云环境ID）

```
 wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'ssssssssssssssssss',
        traceUser: true,
      })
```

##  字体配置(app.wxss)
> **可选操作，默认即可**

> 自定义字体显示**只有一部分特定的中文字体，所有英文，数字**

> 使用过程中如果有**想要单独使用字体**的，后续我可以**添加到字体文件中，然乎发布新的字体链接版本**

```
@font-face {
  font-family: 'CUSTOM_FONT_T_01';
  src: url('https://cdn.jsdelivr.net/gh/wangsrGit119/wangsr-image-bucket/img-article/2021032601fangzhengziji_xingkaijianti.ttf');
}

@font-face {
  font-family: 'CUSTOM_FONT_T_02';
  src: url('https://cdn.jsdelivr.net/gh/wangsrGit119/wangsr-image-bucket/img-article/2020032601jianghaoyingbikaishu.ttf');
}

```
## 海报生成的二维码配置

> `项目下路径` > `images` > `wechat-q-code.jpg`替换成自己的二维码   