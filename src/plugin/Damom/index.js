/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-03 15:10:37
 * @LastEditors: Damom
 * @LastEditTime: 2020-08-19 22:29:31
 * @description:
 */

//实现pxtorem自适应
import 'amfe-flexible'
//解除各端css差异
import 'reset-css'
//引入字体图标
import 'font-awesome/css/font-awesome.min.css'
//导入全局过滤器
import filters from 'Damom/filter'
import directive from 'Damom/directive'
//引入弹性布局
import '@/assets/style/flex.css'

// 组件
import '@/components'
import {
    PullRefresh,
    Popup,
    ImagePreview,
    Dialog,
    Lazyload,
    Button
} from 'vant'
import util from '@/libs/util'
import lazyloadImg from '@/assets/images/lazyload.png'
import lazyloading from '@/assets/images/loading.gif'
import FastClick from 'fastclick' // 引入插件
FastClick.attach(document.body) // 使用 fastclick   需要禁用则添加class= 'needsclick'

export default {
    install (Vue) {
    // 设置为 false 以阻止 vue 在启动时生成生产提示
    // https://cn.vuejs.org/v2/api/#productionTip
        Vue.config.productionTip = false
        // 当前环境
        Vue.prototype.$env = process.env.NODE_ENV
        // 当前的 baseUrl
        Vue.prototype.$baseUrl = process.env.BASE_URL
        // 当前版本
        Vue.prototype.$version = process.env.VUE_APP_VERSION
        // 构建时间
        Vue.prototype.$buildTime = process.env.VUE_APP_BUILD_TIME
        // 当前环境是否来源于 APP
        Vue.prototype.$isFromApp =
      navigator.userAgent.indexOf('healthsource-b2b-app') != -1

        //全局过滤器
        Object.keys(filters).forEach(key => {
            Vue.filter(key, filters[key])
        })
        //指令注册
        Vue.use(directive)
        Vue.prototype.$toast = util.toast
        //未登录前的登录提醒
        Vue.prototype.$goLogin = util.loginConfirm
        //用户默认头像
        Vue.prototype.$avatar = 'http://hdhuang.top/img/official.jpg'
        Vue.use(PullRefresh)
            .use(Popup)
            .use(ImagePreview)
            .use(Dialog)
            .use(Button)
        //懒加载
        Vue.use(Lazyload, {
            lazyComponent: true,
            attempt: 1,
            preLoad: 0.5,
            loading: lazyloading,
            error: lazyloadImg
        })
    }
}
