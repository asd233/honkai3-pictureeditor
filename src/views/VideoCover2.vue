<template>
  <div id="videoCover">
    <div id="sidebar">
      <div class="top">
        <p>
          <router-link to="/">
            &lt;所有模板
          </router-link>
        </p>
      </div>

      <p>
        BOSS
      </p>
      <select class="form-control"
              v-model="selectBoss">
        <option v-for="(item,i) in bossPath.paths"
                :value="bossPath.paths[i]"
                :key="i">
          {{item.bossName}}
        </option>
      </select>
      <p>
        天气1
      </p>
      <select class="form-control"
              v-model="selectWeather.weather1">
        <option v-for="(item,i) in weatherPath.weather"
                :value="item"
                :key="i">
          {{item.weather}}
        </option>
      </select>
      <p>
        天气2
      </p>
      <select class="form-control"
              v-model="selectWeather.weather2">
        <option v-for="(item,i) in weatherPath.weather"
                :value="item"
                :key="i">
          {{item.weather}}
        </option>
      </select>
      <p>
        红莲扰动
      </p>
      <input type="text"
             class="form-control"
             v-model="difficulty1">

      <p>
        苦痛扰动
      </p>
      <input type="text"
             class="form-control"
             v-model="difficulty2">
      <br />
      <div class="option">
        <button class="btn btn-success"
                @click="createImage">
          生成图片
        </button>
      </div>

    </div>
    <!-- 可视化部分 -->
    <div id="view">
      <div id="videoCoverPageImg">
        <!-- Boss -->
        <img id="bossImg"
             :src="selectBoss.path">
        <img src="../assets/videoPage/cover2/2-video-cover-fg.png">
        <!-- 天气部分 -->
        <div id="weather">
          <div>
            <img :src="selectWeather.weather1.path"
                 alt="">
            <span>{{selectWeather.weather1.weather}}</span>
          </div>
          <div>
            <img :src="selectWeather.weather2.path"
                 alt="">
            <span>{{selectWeather.weather2.weather}}</span>
          </div>
        </div>
        <!-- 深渊难度 -->
        <div id="difficulty">
          <span>红莲{{difficulty1}}</span>
          <span>苦痛{{difficulty2}}</span>
        </div>

      </div>
    </div>
    <div id="screenshot"
         v-show="screenshotCover">
      <span @click="closeCover">X</span>
    </div>
  </div>
</template>
<script>
import { $getJson } from '../http'

export default {
  data() {
    return {
      screenshotCover: false,
      bossPath: {},
      selectBoss: {},
      weatherPath: {},
      selectWeather: {
        weather1: {},
        weather2: {}
      },
      //   红莲
      difficulty1: 0,
      //   苦痛
      difficulty2: 0
    }
  },
  methods: {
    createImage() {
      // 调用插件生成view部分的截图
      this.$utils.cerateImage("videoCoverPageImg", "screenshot", "VideoCover1");
      this.screenshotCover = true;
    },
    closeCover() {
      // 关闭遮罩层
      this.screenshotCover = false;
    }
  }, created() {
    //   实例创建完成之后获取数据并设置初始值
    $getJson('json/bossPath.json').then((result) => {
      this.bossPath = result.data;
      this.selectBoss = this.bossPath.paths[1];
    })
    $getJson('json/weatherPath.json').then((result) => {
      this.weatherPath = result.data;
      this.selectWeather.weather1 = this.weatherPath.weather[0];
      this.selectWeather.weather2 = this.weatherPath.weather[0];
    })
  },
}
</script>
<style lang="less" scoped>
#videoCover {
  display: flex;
  text-align: left;
}
#videoCoverPageImg {
  position: relative;
  width: 1920px;
  height: 1080px;
  background-image: url("../assets/videoPage/cover2/2-video-cover-bg.jpg");
  background-repeat: no-repeat;
  > #difficulty,
  #weather {
    position: absolute;
    bottom: 220px;
    width: 500px;
    height: 96px;
    right: 270px;

    > span {
      position: absolute;
      width: 250px;
      height: 96px;
      color: #fff;
      font-size: 48px;
      font-weight: bold;
      font-style: italic;
      line-height: 96px;
      text-align: left;
      &:last-child {
        right: 20px;
      }
    }
  }
  #weather {
    display: flex;
    bottom: 410px;
    right: 290px;
    > div {
      width: 50%;
      height: 100%;
      color: #fff;
      font-size: 48px;
      font-weight: bold;
      font-style: italic;
      line-height: 96px;
      text-align: left;
      //   float: left;
      > img {
        height: 100%;
      }
    }
  }
}
#bossImg {
  position: absolute;
  bottom: 215px;
  left: 245px;
  width: 750px;
}
</style>