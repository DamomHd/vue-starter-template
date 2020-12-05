/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-03 15:31:50
 * @LastEditors: Damom
 * @LastEditTime: 2020-12-05 10:44:29
 * @description:
 */

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)
const frame = [
    {
        path: '/',
        redirect: '/study'
    },
    {
        path: '/test',
        name: 'test',
        meta: {
            auth: true,
            allowShare: false,
            title: ''
        },
        component: _import('test/index.vue')
    },
    {
        path: '/error',
        name: 'error',
        meta: {
            auth: true,
            allowShare: false,
            title: ''
        },
        component: _import('error/index.vue')
    },
    {
        path: '*',
        redirect: '/error'
    },
    {
        path: '/study',
        name: 'study',
        meta: {
            auth: true,
            title: '组件传参学习'
        },
        component: _import('study/component-communication/index')
    }
]
export default [...frame]
