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

      <p>图片模式</p>
      <select class="form-control"
              v-model.number="imgModel">
        <option value="1">配置展示</option>
        <option value="0">视频展示</option>
      </select>

      <!-- 人偶部分 -->
      <div v-if="imgModel">

        <p>
          阵容图片
        </p>
        <input type="file"
               @change="getTeamImg">

        <p>人偶</p>
        <select class="form-control"
                v-model="selectElf">
          <option v-for="(item,i) in elfPath"
                  :value="elfPath[i]"
                  :key="i">
            {{item.name}}
          </option>
        </select>

        <p>人偶星级</p>
        <select class="form-control"
                v-model="elfLevel">
          <option v-for="i in 4"
                  :value="i"
                  :key="i">
            {{i}}
          </option>
        </select>
      </div>

      <p>深渊难度</p>
      <select class="form-control"
              v-model="difficulty">
        <option :value="difficultyPath[0]">苦痛</option>
        <option :value="difficultyPath[1]">红莲</option>
        <option :value="difficultyPath[2]">寂灭</option>
      </select>

      <p>
        天气
      </p>
      <input class="form-control"
             type="text"
             v-model="weather">

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
        段位/扰动
      </p>
      <input class="form-control"
             type="text"
             v-model="score">

      <p>
        Player
      </p>
      <input class="form-control"
             type="text"
             v-model="player">

      <p>
        视频跳转时间
      </p>
      <input class="form-control"
             type="text"
             v-model="time">

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

        <img id="teamConfigImg"
             v-if="imgModel"
             :src="teamConfigImg">

        <img id="background"
             :src="backgroundImgPath">
        <div>
          <div class="elf"
               v-if="imgModel">
            <img :src="selectElf.path">
            <span>
              <img src="../assets/bossPage/star.png"
                   v-for="i in elfLevel">
            </span>
          </div>

          <img class="difficulty"
               :src="difficulty">

          <span id="weather">{{weather}}</span>

          <img class="bossImg"
               :src="selectBoss.path">

          <div class="score">
            <span>
              {{score}}
            </span>
          </div>

          <div class="player">
            <span>
              {{player}}
            </span>
          </div>

          <div class="time">
            <span>
              {{time}}
            </span>
          </div>
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
      imgModel: 1,
      backgroundImgPath: require("../assets/videoPage/video4/5-detail-fbg.png"),
      teamConfigImg: "",
      elfPath: {},
      selectElf: {},
      elfLevel: 1,
      difficulty: "",
      difficultyPath: [
        require('../assets/videoPage/video3/icon-vkt.png'),
        require('../assets/videoPage/video3/icon-vhl.png'),
        require('../assets/videoPage/video3/icon-vjm.png')
      ],
      weather: "",
      bossPath: {},
      selectBoss: {},

      score: "",
      player: "",
      time: ""
    }
  },
  methods: {
    getTeamImg(e) {
      let fileReader = new FileReader();
      if (e.target.files[0]) {
        fileReader.readAsDataURL(e.target.files[0]);
      }

      fileReader.onload = () => {
        this.teamConfigImg = fileReader.result;
      };
    },
    createImage() {
      // 调用插件生成view部分的截图
      this.$utils.cerateImage("videoCoverPageImg", "screenshot", "VideoCover4");
      this.screenshotCover = true;
    },
    closeCover() {
      // 关闭遮罩层
      this.screenshotCover = false;
    }
  },
  watch: {
    imgModel: function () {
      if (!this.imgModel) {
        this.backgroundImgPath = require("../assets/videoPage/video4/6-video-fbg.png");
      } else {
        this.backgroundImgPath = require("../assets/videoPage/video4/5-detail-fbg.png");
      }
    }
  },
  created() {
    //   实例创建完成之后获取数据并设置初始值
    $getJson('json/bossPath.json').then((result) => {
      this.bossPath = result.data;
      this.selectBoss = this.bossPath.paths[1];
    },
    )
    $getJson('json//video/videoRole.json').then((result) => {
      this.roleData = result.data;
    },
    )
    $getJson('json//video/videoElf.json').then((result) => {
      this.elfPath = result.data.elf;
    },
    )
  },
}
</script>
<style lang="less" scoped>
#videoCover {
  display: flex;
  text-align: left;
}
#teamConfigImg {
  position: absolute;
  top: 35px;
  left: 50px;
  width: 1480px;
  height: 1010px;
}

#background {
  position: absolute;
}

#videoCoverPageImg {
  position: relative;
  width: 1920px;
  height: 1080px;
  background-repeat: no-repeat;
  color: #ffffff;
  font-weight: 600;
  font-style: italic;
  > div {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 390px;
    height: 1000px;
    > * {
      position: absolute;
    }
  }
  #weather {
    left: 85px;
    top: 364px;
    width: 225px;
    height: 33px;
    font-size: 30px;
    text-align: center;
    line-height: 30px;
  }
}

.elf {
  top: 10px;
  left: 90px;
  > span {
    display: flex;
    position: absolute;
    bottom: -40px;
    width: 225px;
    justify-content: center;
    > img {
      width: 30px;
    }
  }
}

.difficulty {
  left: 45px;
  top: 310px;
}

.bossImg {
  left: 70px;
  top: 455px;
}

.score,
.player,
.time {
  display: flex;
  justify-content: center;
  left: 50px;
  width: 295px;
  font-size: 40px;
}
.score {
  top: 620px;
}
.player {
  top: 750px;
}
.time {
  top: 880px;
}
</style>