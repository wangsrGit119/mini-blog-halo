### halo后台配置

## 配置指南
`登录后台管理`->`系统`->`博客设置`->`切换到高级选项`（**右上角小字**）
->`API设置`->`API服务开启`->`设置acessKey`(**小程序端所需的**)

>这个地方的`acessKey` 就是小程序端的`api_access_key`

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