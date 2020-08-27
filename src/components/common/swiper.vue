<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-07-03 15:41:02
 * @LastEditors  : vincent_Huanghd@126.com
 * @LastEditTime : 2019-12-26 11:48:36
 * @description: 
 -->

<template>
  <van-swipe @change="changeSwiper" :autoplay="info.length&&info[0]['videoUrl']?0:3000" :stop-propagation='false' class="swiper-top">
    <van-swipe-item v-for="(item,index) in info" :key="index" class="swiper-item" @click="handleClick">
      <template v-if="index==0&&item.videoUrl">
        <!-- controls="controls"  -->
        <!-- <video  id="swiperVideo" controls src="http://video.gaindewo.com/sv/2417fc69-16f124185d6/2417fc69-16f124185d6.mp4" :poster="item.imgUrl" x-webkit-airplay="true" x5-playsinline="true" webkit-playsinline="true" playsinline="true" class="video-item"></video> -->
        <video-player class="swiper-player" ref="videoPlayer" :options="playerOptions" :playsinline="true" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" @ended="onPlayerEnded($event)" @loadeddata="onPlayerLoadeddata($event)" @waiting="onPlayerWaiting($event)" @playing="onPlayerPlaying($event)" @timeupdate="onPlayerTimeupdate($event)" @canplay="onPlayerCanplay($event)" @canplaythrough="onPlayerCanplaythrough($event)" @ready="playerReadied" @statechanged="playerStateChanged($event)">
        </video-player>
      </template>
      <img alt="" class="swiper-image" :style="{heigth:height+'px'}" :src="item.imgUrl" v-else />
    </van-swipe-item>
    <template slot="indicator">
      <div class="indicator-item row row-center">
        <div class="indicator-progress row row-center" v-show="info.length&&!info[0]['videoUrl']">
          <span> {{index+1}}/{{info.length}}</span>
        </div>
      </div>
    </template>
  </van-swipe>
</template>
<script>
import Vue from "vue";
import { GetUserInfo } from "@/api/login";
import { Swipe, SwipeItem } from "vant";
import VideoPlayer from "vue-video-player";
import "vue-video-player/src/custom-theme.css";
import "video.js/dist/video-js.css";
import enableInlineVideo from "iphone-inline-video";
import { isIosApp, isAndroidApp } from "@/plugin/Vincent/functions/ua";
Vue.use(VideoPlayer);

