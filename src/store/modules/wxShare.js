/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-11-13 10:12:27
 * @LastEditors: Damom
 * @LastEditTime: 2020-12-05 11:14:33
 * @description: 微信分享的相关信息
 */
import { wechatAuth } from 'Damom/wechatConfig.js'
const DEFAULTSHAREINFO = {
    title: '测试默认标题',
    link: 'http://www.baidu.com',
    desc: '测试默认副标题',
    imgUrl: 'http://www.baidu.com/logo'
}
export default {
    namespaced: true,
    state: {
    // +分享相关信息
    //   - title 必须 分享标题
    //   - link 分享链接
    //   - desc 分享描述
    //   - imgUrl 分享封面图片
        info: { ...DEFAULTSHAREINFO },
        entryUrl: location.href.split('#')[0] //第一次进入的url 作用于 history模式下IOS微信分享签名失败问题
    },
    getters: {
    /**
     * @description 返回现存 log (all) 的条数
     * @param {*} state vuex state
     */
    },
    actions: {
    /**
     * @description 修改分享信息
     * @param {String} param message {String} 信息
     * @param {String} param type {String} 类型
     * @param {Object} param meta {Object} 附带的信息
     */
    },
    mutations: {
    /**
     * @description 重置分享信息
     * @param {Object} state vuex state
     */
        resetShareInfo (state, info) {
            for (let key in info) {
                state['info'][key] = info[key]
            }
            //微信内获取签名
            if (
                navigator.userAgent.toLowerCase().match(/MicroMessenger/i) ==
        'micromessenger'
            ) {
                //获取分享签名
                wechatAuth()
            }
        }
    }
}
