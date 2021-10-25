<template>
  <div id="viewBoss">
    <img :src="boss.select.path"
         id="bossImg"
         class="abs">
    <img src="../../assets/team/boss-cover.png"
         id="bossCover"
         class="abs">
    <span class="abs">{{boss.select.bossName}}</span>
    <img src="../../assets/team/sss.png"
         id="sss"
         class="abs"
         v-if="boss.tag">
  </div>
</template>
<script>
export default {
  props: [
    "boss"
  ]
}
</script>
<style lang="less">
.abs {
  position: absolute;
}
#viewBoss {
  position: relative;
  width: 1080px;
  height: 120px;
  background-image: url("../../assets/team/boss-bg.png");
  > #bossImg {
    top: 12px;
    left: 120px;
  }
  > #bossCover {
    top: 55px;
    left: 110px;
  }
  > #sss {
    top: 10px;
    right: 275px;
  }
  > span {
    top: 30px;
    right: 200px;
    font-size: 38px;
    font-weight: 700;
    color: #fff;
  }
}
</style>