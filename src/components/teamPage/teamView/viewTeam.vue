<template>
  <div id="viewTeam">
    <div id="role0">
      <img :src="cardData.memberList[0].data.path">
    </div>
    <div id="role1">
      <img :src="cardData.memberList[1].data.path">
    </div>
    <div id="role2">
      <img :src="cardData.memberList[2].data.path">
    </div>
    <div id="elf">
      <img :src="cardData.memberList[3].data.path">
    </div>
    <div id="new"
         v-show="cardData.newTag">
      <img src="../../../assets/team/new.png">
    </div>
    <div id="score">{{cardData.score}}</div>
    <div id="author">{{cardData.author}}</div>
  </div>
</template>
<script>
export default {
  props: [
    "cardData"
  ]
}
</script>
<style lang="less" scoped>
#viewTeam {
  position: relative;
  background-image: url(../../../assets/team/1634211681560.png);
  width: 1080px;
  height: 257px;
  color: #fff;
  > #role0,
  #role1,
  #role2 {
    top: 30px;
    width: 216px;
    height: 197px;
  }
  > div {
    position: absolute;
  }
}
#role0 {
  left: 72px;
}
#role1 {
  left: 247px;
}
#role2 {
  left: 421px;
}
#elf {
  top: 110px;
  right: 356px;
  width: 129px;
  height: 127px;
}
#new {
  top: 60px;
  right: 80px;
}
#score {
  width: 305px;
  top: 75px;
  right: 25px;
  text-align: center;
  font-size: 60px;
}
#author {
  width: 305px;
  top: 180px;
  right: 25px;
  text-align: center;
  font-size: 35px;
}
</style>