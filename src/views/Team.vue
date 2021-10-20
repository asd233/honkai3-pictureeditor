<template>
  <div id="team">
    <div id="sidebar">
      <div class="top">
        <p>
          <router-link to="/">
            &lt;所有模板
          </router-link>
        </p>
        <p>
          <input type="text"
                 v-model="teamId"
                 class="form-control"
                 style="display:inline;width:75%">
          <button class="btn btn-default"
                  style="height:34px;vertical-align: middle;">
            加载数据
          </button>
        </p>
      </div>
      <div>
        <!-- 卡片组件 -->
        <card @get="getCardType"></card>
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

      </div>
    </div>
  </div>
</template> 
<script>
import Card from '../components/Card'
export default {
  name: "team",
  data() {
    return {
      teamId: "9043,9044",
      cardType: "title"
    }
  },
  methods: {
    getCardType(cardType) {
      this.cardType = cardType;
    }
  },
  components: {
    Card,
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
  }
}
</style>