/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-11-05 17:20:42
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-11-05 17:24:49
 * @description: 设置postcss 移动端样式适配  VantUI使用的是37.5  需要区分设置 达到统一效果
 */
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
module.exports = ({ file }) => {
    let remUnit; // 判断条件 请自行调整 我使用的是 mand-mobile ui 没有对vant引入进行测试 
    if (file && file.dirname && file.dirname.indexOf("vant") > -1) {
        remUnit = 37.5;
    }
    else {
        remUnit = 75;
    }
    return {
        plugins: [
            autoprefixer(),
            pxtorem({
                rootValue: remUnit,
                propList: ['*']
            })
        ]
    };
};