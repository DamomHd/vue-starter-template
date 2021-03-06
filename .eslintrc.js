/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2020-04-24 09:53:10
 * @LastEditors: Damom
 * @LastEditTime: 2020-12-16 21:20:58
 * @description:
 */
module.exports = {
    root: true,

    env: {
        browser: true,
        node: true,
        es6: true
    },


    extends: ['plugin:vue/essential', 'eslint:recommended'],
    plugins: [
        'vue'
    ],
    globals: {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },

    rules: {
        "prettier/prettier": "error",
        "no-var": 2,
        "no-invalid-regexp": "off",//关闭正则校验
        "no-mixed-spaces-and-tabs": 2, // 禁止空格和 tab 的混合缩进
        /**
         * 禁止将 async 函数做为 new Promise 的回调函数
         * @category Possible Errors
         * @reason 出现这种情况时，一般不需要使用 new Promise 实现异步了
         */
        'no-async-promise-executor': 'off',
        /**
         * 禁止出现空代码块，允许 catch 为空代码块
         * @category Possible Errors
         */
        'no-empty': [
            'error',
            {
                allowEmptyCatch: true
            }
        ],
        'indent': ['error', 4],//缩进
        'no-console':process.env.NODE_ENV === 'production'?'off':'off',
        'no-debugger':process.env.NODE_ENV === 'production'?'error':'off',
        'no-multiple-empty-lines':0,
        'linebreak-style': ['error', 'windows'],
        'comma-dangle': ['error', 'never'], // 修正 eslint-plugin-vue 带来的问题
        "space-before-function-paren": 1,
        "no-duplicate-imports": 1,
        // 代码后不使用分号
        semi: ['error', 'never'],
         // 一行最多几个属性
        'vue/max-attributes-per-line': [
            'error',
            {
            singleline: 5,
            multiline: {
                max: 1,
                allowFirstLine: false
            }
            }
        ],
    },
    parserOptions: {
        sourceType: "module",
        parser: "babel-eslint", //解决vue import异步导入报错问题
    },
    parser: "vue-eslint-parser"
};
