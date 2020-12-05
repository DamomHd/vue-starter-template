<!--
 * @Author: Damom
 * @Date: 2020-11-14 21:53:38
 * @LastEditors: Damom
 * @LastEditTime: 2020-12-05 11:34:36
 * @Description: file content
-->
<template>
  <div></div>
</template>

<script>
import { mapMutations, mapState } from "vuex"

export default {
    computed: {
        ...mapState({
            shareInfo: (state) => state.wxShare.info
        })
    },
    methods: {
        ...mapMutations("wxShare", ["resetShareInfo"])
    },
    created () {
        console.log(this.shareInfo)
    }
}
</script>

<style></style>
