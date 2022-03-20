# plus版本配置

## 说明

> plus 版本暂未开放源码，想要源码的请在下面公众号加我联系方式，除了plus版本功能配置，其他的配置同普通版本的配置，按照后续普通配置即可

## plus版本功能（1） 

 - 优先解决功能提议
 - 接入返利平台别人在你的小程序上`领取优惠券`然后到`淘宝或者京东 拼多多`下单后会获取一定的`返利到自己账户`，充值 电话费`100减6-7`不等

![公众号](../images/g_z_h_qrcode.jpg)

## 接入指南

 ### 首先关注第三方平台

![公众号](../images/g_z_h_third_suyan.jpg)

 - 输入`签到`建立个人数据中心
 - 点击中间栏目下方`合作申请`
 - 再点击页面底部的`数据接入商`申请，用于获取自己的`返利appkey`
 - 等待第三放平台审核通过后发放`appkey和个人ID`
 - 在源码的app.js中有配置参数

```javascript
 // 第三方
      third_baseUrl_coupons:'https://www.xxxx.com',//第三方优惠券接口
      third_apikey_coupons:'xxxxxxxxxxxxxx',
      privateId_coupons:xxxxxxx,
	  customSlug_one_title:'科技动态',//分类一
	   customSlug_one:'新闻',
	   customSlug_two_title:'面试题集', //分类二
	   customSlug_two:'面试题',
```

## 参数配置说明

 - `third_baseUrl_coupons` 第三方api地址，这个地址一定要在微信后台配置 `开发管理` ->`开发设置`-> `服务器域名`
 - `third_apikey_coupons` 第三方分配的私有key
 - `privateId_coupons` 第三方分配的id
 - `customSlug_one_title` 分类一的标题
 - `customSlug_one` 小程序轮播图下面的第一个自定义滚动小卡片 **这个目录一定要在后台添加，且有绑定的文章，不然不会展示** 
 - `customSlug_two_title` 分类二标题
 - `customSlug_two` 小程序轮播图下面的第二个自定义滚动小卡片 **这个目录一定要在后台添加，且有绑定的文章，不然不会展示**

>**上述对应的第一个卡片和第二个卡片标题可以自定义，我的叫`科技动态`，你的可以换成别的和内容搭配的文案**

## plus版本功能（2）--留言板

> 留言板ID----需要数据库去查询或者F12查看网页端留言页面的id或者去后台管理找到页面F12 然后查看network 还不会的话请联系博主帮助
 
 ```javascript
  //留言板ID----需要数据库去查询或者F12查看网页端留言页面的id或者去后台管理找到页面F12 然后查看network 还不会的话请联系博主帮助
  sheetId:34,
 
 ```