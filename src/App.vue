<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
@import "../node_modules/bootstrap/dist/css/bootstrap.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
