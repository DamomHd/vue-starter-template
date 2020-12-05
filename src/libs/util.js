/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-03 16:26:29
 * @LastEditors: Damom
 * @LastEditTime: 2020-08-19 22:30:17
 * @description:
 */
import cookies from './util.cookies'
import { Toast, Dialog } from 'vant'
import { isIos } from 'common/ua'
import log from './util.log'
const util = {
    log,
    cookies
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
    // const processTitle = process.env.VUE_APP_TITLE || 'Vincent'
    // window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
    //设置页面title  SPA设置无效问题
    if (isIos) {
    //利用iframe的onload事件刷新页面
        setTimeout(() => {
            window.document.title = titleText
            let iframe = document.createElement('iframe')
            iframe.style.visibility = 'hidden'
            iframe.style.width = '1px'
            iframe.style.height = '1px'
            iframe.onload = function () {
                setTimeout(function () {
                    document.body.removeChild(iframe)
                }, 0)
            }
            document.body.appendChild(iframe)
        }, 0)
    } else {
        window.document.title = titleText
    }
}

util.toast = function (options) {
    Toast(options)
}

util.loginConfirm = function () {
    Dialog.confirm({
        message: '您当前尚未登录，是否先前往登录？',
        width: '270px',
        messageAlign: 'center',
        className: 'vc-vant-confirm-modal',
        confirmButtonText: '前往登录'
    })
        .then(() => {
            //前往登录
            window.location.href =
        '/page/login?fromUrl=' + encodeURIComponent(location.href)
            // on confirm
        })
        .catch(() => {
            // on cancel
        })
}

export default util
