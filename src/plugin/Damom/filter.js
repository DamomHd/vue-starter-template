/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-03 16:35:48
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-05 17:43:08
 * @description: 全局过滤器
 */

export default {
    // 日期格式化插件
    format: (value, format = 'YYYY-MM-DD HH:mm:ss') => {
        return require('dayjs')(value).format(format)
    },
    roundPrice: value => {
        return Math.round(value * 100) / 100
    },
    //显示保留两位小数
    moneyTwo: value => {
        return Number(value).toFixed(2)
    },
    //保留整数
    moneyInt: value => {
        return parseInt(Number(value))
    },
    //保留显示两位小数
    moneyFloat: value => {
        return Number(value).toFixed(2).split('.')[1]
    },
    //去空格
    trim: (str, type = 'ALL') => {
        let MAP = {
            ALL: /\s+/g, //全部空格
            LEFT: /^\s*/, //左侧空格
            RIGHT: /(\s*$)/g, //右侧空格
            BETWEEN: /^\s+|\s+$/g //两侧空格
        }
        return str.replace(MAP[type], "")
    },
    //判断当前时间是否在某个时间段内
    compareTime: (stime, etime) => {
        // 转换时间格式，并转换为时间戳
        function tranDate (time) {
            return new Date(time.replace(/-/g, '/')).getTime()
        }
        // 开始时间
        let startTime = tranDate(stime)
        // 结束时间
        let endTime = tranDate(etime)
        let thisDate = new Date()
        // 获取当前时间，格式为 2018-9-10 20:08
        let currentTime = thisDate.getFullYear() + '-' + (thisDate.getMonth() + 1) + '-' + thisDate.getDate() + ' ' + thisDate.getHours() + ':' + thisDate.getMinutes()
        let nowTime = tranDate(currentTime)
        // 如果当前时间处于时间段内，返回true，否则返回false
        if (nowTime < startTime || nowTime > endTime) {
            return false
        }
        return true
    },
    //用户名打码
    nameCode: (str) => {
        return str.substr(0, 1) + '*'.repeat(str.length - 1)
    },
    toNumber: (str) => {
        return Number(str)
    }
}
