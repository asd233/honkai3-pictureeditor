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

    <component :is='select'></component>
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
      this.$emit("get", this.select);
    }
  },
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
</style>