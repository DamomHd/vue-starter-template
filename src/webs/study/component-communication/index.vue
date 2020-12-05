<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-11 15:38:46
 * @LastEditors: Damom
 * @LastEditTime: 2020-12-05 11:17:39
 * @description: 
 -->
<template>
  <div class="content">
    <p>我是父组件A</p>
    <p v-once>第一种props:{{ info }}</p>
    <p v-once>第二种$children / $parent:{{ info }}</p>
    <p>我的parent值是：{{ parent }}</p>
    <button @click="changeB">点击改变子组件的值</button>
    <p v-once>第三种provide/ inject:{{ newPro }}</p>
    <p>我提供给子孙组件的provide值是：{{ newPro }}</p>
    <p v-once>第四种$attrs $listeners</p>
    <v-b
      :info="info"
      @changeProps="changeProps"
      :cardData="hasData ? data : {}"
      title="我是A组件的title字段"
    ></v-b>
    <button @click="change">改变传入的数据对象</button>
  </div>
</template>
<script>
import b from './b.vue'
/**
 * 1.props传递参数 &emit子给父传递参数
 * 2.$children / $parent
 * 3.provide/ inject provide/ inject 是vue2.2.0新增的api, 简单来说就是父组件中通过provide来提供变量, 然后再子组件中通过reject来注入变量
 * 4.ref / refs
 * 5.eventBus 创建一个总线js export const EventBus = new Vue()
 */

import { test, mockTest } from '@/api/login'
export default {
    provide () {
        return {
            pro: this.newPro
        }
    },

    data () {
        return {
            info: '我是A组件要传递的props参数',
            parent: '我是A组件的值，我要在b子组件中直接获取到',
            newPro: '我是A组件的provide值',
            data: {
                name: '1',
                data: 1
            },
            hasData: false
        }
    },
    components: {
        'v-b': b
    },
    methods: {
        changeProps (val) {
            this.info = val
        },
        changeB () {
            this.$children[0].children = '我是改变后的children值哈哈哈'
        },
        async testInit () {
            let res = await test()
            console.log(res)
        },
        async init () {
            //
            let res = await mockTest()
            console.log(res)
        },
        change () {
            this.hasData = !this.hasData
        }
    },
    created () {
        this.init()
    }
}
</script>
<style scoped lang="less">
.content {
  font-size: 30px;
  // background: @themeColor;
  padding: 10px;
  box-sizing: border-box;
}
</style>
