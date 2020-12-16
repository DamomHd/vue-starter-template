/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-03 15:26:18
 * @LastEditors: Damom
 * @LastEditTime: 2020-12-05 18:03:54
 * @description:
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import util from '@/libs/util.js'
// import { wechatAuth } from "@/plugin/Vincent/wechatConfig.js"
Vue.use(VueRouter)
// 路由数据
import routes from './routes'
const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes
})

/**
 * 路由拦截
 * 权限验证
 */
// router.beforeEach((to, from, next) => {
//     console.log(to)
//     console.log(from)
//     next();
// })

router.afterEach(to => {
    // 更改标题
    util.title(to.meta.title)
    //允许分享 设置分享信息
    //初始化设置一次分享信息
    if (!to.meta.allowShare) {
    // wechatAuth()
    }
})
export default router
