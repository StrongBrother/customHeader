# customHeader
微信小程序自定义顶部组件

兼容安卓、ios、各种刘海屏。

使用说明：

1、在app.json内一定要设置 "navigationStyle": "custom"

2、顶部高度计算方法在app.js里。

3、图标跳转的方法，在customHeader组件的index.js里，可以自行修改链接，默认跳转方法wx.navigateTo方法。
如果想调转到tabBar页面，请用wx.switchTab方法。

4、pages里的页面，使用时需在json文件里引入该组件。
