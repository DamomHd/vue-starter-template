<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-12-23 15:51:32
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2020-07-29 13:22:34
 * @description: 
 -->
<template>
  <div class="container">
    <div class="error-item col col-center"></div>
    <p class="error-title"> 加载失败，请<a href="javascript:void(0)" class="error-link" @click="refresh">刷新重试</a></p>
  </div>
</template>
<script>
export default {
  props: {},
  data () {
    return {
      route: "",
      fromUrl: ""
    }
  },
  components: {},
  methods: {
    refresh () {
      // let { route, fromUrl } = this
    //   if (route) {
    //     route = JSON.parse(decodeURIComponent(route))
    //     this.$router.replace({ path: route.path, query: route.query })
    //   } else if (fromUrl) {
    //     location.replace(fromUrl)
    //   } else {
    //     location.replace("/shop")
    //   }
    }
  },
  created () {
    this.route = this.$route.query.route || ""
    this.fromUrl = this.$route.query.fromUrl || ""
  }
}
</script>
<style scoped lang='less'>
.error-item {
  width: 750px;
  margin-top: 200px;
  height: 240px;
  background: transparent url("../../assets/images/product/detail_error.png")
    center/contain no-repeat;
}
.error-title {
  font-size: 30px;
  font-weight: bold;
  margin-top: 30px;
  color: #999999;
}
.error-link {
  color: @themeColor;
}
</style>