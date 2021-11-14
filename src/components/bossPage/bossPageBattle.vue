<template>
  <div id="bossPageBattle">
    <div class="abs">
      <img :src="selectBoss.path"
           class="abs"
           style="width:370px">
      <img src="../../assets/bossPage/boss-fg.png"
           class="abs">
      <img src="../../assets/team/sss.png"
           class="abs"
           style="top:10px;right:10px"
           v-show="rankTag">
      <p class="abs">{{selectBoss.bossName}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "selectBoss",
    "rankTag"
  ]
}
</script>

<style lang="less" scoped>
#bossPageBattle {
  width: 100%;
  height: 100%;
  position: relative;
  > div {
    width: 381px;
    height: 153px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    > p {
      color: #fff;
      font-size: 20px;
      display: block;
      width: 100%;
      bottom: 0px;
      text-align: center;
    }
  }
}
</style>
