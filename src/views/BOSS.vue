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
              v-model="modeType">
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
        二维码链接
      </p>
      <input type="text"
             class="form-control"
             v-model="QRcodeLink">
      <p>
        扫码提示
      </p>
      <textarea class="form-control"
                v-model="QRcodeTips">
      </textarea>
      <p>
        人偶星级
      </p>
      <input type="number"
             class="form-control"
             v-model="elfStar">

      <p>
        扰动幅度
      </p>
      <input type="number"
             class="form-control"
             v-model="difficulty">
      <p>
        天气
      </p>
      <input type="text"
             class="form-control"
             v-model="weather">

      <p>
        介绍
      </p>
      <textarea style="height: 200px;
      margin-bottom:10px"
                class="form-control"
                v-model="introduce">
      </textarea>
      <div class="option">
        <button class="btn btn-success">
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
        <div id="teamConfig"></div>
        <div id="bossPageScore">
          <div id="elf"
               class="abs">
            <img src="teamConfig/elf/Bella.png"
                 alt="">
          </div>
          <div id="score"
               class="abs">{{score}}</div>
        </div>
        <p>{{introduce}}</p>
        <img src="../assets/team/split-long.png"
             style="width:100%">
      </div>
    </div>
  </div>
</template>


<script>
import bossPageAbyss from '../components/bossPage/bossPageAbyss'
import bossPageBattle from '../components/bossPage/bossPageBattle'
import { $getJson } from '../http'

const getBossDataJson = data => {
  return $getJson('json/bossPath.json')
}

export default {
  data() {
    return {
      modeType: "bossPageBattle",
      bossPath: {},
      selectBoss: {},
      score: "",
      rankTag: "",
      QRcodeLink: "",
      QRcodeTips: "",
      elfStar: "",
      difficulty: "",
      weather: "",
      introduce: "",
    }
  },
  components: {
    bossPageAbyss,
    bossPageBattle
  }, created() {
    getBossDataJson({}).then((result) => {
      this.bossPath = result.data;
    })
  }
}
</script>
<style lang="less" scoped>
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
    }
  }
  > #teamConfig {
    width: 1080px;
    min-height: 750px;
  }
  > p {
    padding: 40px 20px;
  }
}
</style>