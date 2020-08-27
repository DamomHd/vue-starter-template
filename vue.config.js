/*
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-02 11:46:02
 * @LastEditors: Damom
 * @LastEditTime: 2020-08-27 23:42:36
 * @description:
 */
var fs = require("fs")
// 拼接路径
// const resolve = dir => require("path").join(__dirname, dir)

const path = require("path")


function resolve (dir) {
  return path.join(__dirname, dir)
}
var spriteFilePath = path.resolve("./src/assets/images/sprites")
// JS压缩
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 用于开启gzip压缩的插件
const CompressionPlugin = require("compression-webpack-plugin")
// 引入雪碧图生成
const SpritesmithPlugin = require("webpack-spritesmith")
// 文件输出 npm install copy-webpack-plugin --save-dev
// const CopyPlugin = require('copy-webpack-plugin');
// Cli3 引入编译分析  添加包 vue add webpack-bundle-analyzer  执行 npm run build --report
const templateFunction = function (data) {
    const prefix = data.spritesheet.image.replace(/(.*\/)*([^.]+).*/gi, "$2")
    // 雪碧图原始宽高 px
    const { width, height } = data.spritesheet
    var shared = ".icon.icon-N { background-image: url(I) ;}"
        .replace("I", data.sprites[0].image)
        .replace("N", prefix)

    var perSprite = data.sprites
        .map(function (sprite) {
            return ".icon.icon-N { width: Wrem ; height: Hrem; background-position: Xrem Yrem;background-repeat: no-repeat;background-size: Erem Frem; }"
                .replace("N", sprite.name)
                .replace("W", (sprite.width + 4) / 75)
                .replace("H", (sprite.height + 4) / 75)
                .replace("X", (sprite.offset_x + 2) / 75)
                .replace("Y", (sprite.offset_y + 2) / 75)
                .replace("E", width / 75)
                .replace("F", height / 75)
        })
        .join("\n")

    return shared + "\n" + perSprite
}
// 雪碧图plugin
const spritePlugins = []
// 雪碧图来源文件夹
var spriteDirs = fs.readdirSync(spriteFilePath)
spriteDirs.forEach(filename => {
    spritePlugins.push(
        new SpritesmithPlugin({
            /*
                  目标小图标，这里就是你需要整合的小图片的老巢。
                  现在是一个个的散兵，把他们位置找到，合成一个
                  */
            src: {
                // 图片所在文件夹（无视子文件夹）
                cwd: path.resolve(__dirname, `./src/assets/images/sprites/${filename}`),
                // 匹配 png 文件，可以用glob语法，比如 '*.(png|jpg)' 这样；
                // 但png和jpg拼一起，有时候图片无法正常显示
                glob: "*.png"
            },
            // 输出雪碧图文件及样式文件
            target: {
                // 将其输出到 src/assets 目录下
                // 这个是打包前的目录，所以不要学某个教程将其输出到 dist 目录下
                image: path.resolve(__dirname, `./src/assets/images/${filename}.png`),
                // 可以是字符串、或者数组
                css: [
                    [
                        path.resolve(
                            __dirname,
                            `./src/assets/style/sprite/${filename}.css`
                        ),
                        {
                            format: "function_based_template"
                        }
                    ]
                ]
            },
            apiOptions: {
                generateSpriteName: function () {
                    // console.log(arguments)
                    var fileName = arguments[0]
                        .match(/[^\\]+$/)[0]
                        .replace(/\.[a-zA-Z]+/, "")
                    // console.log(fileName)
                    return fileName
                },
                // 简单来说，这个就是雪碧图的 css 文件怎么找到 雪碧图的 png 文件
                cssImageRef: `../images/${filename}.png`
            },
            customTemplates: {
                function_based_template: templateFunction
            },
            spritesmithOptions: {
                algorithm: "binary-tree",
                padding: 8
            }
        })
    )
})
const IS_PRODUCTION = process.env.NODE_ENV === 'production' 
// 增加环境变量
process.env.VUE_APP_VERSION = require("./package.json").version
process.env.VUE_APP_BUILD_TIME = require("dayjs")().format("YYYY-M-D HH:mm:ss")

