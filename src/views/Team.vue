<template>
  <div id="team">
    <div id="sidebar">
      <div class="top">
        <p>
          <router-link to="/">
            &lt;所有模板
          </router-link>
        </p>
      </div>
      <div>
        <!-- 卡片组件 -->
        <card @getCardType="getCardType"
              @getBossData="getBossData"
              v-for="(team,i) in card"
              :index="i"
              :key="i">
        </card>
      </div>
      <div class="option">
        <button class="btn btn-primary">
          添加
        </button>
        <button class="btn btn-success">
          生成图片
        </button>
      </div>

    </div>
    <div id="view">
      <div id="img">
        <component :is='"view"+team.cardType'
                   v-for="(team,i) in card"
                   :key="i">
        </component>
      </div>
    </div>
  </div>
</template> 
<script>
import Card from '../components/Card'
import viewBoss from '../components/teamView/viewBoss.vue'
import viewTeam from '../components/teamView/viewTeam.vue'
import viewLine from '../components/teamView/viewLine.vue'

export default {
  name: "team",
  data() {
    return {
      card: [
        {
          cardType: "Boss",
          cardData: {}
        },
        {
          cardType: "Boss",
          cardData: {}
        },
      ],
    }
  },
  methods: {
    getCardType(cardType, index) {
      this.card[index].cardType = cardType;
    },
    getBossData(bossdata, index) {
      this.card[index].cardData = bossdata;
    }
  },
  components: {
    Card,
    viewBoss,
    viewTeam,
    viewLine
  },
}
</script>
<style lang="less">
#team {
  display: flex;
  flex-direction: initial;
  text-align: left;
}
#sidebar {
  width: 400px;
  height: 100vh;
  overflow-y: scroll;
  color: #000;
  padding: 20px 25px 0px;
  overflow: -moz-scrollbars-none;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  > input {
    height: 37px;
    color: #b8a8b0;
  }
  .option {
    button {
      display: block;
      width: 100%;
      margin-bottom: 20px;
    }
  }
}
#view {
  width: 78%;
  height: 100vh;
  background-color: #1d2139;
  > #img {
    width: 1080px;
    background-color: #1d2139;
  }
}
</style>