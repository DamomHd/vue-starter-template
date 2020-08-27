/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-05 15:09:42
 * @LastEditors: Damom
 * @LastEditTime: 2020-08-19 22:27:43
 * @description: 个人常用API
 */

const Damom = {
    //判断字符串的类型
    checkStrType: ({ text = '', type = '', isNeedMsg = false } = {}) => {
        let res = {
            state: false,
            msg: ''
        }
        let validatePatterns = {
            "required": [/^[\S+\s*\S+]+$/ig, "不能为空！"],
            "integer": [/^(0|[1-9][0-9]*)$/, "必须为整数！"],
            "numeric": [/^\d+(\.\d+)?$/, "不是合法的数字！"],
            "currency": [/^\d+\.\d{1,2}$/, "不是合法的货币数字！"],
            "email": [/^\w+@\w+(\.\w+)*$/, "不合法的email输入！"],
            "phone": [/^1[3|4|5|6|7|8|9][0-9]{9}$/, "手机号格式不正确"],
            "tel": [/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/, "电话不合法！"],
            "password": [/^(\w){6,20}$/, '密码格式只能输入6-20个字母、数字、下划线'],
            "mustChecked": [/0+/g, "checkbox不能为空！"],
            "mustSelected": [/0+/g, "select不能为空！"],
            "ipAddress": [/^([1-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/, "不是有效的IP地址！"],
            "netport": [/^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, "不合法的端口！"],
            "mac": [/^[0-9,a-f,A-F]{2}[-][0-9,a-f,A-F]{2}[-][0-9,a-f,A-F]{2}[-][0-9,a-f,A-F]{2}[-][0-9,a-f,A-F]{2}[-][0-9,a-f,A-F]{2}$/, "不合法的mac地址！"],
            "year": [/^(\d{4})$/, "年份不合法！"],
            "mouth": [/^(\d{4})-(0\d{1}|1[0-2])$/, "月份不合法！"],
            "date": [/^{\d}{4}\-{\d}{2}\-{\d}{2}$/, "日期不合法！"],
            "timeHour": [/^(0\d{1}|1\d{1}|2[0-3])$/, "小时不合法！"],  //HH
            "timeMinute": [/^(0\d{1}|1\d{1}|2[0-3]):([0-5]\d{1})$/, "分钟不合法！"], //HH:mm
            "timeSeconds": [/^(0\d{1}|1\d{1}|2[0-3]):[0-5]\d{1}:([0-5]\d{1})$/, "时间不合法！"], //HH:mm:ss
            "chineseOnly": [/[^\u4E00-\u9FA5]/g, "输入不合法！请只输入中文！"],
            "mobilePhone": [/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/, "手机号不合法！"],
            "specials": [/^[^`~!@#$%^&*()+=|\\\][\]\{\}:;'\,.<>?]{1}[^`~!@$%^&+=\\\][\{\}:;'\,<>?]{0,}$/, "不能输入特殊字符！"],
            "pattern": [null, "数据不合法！请确认"],
            "carCode": [/^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/, "车牌号格式不正确"],
            "idCard": [/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, "身份证号格式不正确"],
            'postcode': [/^\d{6}$/, "邮编格式不正确"],
            'longitude': [/^-?((180(\.0{0,6})?)|((\d{1,2}|1[0-7]\d)(\.\d{0,6})?))$/, "不是有效的经度！"],
            'latitude': [/^-?((90(\.0{0,6})?)|((\d|[1-8]\d)(\.\d{0,6})?))$/, "不是有效的纬度！"],
            'digitOrLetter': [/^[A-Za-z0-9]*$/, "格式不正确(只支持数字或字母)"]
        }
        if (!type || !validatePatterns.hasOwnProperty(type)) {
            res.msg = "暂无该方式的正则判断，请自行判断"
            res.state = false
            return res
        }
        res.state = validatePatterns[type][0].test(text)
        res.msg = validatePatterns[type][1]
        return res
    },
    //获取某一天 前几天 后几天
    getDay: (day = 0) => {
        var today = new Date()
        var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day

        today.setTime(targetday_milliseconds) //注意，这行是关键代码

        var tYear = today.getFullYear()
        var tMonth = today.getMonth()
        var tDate = today.getDate()

        tMonth = doHandleMonth(tMonth + 1)
        tDate = doHandleMonth(tDate)

        function doHandleMonth (month) {
            var m = month
            if (month.toString().length == 1) {
                m = "0" + month
            }
            return m
        }
        return tYear + "/" + tMonth + "/" + tDate
    },
    urlParams: {
        get: (key, href) => {
            href = href || window.location.search
            var match = href.match(new RegExp('[?&]' + key + '=([^&]*)'))
            return match && match[1] && decodeURIComponent(match[1]) || ''
        },
        getAll: (names = [], url) => {
            if (!(names instanceof Array)) return false
            var result = {}
            var i = 0,
                len = names.length
            if (names.length === 0) return false
            for (; i < len; i++) {
                result[names[i]] = this.get(names[i], url)
            }
            return result
        },
        set: (name, url) => {
            if (typeof name !== 'string') return false
            if (!url) url = window.location.href
            var _name = name.replace(/[\[\]]/g, '\\$&')
            var value = name + '=' + encodeURIComponent(val)
            var regex = new RegExp(_name + '=[^&]*')
            var urlArr = url.split('#')
            var result = ''

            if (regex.exec(url)) {
                result = url.replace(regex, value)
            } else {
                result = urlArr[0] + '&' + value + (urlArr[1] || '')
            }

            return result
        },
        setMore: (obj = {}, url) => {
            var result = url || ''
            if (Object.prototype.toString.call(obj) !== '[object Object]') return false
            for (var name in obj) {
                result = setParam(name, obj[name], result)
            }
            return result
        },
        remove: (name, url) => {
            if (typeof name !== 'string') return false
            if (!url) url = window.location.href
            var urlparts = url.split('?')
            var prefix = encodeURIComponent(name + '=')
            var pars = urlparts[1].split(/[&;]/g)
            var i = 0, len = pars.length

            for (; i < len; i++) {
                if (encodeURIComponent(pars[i]).lastIndexOf(prefix, 0) !== -1) {
                    pars.splice(i, 1)
                }
            }
            url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '')
            return url
        },
        reomveMore: (names = [], url) => {
            var result = url || ''
            var i = 0,
                len = names.length
            if (names.length === 0) return false

            for (; i < len; i++) {
                result = this.remove(names[i], result)
            }
            return result
        }
    },
    objToUrl: obj => {
        let arr = []
        for (let i in obj) {
            let hasKey = obj.hasOwnProperty(i)
            if (hasKey) {
                arr.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]))
            }
        }
        return arr.join("&")
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
    formatParams: (params) => {
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
        return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
    },
    //用户名打码
    nameCode: (str) => {
        return str.substr(0, 1) + '*'.repeat(str.length - 1)
    },
    //判断是否是数组
    isArray: (arg) => {
        return Array.isArray ? Array.isArray(arg) : Object.prototype.toString.call(arg) === '[object Array]'
    },
    //数组删除虚值
    filterVoid: (arr) => {
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
        return [...arr1.filter(v => !new Set(arr2).has(v)), ...arr2.filter(v => !new Set(
            arr1)
            .has(v))]
    },
    //判断是否微信浏览器内
    isWeixin: () => {
        var ua = navigator.userAgent.toLowerCase()
        return ua.match(/MicroMessenger/i) == "micromessenger"
    },
    copyUrl (text) {
        var Url2 = text
        var oInput = document.createElement('input')
        oInput.value = Url2
        document.body.appendChild(oInput)
        oInput.select() // 选择对象
        document.execCommand("Copy") // 执行浏览器复制命令
        oInput.className = 'oInput'
        oInput.style.display = 'none'
    }
}

export default Damom