// 基础路径 注意发布之前要先修改这里
// 开发绝对路径  线上相对路径
const publicPath = IS_PRODUCTION ? "/" : "/"
const cdnSource = [
    'https://cdn.bootcdn.net/ajax/libs/vue/2.6.10/vue.min.js',
    'https://cdn.bootcdn.net/ajax/libs/vue-router/3.0.6/vue-router.min.js',
    'https://cdn.bootcdn.net/ajax/libs/vuex/3.1.1/vuex.min.js',
    'https://cdn.bootcdn.net/ajax/libs/axios/0.19.0/axios.min.js'
]
module.exports = {
    publicPath,
    // outputDir: "pStatic", // 打包后的静态资源目录 默认dist
    // 关闭source map
    productionSourceMap: false,
    devServer: {
        publicPath, // 和 publicPath 保持一致
        open: "Google Chrome",
        hot: true,
        // host: "localhost",
        host: "0.0.0.0",

        overlay: {
            warnings: true, // 警告不影响server/build
            error: false // 页面上提示错误
        },
        // 端口
        // port: 9999,
        //配置路由信息
        // before:require('./src/mock')
        // before (router){
        //     router.get('/success',function (req,res){
        //         setTimeout(() => {
        //             res.json({errorCode:200,data:null})
        //         }, 3000)
        //     })
        //     router.post('/error',function (req,res){
        //         res.sendStatus({errorCode:500,data:null})
        //     })
        // }
        // productionSourceMap: false,
        // // 配置代理
        // proxy: process.env.VUE_APP_API
        proxy: {  
            '/api/': {  
                target: 'http://localhost:3002',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    // 配置对象 内部 通过webpack-merge合并对象
    configureWebpack: config => {
        // 配置gzip压缩
        const Plugins = []
        if (IS_PRODUCTION) {
            // 减少vendors体积过大问题
            Object.assign(config,{
                externals:{
                    vue:'Vue',
                    axios:'axios',
                    'vue-router':'VueRouter',
                    vuex:'Vuex'
                }
            })
            Plugins.push(
                new CompressionPlugin({
                    test: /\.js$|\.html$|\.css/, // 文件匹配名
                    threshold: 4096, // 对超过10K的数据进行压缩
                    deleteOriginalAssets: false // 是否删除原文件
                })
            )
        }
        config.plugins = [...config.plugins, ...Plugins, ...spritePlugins]
        
    },
    css: {
        loaderOptions: {
            // 设置 scss 公用变量文件
            // sass: {
            //     data: `
            //             @import '~@/assets/style/public.scss';
            //             @import "@nutui/nutui/dist/styles/index.scss";
            //             ` //nui如果需要按需加载 scss 文件（如需要自定义主题）时，除了需要把 style 选项值设为为 scss 外sass-loader 配置，如下所示：
            // }
            // 覆盖vant主题色
            less: {
                modifyVars: {
                    red: "#ea4452",
                    blue: "#007AFF",
                    orange: "#f08d49",
                    "text-color": "#111"
                }
            }
        }
    },
    // 利用webpack-chain 提供链式调用修改原有配置对象
    chainWebpack: config => {
        //设置路径别名
        config.resolve.alias
            .set('common',resolve('src/plugin/Damom/common'))
            .set('Damom',resolve('src/plugin/Damom'))
            .end()
        /**
         * 删除懒加载模块的 prefetch preload，降低带宽压力
         * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
         * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
         * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
         */
        config.plugins.delete("prefetch").delete("preload")
        // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
        config.resolve.symlinks(true)
        config.module
            .rule("images")
            .use("url-loader")
            .loader("url-loader")
            .tap(options => Object.assign(options, { limit: 10240 }))
        config
            // 开发环境
            .when(
                !IS_PRODUCTION,
                // sourcemap不包含列信息
                config => config.devtool("cheap-source-map")
            )
            // 生产环境
            .when(IS_PRODUCTION, config => {

                 // 配置生成的index.html生成的标签自带引号
                // 编译之后的index.html没有引号是缺省设置，是由HtmlWebpackPlugin中的minify设置的，这是一个标准设置，它的作用就是去除所有html中的注释、回车换行、引号等等；
                config.plugin("html").tap(args => {
                    args[0].minify = false
                    args[0].xhtml = true // 是否渲染link为自闭合的标签，true则为自闭合标签
                    args[0].cdn = {
                        js:cdnSource
                    }
                    return args
                })
                config.optimization.minimizer("terser").tap(args => {
                    // 去除生产环境console
                    args[0].terserOptions.compress.drop_console = false
                    return args
                })
            })

       
    },
    // 配置公共样式 全局可访问 https://www.npmjs.com/package/style-resources-loader
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "less",
            patterns: [path.resolve(__dirname, "./src/assets/style/public.less")]
        },
        // 打包分析配置
        webpackBundleAnalyzer: {
            openAnalyzer: false
        }
    }
}
