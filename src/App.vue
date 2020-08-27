<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2020-07-15 10:35:05
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2020-07-15 17:13:54
 * @description:
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
  }}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}
img {
  object-fit: contain;
}
</style>
