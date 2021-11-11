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
      <select class="
            form-control">
        <option value="abyss">深渊</option>
        <option value="boss">战场</option>
      </select>
      <p>
        BOSS
      </p>
      <select class="
            form-control">
        <option value="abyss">深渊</option>
        <option value="boss">战场</option>
      </select>
      <p>
        分数
      </p>
      <input type="text"
             class="
            form-control">
      <label>
        <input type="checkbox">
        SSS标志
      </label>
      <p>
        二维码链接
      </p>
      <input type="text"
             class="
            form-control">
      <p>
        扫码提示
      </p>
      <textarea class="
            form-control">
      </textarea>
      <p>
        人偶星级
      </p>
      <input type="number"
             class="form-control">

      <p>
        扰动幅度
      </p>
      <input type="number"
             class="
            form-control">

      <p>
        天气
      </p>
      <input type="text"
             class="
            form-control">

      <p>
        介绍
      </p>
      <textarea style="height: 200px;
      margin-bottom:10px"
                class="
            form-control">
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
          <component :is='modeType'></component>
        </div>
        <div id="teamConfig"></div>
        <div id="bossPageScore"></div>
        <p>1<br></p>
        <img src="../assets/team/split-long.png"
             style="width:100%">
      </div>
    </div>
  </div>
</template>
<script>
import bossPageAbyss from '../components/bossPage/bossPageAbyss'
import bossPageBattle from '../components/bossPage/bossPageBattle'

export default {
  data() {
    return {
      modeType: "bossPageBattle"
    }
  },
  components: {
    bossPageAbyss,
    bossPageBattle
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
    width: 1080px;
    height: 210px;
    background-image: url("../assets/bossPage/bosspage-score.png");
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