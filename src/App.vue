<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
@import "../node_modules/bootstrap/dist/css/bootstrap.css";
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: "微软雅黑";
}
a {
  text-decoration: none;
  color: #000;
}
button {
  outline: none !important;
  &:focus {
    outline: none !important;
  }
}
label {
  font-weight: 400px;
}
</style>
