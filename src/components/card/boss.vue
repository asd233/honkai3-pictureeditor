<template>
  <div>
    <p>BOSS名称</p>
    <select v-model="bossData.select"
            class="form-control"
            @change="pushBossData">
      <option :value="bossPath.paths[i]"
              v-for="(item,i) in bossPath.paths"
              :key="i">
        {{item.bossName}}
      </option>
    </select>
    <label>
      <input type="checkbox"
             v-model="bossData.tag">
      sss标志
    </label>

  </div>
</template>
<script>
import bossPath from '../../assets/bosspath.json';

export default {
  name: "cardBoss",
  data() {
    return {
      bossData: {
        tag: false,
        select: "",
      },
      bossPath: bossPath
    }
  },
  methods: {
    pushBossData() {
      this.$emit("pushBossData", this.bossData);
    }
  }
}
</script>