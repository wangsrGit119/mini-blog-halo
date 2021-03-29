# 简介

此微信小程序是基于开源博客Halo提供的API开发，使用的前提是自己已经部署有自己的Halo博客网站。

- 微信小程序使用api必须是https，因此需要自己的博客网站配置ssl证书。
- 下载后直接微信小程序开发工具打开即可。
- 在app.js配置acess_key以及线上api地址

## 小程序体验

![苏克分享](https://cdn.jsdelivr.net/gh/wangsrGit119/wangsr-image-bucket/img-article/blog-wxchat-gh_0b089e4e80ed_258.jpg)

## Halo开源博客地址

- [halo官网](https://halo.run/)
- [halo-GitHub地址](https://github.com/halo-dev/halo)

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

## 本地或者自己部署线上配置

- 基础配置

```
    this.globalData = {
      baseUrl: 'https://xxxxxx.cn/api', //api
      api_access_key:"ssssss", //token
      index_bg_image_url:"https://cdn.jsdelivr.net/gh/wangsrGit119/wangsr-image-bucket/img-article/photo-1507738978512-35798112892c.jfif",//首页背景
      title:"",//自定义首页title
    }
```
   - baseUrl：基础的API（halo博客的）
   - api_access_key ：博客后台开启api后设置的token
   - index_bg_image_url：首页bar背景图片
   - title ： 首页展示的标题


- 云函数环境配置（因为用到了云函数所以需要在开发控制台开通云开发，并在app.js配置云环境ID）

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

-  字体配置(app.wxss)

>自定义字体显示只有一部分特定的中文字体，所有英文，数字
> 使用过程中如果有想要单独使用字体的，后续我可以添加到字体文件中，然乎发布新的字体链接版本

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
