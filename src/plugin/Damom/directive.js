/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2020-01-08 10:41:00
 * @LastEditors  : vincent_Huanghd@126.com
 * @LastEditTime : 2020-01-08 16:00:51
 * @description:
 */
export default {
    install (Vue) {
    //主要用于埋点  绑定在触发元素上 通过绑定v-points="{act:'触发条件',apiUrl:'触发埋点统计Url'}"
        Vue.directive('points', {
            sendStat (val) {
                console.log(val)
            },
            bind: function (el, binding, vnode) {
                // 准备工作
                console.log(el)
                console.log(vnode)
                //判断是否绑定了指令
                if (binding.expression) {
                    let directiveObj = binding.value
                    let { act, apiUrl } = directiveObj
                    //判断行为是否为click
                    if (act === 'click') {
                        let clickHandler = e => {
                            // 这里判断点击的元素是否是本身
                            if (el.contains(e.target)) {
                                //包含请求地址 通过生成图片地址完成统计 不影响业务执行
                                if (apiUrl) {
                                    let image = new Image()
                                    image.src = apiUrl
                                }
                            }
                        }
                        el.__vueClickInside__ = clickHandler
                        document.addEventListener('click', clickHandler)
                    }
                }
            },
            update: function (newValue, oldValue) {
                console.log(newValue, oldValue)
                // 值更新时的工作
                // 也会以初始值为参数调用一次, 此时可以根据传值类型来进行相应埋点行为的请求处理
            },
            unbind: function (el, binding) {
                // 清理工作
                if (binding.expression) {
                    let directiveObj = binding.value
                    let { act } = directiveObj
                    if (act === 'click') {
                        // 解除事件监听
                        document.removeEventListener('click', el.__vueClickInside__)
                        delete el.__vueClickInside__
                    }
                }
            }
        })
    }
}
