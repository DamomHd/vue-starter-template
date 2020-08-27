/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */
/**
 *  require.context函数接受三个参数
    directory {String} -读取文件的路径
    useSubdirectories {Boolean} -是否遍历文件的子目录
    regExp {RegExp} -匹配文件的正则
 */
const files = require.context('./modules', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
    modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default {
    namespaced: true,
    modules
}
