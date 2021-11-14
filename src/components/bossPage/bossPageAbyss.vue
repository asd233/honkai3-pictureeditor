
<template>
  <div id="bossPageAbyss">
    <div id="left"
         class="abs">
      <img :src="selectBoss.path"
           class="abs"
           id="bossPageAbyssImg"
           style="width:370px">
      <img src="../../assets/bossPage/boss-fg.png"
           class="abs">
      <img src="../../assets/team/sss.png"
           class="abs"
           style="top:10px;right:10px"
           v-show="rankTag">
      <p class="abs">{{selectBoss.bossName}}</p>
    </div>
    <div id="right"
         class="abs">
      <img src="../../assets/bossPage/sy-info.png"
           class="abs">
      <p>扰动幅度：{{difficulty}}</p>
      <p>天气：{{weather}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "selectBoss",
    "weather",
    "difficulty",
    "rankTag"
  ]
}
</script>

<style lang="less" scoped>
#bossPageAbyss {
  width: 100%;
  height: 100%;
  position: relative;
  p {
    color: #fff;
    font-size: 20px;
  }
  > #left {
    width: 381px;
    height: 153px;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
    > p {
      display: block;
      width: 100%;
      bottom: 0px;
      text-align: center;
    }
  }
  > #right {
    width: 388px;
    height: 93px;
    top: 20%;
    right: 10%;
    > p {
      line-height: 46.5px;
      margin: 0 0 5px 100px;
    }
  }
}
</style>