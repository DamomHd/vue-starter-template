/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-02 11:46:02
 * @LastEditors: Damom
 * @LastEditTime: 2020-12-05 14:57:27
 * @description:
 */
module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    env:{
        development: {
            plugins: ['dynamic-import-node'] //按需热更新
        }
    },
    // 按需导入组件配置 npm i @nutui/babel-plugin-separate-import -D
    // "plugins": [
    //   ["@nutui/babel-plugin-separate-import", {
    //     "style": "scss" //style 选项值为 "css" 时加载组件对应的css文件，为 "scss" 时加载对应的scss文件。无style选项时，不自动加载样式文件。
    //   }]
    // ]
    // vant按需导入
    plugins: [
        [
            'import',
            {
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: name => `${name}/style/less`
            },
            'vant'
        ]
    ]
}
