<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-02 11:46:02
 * @LastEditors: Damom
 * @LastEditTime: 2020-12-05 18:20:11
 * @description: 
 -->
- Vue-cli4
- Vue-router
- Vuex
- 多环境变量
- rem适配 px自动转rem
- Vant按需加载
- Less、Sass全局样式
- 配置cz git提交基于angular规范校验
- webpack根据特定文件夹自动生成雪碧图
- Axios全局拦截、支持防止多次重复请求
- 请求接口管理
- 配置打包分析
- 配置externals引用cdn资源
- 配置alias别名
- 去除console.log
- Eslint
- 支持mock服务，实时热更新
- splitChunks提取公共模块

# test

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).



【前端公虾米】

# 解决移动端300ms延迟
cnpm install fastclick -S   
在main.js中引入fastClick和初始化:
```
import FastClick from 'fastclick'; // 引入插件
FastClick.attach(document.body); // 使用 fastclick
```
Gitmoji Commit 演示

# 解决cli3 热更新慢
npm install babel-plugin-dynamic-import-node --save-dev

在.babelrc添加
```json
{
    "env": {
        "development": {
            "plugins": [
                "dynamic-import-node"
            ]
        }
    }
}

```

# terser-webpack-plugin替代uglifyjs-webpack-plugin

因为uglifyjs不支持es6语法

yarn add terser-webpack-plugin -D


# mock 模拟数据服务接入

## json-server 搭配 mock.js
npm install json-server mockjs --save

## mock改动自动热更新
npm install gulp gulp-nodemon browser-sync --save


## 使用Angular提交规范 构建提交校验规范
使用git cz使用