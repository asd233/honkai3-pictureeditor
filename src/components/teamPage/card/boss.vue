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
             v-model="bossData.tag"
             @change="pushBossData">
      sss标志
    </label>

  </div>
</template>
<script>

import { $getJson } from '../../../http'

const getBossDataJson = data => {
  return $getJson('json/bossPath.json')
}

export default {
  name: "cardBoss",
  data() {
    return {
      bossData: {
        tag: false,
        select: "",
      },
      bossPath: {}
    }
  },
  methods: {
    pushBossData() {
      this.$emit("pushSubPageData", this.bossData);
    }
  }, created() {
    getBossDataJson({}).then((result) => {
      this.bossPath = result.data;
    })
  }
}
</script>