<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2020-07-15 10:35:05
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2020-07-15 16:55:10
 * @description: 
--> 
<template>
    <div class="content">
        <div>
            <p>props</p>
            <p>我是子组件，接受到：{{info}}</p>
            <button @click="$emit('changeProps','props的值被我改变了')">我要改变父组件props的值</button>
            <p>$children</p>
            <p>$children值：{{children}}</p>
            <p>$parent</p>
            <p>$parent从父组件中获取的值：{{parentVal}}</p>
            <p>provide/ inject</p>
            <p>我从祖先组件中拿到的provide的某个字段值:{{newProvide}}</p>
            <p>祖先组件的所有往下传递属性为{{$attrs}}</p>
            <v-c v-bind="$attrs"></v-c>
        </div>
    </div>
</template>
<script>
import c from './c'
export default {
    props: ['info'],
    inject: ['pro'],
    data () {
        return {
            children: '我是子组件B',
            newProvide: this.pro
        }
    },
    components: { 'v-c': c },
    mounted () {
        console.log(this.pro)
    },
    computed: {
        parentVal () {
            return this.$parent.parent
        }
    },
    methods: {},
    created () {}
}
</script>
<style lang="scss" scoped>
.content {
    background: yellowgreen;
}
</style>
