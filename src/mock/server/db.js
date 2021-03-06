/*
 * @Author: Damom
 * @Date: 2020-08-20 22:34:48
 * @LastEditors: Damom
 * @LastEditTime: 2020-12-05 17:16:04
 * @Description: file content
 */
let Mock = require('mockjs')

module.exports = {
    getList: Mock.mock({
        errorCode: 200,
        'data|1-10': [
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
    }),
    addList: Mock.mock({
        errorCode: 200,
        moreInfo: 'success',
        data: []
    })
}
