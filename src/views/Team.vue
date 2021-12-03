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
              @getSubpageData="getSubpageData"
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
    <!-- 可视化部分 -->
    <div id="view">
      <div id="teamPageImg">
        <!-- 与卡片组件相对应的可视化部分 -->
        <component :is='"view"+item.cardType'
                   v-for="(item,i) in card"
                   :key="'view'+item.index"
                   :cardData="card[i].cardData">
        </component>
      </div>
    </div>
    <div id="screenshot"
         v-show="screenshotCover">
      <span @click="closeCover">X</span>
    </div>
  </div>
</template> 
<script>
import Card from '../components/teamPage/Card'
import viewBoss from '../components/teamPage/teamView/viewBoss.vue'
import viewTeam from '../components/teamPage/teamView/viewTeam.vue'
import viewLine from '../components/teamPage/teamView/viewLine.vue'

export default {
  name: "team",
  data() {
    return {
      card: [
        {
          cardType: "Boss",
          cardData: {
            select: {
              bossName: ""
            }
          },
          index: 0
        }
      ],
      screenshotCover: false
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
    getCardType(cardType, index) {
      // 获取卡片的类型
      this.card[index].cardType = cardType;
    },
    getSubpageData(subpageData, index) {
      this.card[index].cardData = subpageData;
    },
    cardOption(order, index) {
      // 此方法根据传入的order值对卡片进行移动或删除操作，index值为需要操作的卡片的索引值
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
          }
          break;
      }
    },
    ceratImage() {
      // 调用插件生成view部分的截图
      this.$utils.ceratImage("teamPageImg", "screenshot");
      this.screenshotCover = true;
    },
    closeCover() {
      // 关闭遮罩层
      this.screenshotCover = false;
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
  overflow: auto;
  > #teamPageImg {
    width: 1080px;
    background-color: #1d2139;
    padding: 18px 0 80px;
  }
}
#screenshot {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.363);
  width: 100%;
  height: 100vh;
  > canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  > span {
    position: absolute;
    top: 10%;
    right: 10%;
    width: 91px;
    color: #fff;
    font-size: 60px;
    border: 3px solid #fff;
    text-align: center;
    cursor: pointer;
  }
}
</style>