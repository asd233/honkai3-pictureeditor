<template>
  <div id="boss">
    <div id="sidebar">
      <div class="top">
        <p>
          <router-link to="/">
            &lt;所有模板
          </router-link>
        </p>
      </div>
      <p>
        模式
      </p>
      <select class="form-control"
              v-model="modeType"
              @change="controlDisabled">
        <option value="bossPageAbyss">深渊</option>
        <option value="bossPageBattle">战场</option>
      </select>
      <p>
        BOSS
      </p>
      <select class="form-control"
              v-model="selectBoss">
        <option v-for="(item,i) in bossPath.paths"
                :value="bossPath.paths[i]">
          {{item.bossName}}
        </option>
      </select>
      <p>
        分数
      </p>
      <input type="text"
             class="form-control"
             v-model="score">
      <label>
        <input type="checkbox"
               v-model="rankTag">
        SSS标志
      </label>
      <p>
        扰动幅度
      </p>
      <input type="number"
             class="form-control"
             v-model="difficulty"
             :disabled="disabled">
      <p>
        天气
      </p>
      <input type="text"
             class="form-control"
             v-model="weather"
             :disabled="disabled">
      <p>
        人偶
      </p>
      <select class="form-control"
              v-model="selectElf">
        <option v-for="(item,i) in elfPath.elf"
                :value="elfPath.elf[i]">
          {{item.name}}
        </option>
      </select>
      <p>
        人偶星级
      </p>
      <input type="number"
             class="form-control"
             v-model.number="elfStar">
      <p>
        阵容图片
      </p>
      <input type="file"
             @change="getTeamImg">
      <p>
        二维码链接
      </p>
      <input type="text"
             class="form-control"
             v-model="QRcodeLink">
      <button class="btn btn-default"
              @click="createQRcode">生成二维码</button>
      <p>
        扫码提示
      </p>
      <textarea class="form-control"
                v-model="QRcodeTips">
      </textarea>

      <p>
        介绍<br>***红色字体/***<br>###加粗/###
      </p>
      <textarea style="height: 200px;
                       margin-bottom:10px"
                class="form-control"
                v-model="introduce">
                </textarea>
      <div class="option">
        <button class="btn btn-success"
                @click="createImg">
          生成图片
        </button>
      </div>
    </div>

    <div id="view">
      <div id="bossPageImg">
        <div id="bossPageBoss">
          <component :is='modeType'
                     :selectBoss="selectBoss"
                     :weather="weather"
                     :difficulty="difficulty"
                     :rankTag="rankTag">
          </component>
        </div>
        <div id="teamConfig">
          <img :src="teamConfigImg">
        </div>
        <div id="bossPageScore">
          <div id="elf"
               class="abs">
            <img :src="selectElf.path"
                 class="abs">
            <div id="star"
                 class="abs">
              <div>
                <img src="../assets/bossPage/star.png"
                     v-for="item in elfStar">
              </div>

            </div>
          </div>
          <div id="score"
               class="abs">
            {{score}}
          </div>
        </div>
        <p v-html="introduceView"
           id="introduce"></p>
        <img src="../assets/team/split-long.png"
             style="width:100%">
        <div id="bottom">
          <img src="../assets/bossPage/logo.png"
               class="abs">
          <p class="abs">
            {{QRcodeTips}}
          </p>
          <div id="QRcode"
               class="abs"></div>
        </div>
      </div>
    </div>
    <div id="bossPageScreenshot"
         v-show="screenshotCover">
      <span @click="closeCover">X</span>
    </div>
  </div>
</template>


<script>
import bossPageAbyss from '../components/bossPage/bossPageAbyss'
import bossPageBattle from '../components/bossPage/bossPageBattle'
import html2cavans from '../../node_modules/html2canvas/dist/html2canvas';
import QRCode from 'qr-creator'
import { $getJson } from '../http'

const getBossDataJson = data => {
  return $getJson('json/bossPath.json')
}

const getElfDataJson = data => {
  return $getJson('json/battleElf.json')
}

export default {
  data() {
    return {
      modeType: "bossPageBattle",
      bossPath: {},
      selectBoss: {},
      elfPath: {},
      selectElf: {},
      score: "",
      rankTag: "",
      QRcodeLink: "",
      QRcodeTips: "识别二维码\n看月光社视频攻略",
      elfStar: 1,
      difficulty: "",
      weather: "",
      introduce: "",
      introduceView: "",
      teamConfigImg: "",
      screenshotCover: false,
      disabled: true
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
    createQRcode() {
      if (this.QRcodeLink) {
        QrCreator.render({
          text: this.QRcodeLink,
          radius: 0.3, // 0.0 to 0.5
          ecLevel: 'H', // L, M, Q, H
          fill: '#000', // foreground color
          background: '#fff', // color or null for transparent
          size: 190 // in pixels
        }, document.querySelector('#QRcode'));
      }
    },
    controlDisabled() {
      if (this.modeType === "bossPageAbyss") {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    createImg() {
      html2cavans(document.getElementById("bossPageImg"), { allowTaint: true }).then(canvas => {
        document.getElementById("bossPageScreenshot").appendChild(canvas);
        this.screenshotCover = true;
      });
    }, closeCover() {
      this.screenshotCover = false;
    }
  },
  components: {
    bossPageAbyss,
    bossPageBattle
  },
  watch: {
    introduce: function (val) {
      let redStear = /\*{3}/;
      let redEnd = /\/\*{3}/;
      let strongStear = /\#{3}/;
      let strongEnd = /\/\#{3}/;
      this.introduceView = val.replace(redStear, "<span>")
        .replace(redEnd, "</span>")
        .replace(strongStear, "<strong>")
        .replace(strongEnd, "</strong>");
    }
  }, created() {
    getBossDataJson({}).then((result) => {
      this.bossPath = result.data;
    })
    getElfDataJson({}).then((result) => {
      this.elfPath = result.data;
    })
  }
}
</script>
<style lang="less">
#boss {
  display: flex;
  text-align: left;
}
#sidebar {
  > p {
    margin-top: 10px;
  }
  > textarea {
    resize: none;
    height: 100px;
  }
}

#bossPageImg {
  width: 1080px;
  min-width: 100vh;
  background-color: #1d2139;
  > #bossPageBoss {
    width: 1080px;
    height: 205px;
    background-image: url("../assets/bossPage/battle-bg.png");
  }
  > #bossPageScore {
    position: relative;
    width: 1080px;
    height: 210px;
    background-image: url("../assets/bossPage/bosspage-score.png");
    > #score {
      top: 10px;
      right: 100px;
      width: 350px;
      height: 160px;
      font-size: 120px;
      color: #fff;
    }
    > #elf {
      top: 30px;
      left: 40px;
      width: 288px;
      height: 150px;
      > img {
        width: 100%;
        height: 100%;
      }
      > #star {
        bottom: 0;
        right: 0;
      }
    }
  }
  > #teamConfig {
    width: 1080px;
    min-height: 300px;
    > img {
      width: 100%;
    }
  }
  > #introduce {
    padding: 40px 20px;
    color: #fff;
    font-size: 24px;
    white-space: pre-line;
    > span {
      color: #d31d1d;
    }
  }
}

#bottom {
  width: 1080px;
  height: 300px;
  position: relative;
  > img {
    width: 350px;
    bottom: 50px;
    left: 10px;
    opacity: 0.3;
  }
  > p {
    color: #fff;
    font-size: 24px;
    white-space: pre-line;
    text-align: right;
    bottom: 40px;
    right: 250px;
    &::after {
      content: "▶";
      position: absolute;
      right: -30px;
    }
  }
  > #QRcode {
    width: 200px;
    height: 200px;
    bottom: 50px;
    right: 10px;
    padding: 5px;
    background-color: #fff;
  }
}
#bossPageScreenshot {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.363);
  width: 100%;
  height: 100vh;
  > canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  > span {
    position: absolute;
    top: 10%;
    right: 10%;
    width: 91px;
    color: #fff;
    font-size: 60px;
    border: 3px solid #fff;
    text-align: center;
    cursor: pointer;
  }
}
</style>