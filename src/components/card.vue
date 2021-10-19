<template>
  <div id="card">

    <p>卡片类型</p>
    <select class="
            form-control"
            v-model="select"
            name=""
            id="">
      <option value="title">标题</option>
      <option value="boss">BOSS</option>
      <option value="team">阵容</option>
      <option value="line">分割线</option>
    </select>

    <!-- <component :is='select'></component> -->
  </div>
</template>
<script>
export default {
  name: "card",
  data() {
    return {
      select: "title"
    }
  }
}
</script>
<style lang="less">
#card {
  margin: 20px 0;
}
</style>