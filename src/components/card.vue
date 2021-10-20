<template>
  <div id="card">

    <p>卡片类型</p>
    <select class="
            form-control"
            @change="pushType"
            v-model="select">
      <option value="cardTitle">标题</option>
      <option value="boss">BOSS</option>
      <option value="team">阵容</option>
      <option value="line">分割线</option>
    </select>

    <component v-bind:is='select'></component>
  </div>
</template>
<script>
import cardTitle from './card/cardTitle.vue'
import boss from './card/boss.vue'
import team from './card/team.vue'

export default {
  name: "Card",
  data() {
    return {
      select: "cardTitle"
    }
  },
  methods: {
    pushType() {
      this.$emit("get", this.select);
    }
  },
  components: {
    cardTitle,
    boss,
    team
  }
}
</script>
<style lang="less">
#card {
  margin: 20px 0;
}
</style>