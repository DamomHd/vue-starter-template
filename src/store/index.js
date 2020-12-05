import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    namespaced: true
})
/**
 * require.context 接受三个参数
 * @param {directory} 读取文件路径
 * @param {useSubdirectories} Boolean 是否遍历文件子目录
 * @param {RegExp} 匹配文件正则
 */
const storeContext = require.context('@/store/modules', true, /\.js$/)
storeContext.keys().forEach(modules => {
    store.registerModule(
        modules.replace(/(^\.\/)|(\.js$)/g, ''),
        storeContext(modules).default
    )
})
export default store
