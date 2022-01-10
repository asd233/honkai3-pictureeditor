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
        红莲分数
      </p>
      <input type="text"
             class="form-control"
             v-model="score1">

      <p>
        苦痛分数
      </p>
      <input type="text"
             class="form-control"
             v-model="score2">
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
        <img id="bossImg"
             :src="selectBoss.path">
        <img src="../assets/videoPage/cover1/1-cover-fg.png">
        <span>红莲{{score1}}</span>
        <span>苦痛{{score2}}</span>
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
      //   红莲
      score1: 0,
      //   苦痛
      score2: 0
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
      this.selectBoss = this.bossPath.paths[0]
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
  width: 1146px;
  height: 717px;
  background-image: url("../assets/videoPage/cover1/1-cover-bg.png");
  background-repeat: no-repeat;
  > span {
    position: absolute;
    bottom: 157px;
    width: 430px;
    height: 96px;
    color: #fff;
    font-size: 55px;
    font-weight: bold;
    line-height: 96px;
    text-align: center;
    &:nth-child(3) {
      left: 98px;
    }
    &:last-child {
      right: 100px;
    }
  }
}
#bossImg {
  position: absolute;
  top: 140px;
  right: 50px;
  width: 800px;
}
</style>