/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-05 15:09:42
 * @LastEditors: Damom
 * @LastEditTime: 2020-12-05 11:57:07
 * @description: 个人常用API
 */

const Damom = {
    //获取某一天 前几天 后几天
    getDay: (day = 0) => {
        let today = new Date()
        let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day

        today.setTime(targetday_milliseconds) //注意，这行是关键代码

        let tYear = today.getFullYear()
        let tMonth = today.getMonth()
        let tDate = today.getDate()

        tMonth = doHandleMonth(tMonth + 1)
        tDate = doHandleMonth(tDate)

        function doHandleMonth (month) {
            let m = month
            if (month.toString().length == 1) {
                m = '0' + month
            }
            return m
        }
        return tYear + '/' + tMonth + '/' + tDate
    },

    urlToObj: url => {
        let string = url.split('&')
        let res = {}
        for (let i = 0; i < string.length; i++) {
            let str = string[i].split('=')
            if (str[0] != '') {
                res[str[0]] = str[1]
            }
        }
        return res
    },
    // 请求参数序列号
    formatParams: params => {
        let str = decodeURIComponent(params)
        let paras = {}
        str = str.split('&')
        for (let n in str) {
            let name = str[n].split('=')[0]
            let val = str[n].split('=')[1]
            paras[name] = val
        }
        return paras
    },
    //创建唯一标识，可以自定义生成字段长度
    createId: (length = 12) => {
        return Number(
            Math.random()
                .toString()
                .substr(3, length) + Date.now()
        ).toString(36)
    },
    //用户名打码
    nameCode: str => {
        return str.substr(0, 1) + '*'.repeat(str.length - 1)
    },
    //判断是否是数组
    isArray: arg => {
        return Array.isArray
            ? Array.isArray(arg)
            : Object.prototype.toString.call(arg) === '[object Array]'
    },
    //数组删除虚值
    filterVoid: arr => {
        return arr.filter(Boolean)
    },
    //求两个数组的交集
    intersectionArr: (arr1, arr2) => {
        return [...new Set(arr1)].filter(item => arr2.includes(item))
    },
    //求两个数组的并集
    joinArr: (arr1, arr2) => {
        return [...new Set([...arr1, ...arr2])]
    },
    //求两个数组的差集
    differenceArr: (arr1, arr2) => {
        return [
            ...arr1.filter(v => !new Set(arr2).has(v)),
            ...arr2.filter(v => !new Set(arr1).has(v))
        ]
    },
    //判断是否微信浏览器内
    isWeixin: () => {
        let ua = navigator.userAgent.toLowerCase()
        return ua.match(/MicroMessenger/i) == 'micromessenger'
    },
    copyUrl (text) {
        let Url2 = text
        let oInput = document.createElement('input')
        oInput.value = Url2
        document.body.appendChild(oInput)
        oInput.select() // 选择对象
        document.execCommand('Copy') // 执行浏览器复制命令
        oInput.className = 'oInput'
        oInput.style.display = 'none'
    }
}

export default Damom
