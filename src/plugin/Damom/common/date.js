/*
 * @Author: Damom
 * @Date: 2020-07-31 16:06:09
 * @LastEditors: Damom
 * @LastEditTime: 2020-08-19 22:26:17
 * @Description: file content
 */

//日期格式化
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds()
        // 毫秒
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
            .substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
                : (("00" + o[k]).substr(("" + o[k]).length)))
        }
    }
    return fmt
}

//获取前N个月的日期
export function getPreMonth (n) {
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var newYear = '', newMonth = ''
    newMonth = ((month - n < 1) ? (12 - n) : (month - n))
    newYear = (month - n < 1) ? year - 1 : year
    return `${newYear}年${newMonth.length == 2 ? newMonth : '0' + newMonth}月`
}

//获取日期 前几天 后几天 
export function getDay (day) {
    var today = new Date()
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
    today.setTime(targetday_milliseconds) //注意，这行是关键代码
    var tYear = today.getFullYear()
    var tMonth = today.getMonth()
    var tDate = today.getDate()
    tMonth = doHandleMonth(tMonth + 1)
    tDate = doHandleMonth(tDate)
    return tYear + "年" + tMonth + "月" + tDate + '日'
}
function doHandleMonth (month) {
    var m = month
    if (month.toString().length == 1) {
        m = "0" + month
    }
    return m
}

//获取指定日期的当周 周一 和周日 日期
export function getWeekArea (date) {
    if (!(date instanceof Date)) {
        date = new Date()
    }
    var day = date.getDay(), _date = date.getDate(),
        mondy = _date - (day == 0 ? 7 : day) + 1,
        t1 = new Date(date.getTime()),
        t2 = new Date(date.getTime())
    t1.setDate(mondy)
    t2.setDate(mondy + 6)
    return { mondy: t1, sundy: t2 }
}