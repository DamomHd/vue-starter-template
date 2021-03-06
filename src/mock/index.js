/*
 * @Author: Damom
 * @Date: 2020-08-19 22:45:29
 * @LastEditors: Damom
 * @LastEditTime: 2020-08-30 10:39:31
 * @Description: file content
 */
const Mock = require('mockjs')
const util = require('./util')

module.exports = function (app) {
    /**
   * @description: 数据模板占位符
   * @param {type} params
   * @return {type}
   */
    let Random = Mock.Random

    // mock延迟配置
    Mock.setup({
    // timeout:'200-600',//配置响应时间 - 为区间
        timeout: 400
    })
    //扩展 星座
    Random.extend({
        constellation: function () {
            let constellations = [
                '白羊座',
                '金牛座',
                '双子座',
                '巨蟹座',
                '狮子座',
                '处女座',
                '天秤座',
                '天蝎座',
                '射手座',
                '摩羯座',
                '水瓶座',
                '双鱼座'
            ]
            return this.pick(constellations)
        }
    })

    Random.constellation()
    // Mock.mock('@CONSTELLATION')
    //监听http请求
    app.get('/testGet', function (rep, res) {
        let json = util.getJsonFile('./json/test.json')

        res.json(Mock.mock(json))
    })

    app.post('/testPost', function (rep, res) {
        let json = util.getJsonFile('./json/test.json')

        res.json(Mock.mock(json))
    })

    app.get('/getList', function (rep, res) {
        let mockData = Mock.mock({
            errorCode: 0,
            'list|1-10': [
                {
                    'id|+1': 1,
                    userid: '@id()',
                    username: '@cname()',
                    date: '@date()',
                    avatar: "@image('200x200','red','#fff','avatar')",
                    description: '@paragraph()',
                    ip: '@ip()',
                    email: '@email()',
                    color: '@Color()',
                    constellation: '@CONSTELLATION'
                }
            ],
            moreInfo: 'test'
        })
        res.json(mockData)
    })
}
