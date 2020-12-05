/*
 * @Author: Damom
 * @Date: 2020-08-27 23:54:47
 * @LastEditors: Damom
 * @LastEditTime: 2020-11-14 21:58:37
 * @Description: file content
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
// store
import store from '@/store/index'
// 个性化插件
import Vincent from 'Damom/index'
import mixins from './mainxins'
//开发环境开启日志打印
if (process.env.NODE_ENV === 'development') {
    const VConsole = require('vconsole')
    new VConsole()
}
Vue.use(Vincent)
Vue.mixin(mixins)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
