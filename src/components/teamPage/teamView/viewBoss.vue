<template>
  <div id="viewBoss">
    <img :src="cardData.select.path"
         id="bossImg"
         class="abs">
    <img src="../../../assets/team/boss-cover.png"
         id="bossCover"
         class="abs">
    <div>
      <span class="abs">
        {{cardData.select.bossName}}
        <img src="../../../assets/team/sss.png"
             id="sss"
             class="abs"
             v-if="cardData.tag">
      </span>
    </div>

  </div>
</template>
<script>
export default {
  props: [
    "cardData"
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
  background-image: url("../../../assets/team/boss-bg.png");
  > #bossImg {
    top: 12px;
    left: 120px;
  }
  > #bossCover {
    top: 55px;
    left: 90px;
  }
  > div {
    position: absolute;
    width: 735px;
    height: 100px;
    top: 10px;
    right: 60px;
    > span {
      top: 30px;
      right: 50%;
      transform: translateX(50%);
      font-size: 38px;
      font-weight: 700;
      color: #fff;
      > #sss {
        top: -15px;
        right: -35px;
      }
    }
  }
}
</style>