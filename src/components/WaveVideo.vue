<template>

  <div>
    <div class="vertical-text">
      <span>脑电波实时波形</span>
    </div>
    <br>
    <div>
      <video
        ref="myVideo"
        :poster="poster"
        :src="video"
        :controls="controls"
        oncontextmenu="return false"
        class="video-box"
        muted autoplay="autoplay" loop="loop"
        style="width: 100%"
      ></video>
    </div>
  </div>
</template>

<script>
import video from "../assets/videos/waveVideo.mp4"

export default {
  name: "WaveVideo",
  data() {
    return {
      video,
    }
  },
  /**
   * @param poster 展示图
   * @param src 视频资源
   * @param controls 是否显示控件
   * @param control 控件控制
   * @param videoData 视频基础数据
   */
  props: {
    poster: {
      type: String,
      required: false,
      default: ""
    },
    src: {
      type: String,
      required: true
    },
    controls: {
      type: Boolean,
      required: false,
      default: false
    },
    control: {
      type: Boolean,
      required: false,
      default: false
    },
    videoData: {
      type: Object,
      required: true
    }
  },
  mounted() {
  },
  methods: {}
};
</script>

<style scoped>
.vertical-text {
  /*writing-mode: vertical-lr; !* 竖排方向从上到下 *!*/
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 24px;
  font-family: 'Microsoft YaHei', Arial, sans-serif;
  letter-spacing: 0.5em;
}
</style>
