<template>
  <div id="team"
       v-if="display">
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
              @getTeamData="getTeamData"
              @cardOption="cardOption"
              v-for="(item,i) in card"
              :index="i"
              :key="'card'+item.index">
        </card>
      </div>
      <div class="option">
        <button class="btn btn-primary"
                @click="addCard">
          添加
        </button>
        <button class="btn btn-success"
                @click="ceratImage">
          生成图片
        </button>
      </div>

    </div>
    <div id="view">
      <div id="img">
        <component :is='"view"+item.cardType'
                   v-for="(item,i) in card"
                   :key="'view'+item.index"
                   :boss="card[i].cardData">
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
import html2cavans from '../../node_modules/html2canvas/dist/html2canvas';

let cardKey = 0;
let viewKey = 0;
export default {
  name: "team",
  data() {
    return {
      display: true,
      card: [
        {
          cardType: "Boss",
          cardData: {
            select: {
              bossName: ""
            }
          },
          index: 0
        },
        {
          cardType: "Boss",
          cardData: {
            select: {
              bossName: ""
            }
          },
          index: 1
        },
      ],
    }
  },
  methods: {
    addCard() {
      this.card.push({
        cardType: "Boss",
        cardData: {
          select: {
            bossName: ""
          }
        },
        index: this.card.length
      })
    },
    cardKeyIncrease() {
      return cardKey++;
    },
    viewKeyIncrease() {
      return viewKey++;
    },
    getCardType(cardType, index) {
      this.card[index].cardType = cardType;
    },
    getBossData(bossdata, index) {
      this.card[index].cardData = bossdata;
    },
    getTeamData(teamdata, index) {
      this.card[index].cardData = teamdata;
    },
    cardOption(order, index) {
      switch (order) {
        case 1:
          //上移
          if (index != 0) {
            let item = this.card[index - 1];
            this.card.splice(index - 1, 1, this.card[index]);
            this.card.splice(index, 1, item);
          }
          break;
        case 0:
          //删除
          this.card.splice(index, 1);
          break;
        case -1:
          //下移
          if (index != this.card.length - 1) {
            let item = this.card[index + 1];
            this.card.splice(index + 1, 1, this.card[index]);
            this.card.splice(index, 1, item);
            this.display = !this.display;
            this.display = !this.display;
          }
          break;
      }
      this.display = !this.display;
      this.display = !this.display;
    },
    ceratImage() {
      html2cavans(document.getElementById("img"), { allowTaint: true }).then(canvas => {
        document.body.appendChild(canvas)
      });
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
  text-align: left;
}
#sidebar {
  width: 400px;
  height: 100vh;
  overflow-y: scroll;
  color: #000;
  padding: 20px 25px 0px;
  min-width: 400px;
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