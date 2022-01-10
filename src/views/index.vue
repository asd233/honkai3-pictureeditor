<template>
  <div id="index">
    <div id="item">
      <h1>可用模板</h1>
      <p>
        <router-link to="/team">队伍阵容概览</router-link>
      </p>
      <p>
        <router-link to="/boss">战场深渊</router-link>
      </p>
      <p>
        <router-link to="/videoCover1">视频素材-封面1</router-link>
      </p>
      <p>
        <router-link to="/videoCover2">视频素材-封面2</router-link>
      </p>
      <div id="author">
        <a href="https://github.com/asd233/honkai3-pictureeditor">
          <img src="https://avatars.githubusercontent.com/u/38546775?s=48&v=4">
          <span> Amundsen</span>
        </a>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
#index {
  background-image: url(../assets/2021092217442572336.png);
  background-position: center top;
}
#item {
  position: relative;
  height: 100vh;
  overflow: hidden;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.6);
}
#author {
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  background-color: #ffffffd1;
  box-shadow: 0px 0px 9px 11px #ffffffd1;
  > a {
    > img {
      border-radius: 24px;
    }
  }
}
</style>