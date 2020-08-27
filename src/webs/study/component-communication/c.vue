<template>
  <div class="content">
    <p>我从祖先组件中拿到的provide的pro值:{{pro}}</p>
    <p>祖先组件传给我的值：{{title}}</p>
  </div>
</template>
<script>
export default {
  props: ["title"],
  inject: ["pro"],
  data () {
    return {}
  },
  components: {},
  methods: {},
  created () {}
}
</script>
<style lang="scss" scoped>
.content {
  background: red !important;
}
</style>
