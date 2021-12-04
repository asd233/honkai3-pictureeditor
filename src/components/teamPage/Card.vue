<template>
  <div id="card">
    <p>卡片类型</p>
    <select class="
            form-control"
            @change="pushType"
            v-model="select">
      <option value="Boss">BOSS</option>
      <option value="Team">阵容</option>
      <option value="Line">分割线</option>
    </select>

    <component :is='select'
               @pushSubPageData="transferSubPageData">
    </component>

    <div id="cardOption">
      <button class="btn btn-default"
              @click="cardOption(1)">上移</button>
      <button class="btn btn-default"
              @click="cardOption(-1)">下移</button>
      <button class="btn btn-default"
              @click="cardOption(0)">删除</button>
    </div>
  </div>
</template>
<script>

import Boss from './card/boss.vue'
import Team from './card/team.vue'

export default {
  name: "Card",
  data() {
    return {
      select: "Boss"
    }
  },
  methods: {
    pushType() {
      this.$emit("getCardType", this.select, this.index);
      if (this.select === "Team") {
        //   初始化team组件，防止viewTeam组件读取不到数据
        let teamData = {
          score: "0",
          author: "",
          newTag: false,
          memberList: [
            {
              data: { name: "", path: "" },
              tag: false
            },
            {
              data: { name: "", path: "" },
              tag: false
            }, {
              data: { name: "", path: "" },
              tag: false
            }, {
              data: { name: "", path: "" },
              tag: false
            }
          ]
        };
        this.transferSubPageData(teamData);
      }
    },
    transferSubPageData(subPageData) {
      this.$emit("getSubPageData", subPageData, this.index);
    },
    cardOption(order) {
      this.$emit("cardOption", order, this.index);
    }
  },
  props: [
    "index",
  ],
  components: {
    Boss,
    Team
  }
}
</script>
<style lang="less">
#card {
  margin: 20px 0;
}
#cardOption {
  display: flex;
  flex-direction: initial;
  justify-content: space-between;
  > button {
    width: 100px;
  }
}
</style>