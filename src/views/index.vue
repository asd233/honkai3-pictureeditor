<template>
  <div id="index">
    <div id="cover">
      <div id="item">
        <h1>可用模板</h1>
        <button>
          <router-link to="/team">队伍阵容概览</router-link>
        </button>
        <button>
          <router-link to="/boss">战场深渊</router-link>
        </button>
        <button>
          <router-link to="/videoCover1">视频素材-封面1</router-link>
        </button>
        <button>
          <router-link to="/videoCover2">视频素材-封面2</router-link>
        </button>
        <button>
          <router-link to="/videoCover3">视频素材-封面3</router-link>
        </button>
        <button>
          <router-link to="/videoCover4">视频素材-封面4</router-link>
        </button>
      </div>
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
#cover {
  position: relative;
  height: 100vh;
  overflow: hidden;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.4);
}
#item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  > button {
    width: 300px;
    height: 65px;
    border-radius: 15px;
    border: 0;
    margin-bottom: 25px;
    transition: all 0.5s;
    font-size: 18px;
    opacity: 0.8;
    box-shadow: 0px 0px 20px 0px #b1b1b1d1;

    &:hover {
      box-shadow: 10px 10px 10px 2px#b1b1b1d1;
      opacity: 1;
    }
    > a {
      display: block;
      line-height: 65px;
      width: 100%;
      height: 100%;
      text-decoration: none;
    }
  }
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