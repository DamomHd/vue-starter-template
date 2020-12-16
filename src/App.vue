<!--
 * @Author: Damom
 * @Date: 2020-08-27 23:54:47
 * @LastEditors: Damom
 * @LastEditTime: 2020-12-16 21:06:31
 * @Description: file content
-->

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
    name: 'App',
    data () {
        return {}
    },
    computed: {},
    mounted () {},
    created () {
        document.body.addEventListener('touchstart', () => {}) // 移动端追加active效果
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    box-sizing: border-box;
    text-align: center;
    color: #2c3e50;
    box-sizing: border-box;
    font-size: 24px;
    height: 100%;
}

</style>
