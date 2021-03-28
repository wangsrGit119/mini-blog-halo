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