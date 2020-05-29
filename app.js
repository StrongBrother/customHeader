//app.js


App({
    // 小程序初始化
    onLaunch: function() {
        // 获取自定义顶部高度相关参数
        let capsuleObj = wx.getMenuButtonBoundingClientRect();
        // console.log("==胶囊信息==");
        // console.log(capsuleObj);

        wx.getSystemInfo({
            success: (res) => {
                // console.log("==获取系统信息==");
                // console.log(res)
                var statusBarHeight = res.statusBarHeight; //顶部状态栏高度

                this.globalData.capsuleObj = capsuleObj;
                this.globalData.titleHeight = statusBarHeight + capsuleObj.height + (capsuleObj.top - statusBarHeight) * 2;
            },
            failure() {
            }
        })
    },

    // 全局缓存
    globalData: {
        loginStatus: false,
    },
})