export default {
  name: "productSwiper",
  props: {
    info: {
      type: Array,
      default: () => {
        return [];
      }
    },
    height: {
      type: [Number, String],
      default: 750
    }
  },
  data() {
    return {
      index: 0,
      show: false,
      autoplay: 3000,
      playerOptions: {
        height: "360",
        autoplay: false, //是否自动播放
        muted: false, //是否静音
        language: "en",
        preload: "auto",
        // fullscreen: { options: { navigationUI: "hide" } },
        sources: [
          {
            type: "video/mp4",
            // mp4
            src: ""
            // webmhttp://video.gaindewo.com/sv/2417fc69-16f124185d6/2417fc69-16f124185d6.mp4
            // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }
        ],
        notSupportedMessage: "此视频暂无法播放，请稍后再试",
        poster: ""
        // controlBar: {http://img.gaindewo.com/924463ea-8349-4033-92b8-3785a6e6e51f.png
        //   timeDivider: true, //当前时间和持续时间的分隔符
        //   durationDisplay: true, //显示持续时间
        //   remainingTimeDisplay: true, //是否显示剩余时间功能
        //   fullscreenToggle: true //全屏按钮
        // }
      }
    };
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },

    opt() {
      console.log(this.info);
      return {};
    }
  },
  mounted() {},
  components: {
    "van-swipe": Swipe,
    "van-swipe-item": SwipeItem
  },
  methods: {
    init() {
      console.log("初始化");
    },
    changeSwiper(index) {
      this.index = index;
      const video = document.querySelector("#swiperVideo");
      if (video && !video.paused) {
        video.pause();
      }
    },
    handleClick(e) {
      let { index } = this;
      if (index == 0) {
        this.show = true;
      }
    },
    onPlayerPlay(player) {
      console.log("player play!", player);
      const playerVideo = document.querySelector(
        ".video-player.swiper-player video"
      );
      // if (playerVideo && playerVideo.paused) {
      //   playerVideo.pause();
      // }
      // try {
      //   playerVideo.play();
      // } catch (e) {}
    },
    onPlayerPause(player) {
      console.log("player pause!", player);
    },
    onPlayerEnded(player) {
      // console.log('player ended!', player)
    },
    onPlayerLoadeddata(player) {
      // console.log('player Loadeddata!', player)
    },
    playerReadied(player) {
      console.log("视频准备就绪");
      const playerVideo = document.querySelector(
        ".video-player.swiper-player video"
      );
      const playerBtn = document.querySelector(
        ".video-player.swiper-player .video-js .vjs-control-bar button>.vjs-icon-placeholder"
      );
      const fullscreenBtn = document.querySelector(
        ".video-player.swiper-player .video-js .vjs-control-bar .vjs-fullscreen-control"
      );

      playerBtn.className = "vjs-icon-placeholder needsclick";
      if (isIosApp) {
        enableInlineVideo(playerVideo);
      }
      if (isAndroidApp) {
        fullscreenBtn.remove();
      }
      playerVideo && playerVideo.removeAttribute("x5-video-player-type");
      playerVideo && playerVideo.setAttribute("x-webkit-airplay", "allow");
      playerVideo &&
        playerVideo.setAttribute("x5-video-player-fullscreen", true);
    },
    onPlayerLoadeddata(player) {
      // console.log('player Loadeddata!', player)
    },
    onPlayerWaiting(player) {
      // console.log('player Waiting!', player)
    },
    onPlayerPlaying(player) {
      // console.log('player Playing!', player)
    },
    onPlayerTimeupdate(player) {
      // console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay(player) {
      // console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough(player) {
      // console.log('player Canplaythrough!', player)
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },
    handleVideo(e) {}
  },
  watch: {
    $route: {
      handler: "init",
      immediate: true
    },
    info: {
      handler: function(list) {
        console.log(list);
        if (list.length && list[0].videoUrl) {
          this.playerOptions.poster = this.info[0].imgUrl;
          this.playerOptions.sources[0].src = this.info[0].videoUrl;
        }
      },
      immediate: true
    }
  },
  created() {
    // console.log(this.info);
    // if (this.info[0].videoUrl) {
    //   this.playerOptions.poster = this.info[0].imgUrl;
    // }
  }
};
</script>
<style lang="less" scoped>
.van-swipe /deep/ .van-swipe__track {
}
.swiper-item {
  box-sizing: border-box;
  background-color: #fff;
}

.swiper-image {
  display: block;
  box-sizing: border-box;
  width: 750px;
  height: 750px;
  object-fit: contain;
  font-size: 0;
}
.indicator-item {
  position: absolute;
  bottom: 20px;
  text-align: center;
  left: 0;
  right: 0;
}
.indicator-progress {
  width: 120px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  font-size: 30px;
  color: #fff;
}
#swiperVideo {
  width: 750px;
  height: 662px;
  margin-top: 88px;
  background-color: #000;
  object-fit: contain;
  // display: none;
  // z-index: 101;
}
.swiper-player {
  width: 750px;
  height: 662px;
  margin-top: 88px;
}
.swiper-player /deep/ .vjs_video_3-dimensions {
  width: 750px;
  height: 662px;
}
.swiper-player /deep/ .video-js {
  width: 100%;
  height: 100%;
}
.swiper-player /deep/ .video-js .vjs-tech {
  position: initial;
  width: 750px;
  height: 662px;
}
.swiper-player /deep/ .video-js .vjs-control {
  font-size: 22px;
}
.swiper-player /deep/ .vjs-control-bar {
  height: 60px;
}
.swiper-player /deep/ .video-js .vjs-big-play-button {
  top: 45%;
  left: 50%;
  transform: translate(-50%);
}
.swiper-player /deep/ .video-js .vjs-control-bar {
  transition: none;
  opacity: 1;
  display: flex;
}
.swiper-player /deep/ .vjs-has-started .vjs-control-bar {
  transition: none;
  opacity: 1;
}
.swiper-player /deep/ .video-js .vjs-control-bar .vjs-volume-panel {
  display: none;
}
.swiper-player /deep/ .video-js .vjs-big-play-button {
  height: 3em;
  line-height: 3em;
  border-radius: 50%;
}
.swiper-player /deep/ .video-js .vjs-big-play-button > span::before {
  font-size: 2.6em;
}
</style>
