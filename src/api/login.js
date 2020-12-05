/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-15 11:16:53
 * @LastEditors: Damom
 * @LastEditTime: 2020-12-05 11:36:04
 * @description:
 */

import request from '@/plugin/axios'

/**
 * @description: 登录接口
 * @param {type}
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime:
 * @return:
 * @Date: 2019-07-17 11:15:16
 */
export function GetUserInfo (data) {
    return request({
        url: '/v2/openapi/user/loginForSmallProgram',
        method: 'post',
        data
    })
}
/**
 * @description: 获取微信分享签名
 * @param {type}
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime:
 * @return:
 * @Date: 2019-07-17 11:15:16
 */
export function getJsapiSignature (data) {
    return request({
        url: '/wechat/getJsapiSignature',
        method: 'get',
        data
    })
}

//通过webpack简单生成的mock服务
export function test (data) {
    return request({
        url: '/getList',
        method: 'get',
        loading: true,
        data
    })
}
/**
 * @description: 通过gulo mock搭建的服务
 * @param {type} params
 * @return {type}
 */
export function mockTest (data) {
    return request({
        url: '/api/getTestList',
        method: 'get',
        loading: true,
        data
    })
}
