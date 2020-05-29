const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}


function nowTime() {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var n = timestamp * 1000;
    var date = new Date(n);
    //年
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时
    var h = date.getHours();
    //分
    var m = date.getMinutes();
    //秒
    var s = date.getSeconds();
    return Y + '-' + M + '-' + D
}


function nowTimeh() {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var n = timestamp * 1000;
    var date = new Date(n);
    //年
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时
    var h = date.getHours();
    //分
    var m = date.getMinutes();
    //秒
    var s = date.getSeconds();
    return h + ':' + m
}

/**
 * 请求接口统一验证拦截器
 * @stateData 服务端返回的状态
 * @showData  是否显示错误提示框  1弹出提示框   2弹出确认框   10不弹出
 * @toData    跳转路径   1不跳转  跳转填写路径pages/index/index
 * @msgData   错误信息
 */
function checkState(stateData, msgData, showData, toData) {
    if (stateData == 0) {
        // wx.showToast({
        //   title: msgData,
        //   icon: 'none'
        // })
        // return true;
    } else {
        if (showData == 1) {
            wx.showToast({
                title: msgData,
                icon: 'none'
            })
        }

        if (showData == 2) {
            wx.showModal({
                title: '提示',
                content: msgData,
                showCancel: false,
            })
        }

        if (toData != 1) {
            wx.navigateTo({
                url: toData,
            })
        }

        return
    }
}

/**
 * 防止连续多次点击
 * @fn        方法
 * @gapTime   间隔时间
 */
function moreClick(fn, gapTime) {
    if (gapTime == null || gapTime == undefined) {
        gapTime = 4000
    }

    let _lastTime = null

    // 返回新的函数
    return function() {
        let _nowTime = +new Date()
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn.apply(this, arguments) //将this和参数传给原函数
            _lastTime = _nowTime
        }
    }
}


/**
 * 判断是否是手机号
 * @tel  需要判断的手机号码
 */
function isTel(tel) {
    var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;

    if (tel.length < 11 || !myreg.test(tel) || tel == "") {
        return false;
    } else {
        return true;
    }

}

/**
 *   处理上传图片，部分服务器安卓和苹果手机上传会出现%EF%BB%BF
 *   如果第一个字符不是2 进行截取
 */
function uploadImgUrl(url) {
    var s = url.substr(0, 1);
    var aaa = "";
    if (s == "2") {
        aaa = url;
    } else {
        aaa = url.substr(1);
    }

    return aaa;
}


/**
 * 判断是否登录
 * @未登录跳转到登录页面
 */
function checkLogin() {

    var userinfo = wx.getStorageSync('userinfo');
    var avatarurl = userinfo.avatarurl;

    console.log('验证登录')
    if (userinfo.avatarurl == '' || userinfo.avatarurl == null || userinfo.avatarurl == 'null') {

        return false;
    } else {
        return true;
    }
}


/**
 * 小于10的格式化函数
 */
function timeFormat(param) {
    return param < 10 ? '0' + param : param;
}

/**
 * 倒计时函数
 */
function countDown(actEndTimeList) {
    // 获取当前时间，同时得到活动结束时间数组
    let newTime = new Date().getTime();
    let endTimeList = actEndTimeList;
    let countDownArr = [];

    // 对结束时间进行处理渲染到页面
    endTimeList.forEach(o => {
        let endTime = new Date(o).getTime();
        let obj = null;
        // 如果活动未结束，对时间进行处理
        if (endTime - newTime > 0) {
            let time = (endTime - newTime) / 1000;
            // 获取天、时、分、秒
            let day = parseInt(time / (60 * 60 * 24));
            let hou = parseInt(time % (60 * 60 * 24) / 3600);
            let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
            let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
            obj = {
                day: this.timeFormat(day),
                hou: this.timeFormat(hou),
                min: this.timeFormat(min),
                sec: this.timeFormat(sec)
            }
        } else { //活动已结束，全部设置为'00'
            obj = {
                day: '00',
                hou: '00',
                min: '00',
                sec: '00'
            }
        }
        countDownArr.push(obj);
    })
    // 渲染，然后每隔一秒执行一次倒计时函数
    //this.setData({ countDownList: countDownArr })
    return countDownArr;
    //setTimeout(this.countDown, 1000);



    
}

//判断是否登录
function checkLogin(){
    var token=wx.getStorageSync('token')
    if(!token){
        wx.navigateTo({
          url: '/pages/webLogin/webLogin',
        })
        return false;
    }else{
        return true;
    }
}

// 初始化
module.exports = {
    formatTime: formatTime,
    nowTime: nowTime,
    checkState: checkState,
    moreClick: moreClick,
    isTel: isTel,
    nowTimeh: nowTimeh,
    checkLogin: checkLogin,
    uploadImgUrl: uploadImgUrl,
    timeFormat: timeFormat,
    countDown: countDown,
    checkLogin:checkLogin,
}