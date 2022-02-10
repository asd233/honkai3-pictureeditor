<template>
  <div id="videoCover">
    <div id="sidebar">
      <div class="top">
        <p>
          <router-link to="/">
            &lt;所有模板
          </router-link>
        </p>
      </div>
      <!-- Boss与天气的数据每队是相同的，无需为每个队伍单独配置 -->
      <p>
        BOSS
      </p>
      <select class="form-control"
              v-model="selectBoss">
        <option v-for="(item,i) in bossPath.paths"
                :value="bossPath.paths[i]"
                :key="i">
          {{item.bossName}}
        </option>
      </select>

      <p>
        天气
      </p>
      <input class="form-control"
             type="text"
             v-model="weather">

      <p>
        队伍选择
      </p>
      <select class="form-control"
              v-model="teamListIndex">
        <option v-for="(item,i) in 5"
                :value="i"
                :key="i">
          {{i+1}}
        </option>
      </select>

      <div v-for="(item,memberIndex) in teamList[teamListIndex].team">
        <!-- 重复渲染三个队员信息表单 -->
        <div>
          <p>
            选择深渊
          </p>

          <select class="form-control"
                  v-model="teamList[teamListIndex].difficulty">
            <option :value="difficultyPath[0]">苦痛</option>
            <option :value="difficultyPath[1]">红莲</option>
            <option :value="difficultyPath[2]">寂灭</option>
          </select>
          <!-- 选择角色部分 -->
          <p>
            队员{{memberIndex+1}}
          </p>

          <input class="form-control"
                 type="text"
                 v-model="teamList[teamListIndex].team[memberIndex].name"
                 disabled>

          <button class="btn btn-default"
                  @click="setRoleDisplay(teamListIndex,memberIndex)">
            从素材库选择
          </button>
          <br />

          <roleSelect v-if="teamList[teamListIndex].team[memberIndex].tag"
                      :teamListIndex=teamListIndex
                      :templateIndex=memberIndex
                      :roleData="roleData"
                      @setRoleDisplay="setRoleDisplay(teamListIndex,memberIndex)"
                      @pushTeamData="pushTeamData">
          </roleSelect>
        </div>
        <div>
          <!-- 攻击力部分 -->
          <input type="checkbox"
                 v-model="teamList[teamListIndex].team[memberIndex].attackFlag">
          <span style="line-height:40px">
            显示攻击力
          </span>
          <input class="form-control"
                 type="number"
                 v-if="teamList[teamListIndex].team[memberIndex].attackFlag"
                 v-model="teamList[teamListIndex].team[memberIndex].attack">
        </div>

        <div>
          <!-- 女武神星级 -->
          <p>
            女武神星级
          </p>
          <select class="form-control"
                  v-model="teamList[teamListIndex].team[memberIndex].leave">
            <option value="static/video/level/s.png">S</option>
            <option value="static/video/level/s1.png">S1</option>
            <option value="static/video/level/s2.png">S2</option>
            <option value="static/video/level/s3.png">S3</option>
            <option value="static/video/level/ss.png">SS</option>
            <option value="static/video/level/ss1.png">SS1</option>
            <option value="static/video/level/ss2.png">SS2</option>
            <option value="static/video/level/ss3.png">SS3</option>
            <option value="static/video/level/sss.png">SSS</option>
          </select>
        </div>
      </div>

      <div>
        <!-- 人偶部分 -->
        <p>人偶</p>
        <select class="form-control"
                v-model="teamList[teamListIndex].elf">
          <option v-for="(item,i) in elfPath"
                  :value="elfPath[i]"
                  :key="i">
            {{item.name}}
          </option>
        </select>
      </div>

      <p>人偶星级</p>
      <select class="form-control"
              v-model="teamList[teamListIndex].elf.level">
        <option v-for="i in 4"
                :value="i"
                :key="i">
          {{i}}
        </option>
      </select>

      <p>
        耗时/积分
      </p>
      <input class="form-control"
             type="text"
             v-model="teamList[teamListIndex].score">

      <p>
        Player
      </p>
      <input class="form-control"
             type="text"
             v-model="teamList[teamListIndex].player">

      <p>
        视频跳转时间
      </p>
      <input class="form-control"
             type="text"
             v-model="teamList[teamListIndex].time">

      <br />
      <div class="option">
        <button class="btn btn-success"
                @click="createImage">
          生成图片
        </button>
      </div>

    </div>

    <!-- 可视化部分 -->
    <div id="view">
      <div id="videoCoverPageImg">
        <ul>
          <li v-for="(item) in teamList">
            <!-- Boss -->
            <div class="boss">
              <img class="bossImg"
                   :src="selectBoss.path">
              <span>
                <img :src="item.difficulty">
                {{weather}}
              </span>
            </div>
            <div class="teamRole">
              <div>
                <img :src="item.team[0].path">
                <span class="attack"
                      v-if="item.team[0].attackFlag">
                  <img src="../assets/videoPage/video3/icon-ack.png">
                  {{item.team[0].attack}}
                </span>
                <img :src="item.team[0].leave">
              </div>

              <div>
                <img :src="item.team[1].path">
                <span v-if="item.team[1].attackFlag">
                  <img src="../assets/videoPage/video3/icon-ack.png">
                  {{item.team[1].attack}}
                </span>
                <img :src="item.team[1].leave">
              </div>

              <div>
                <img :src="item.team[2].path">
                <span v-if="item.team[2].attackFlag">
                  <img src="../assets/videoPage/video3/icon-ack.png">
                  {{item.team[2].attack}}
                </span>
                <img :src="item.team[2].leave">
              </div>
            </div>
            <div class="elf">
              <img :src="item.elf.path">
              <span>
                <img src="../assets/bossPage/star.png"
                     v-for="i in item.elf.level">
              </span>
            </div>
            <div class="score">
              <span>
                {{item.score}}
              </span>
            </div>
            <div class="player">
              <span>
                {{item.player}}
              </span>
            </div>
            <div class="time">
              <span>
                {{item.time}}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 截图容器与遮罩层 -->
    <div id="screenshot"
         v-show="screenshotCover">
      <span @click="closeCover">X</span>
    </div>
  </div>
</template>
<script>
import { $getJson } from '../http'
import roleSelect from '../components/teamPage/roleSelect.vue'
export default {
  data() {
    return {
      screenshotCover: false,
      teamListIndex: 0,
      bossPath: {},
      selectBoss: {},
      weather: "",
      difficultyPath: [
        require('../assets/videoPage/video3/icon-kt.png'),
        require('../assets/videoPage/video3/icon-hl.png'),
        require('../assets/videoPage/video3/icon-jm.png')
      ],
      roleData: {},
      elfPath: {},
      teamList: [
        {
          difficulty: "",
          team: [
            { name: "", path: "", leave: "", attack: "", attackFlag: false, tag: false },
            { name: "", path: "", leave: "", attack: "", attackFlag: false, tag: false },
            { name: "", path: "", leave: "", attack: "", attackFlag: false, tag: false },
          ],
          elf: { name: "", path: "", level: "" },
          score: "",
          player: "",
          time: ""
        }
        , {
          difficulty: "",
          team: [
            { name: "", path: "", leave: "", attack: "", attackFlag: false, tag: false },
            { name: "", path: "", leave: "", attack: "", attackFlag: false, tag: false },
            { name: "", path: "", leave: "", attack: "", attackFlag: false, tag: false },
          ],
          elf: { name: "", path: "", level: "" },
          score: "",
          player: "",
          time: ""
        }, {
          difficulty: "",
          team: [
            { name: "", path: "", leave: "", attack: "", attackFlag: false, tag: false },
            { name: "", path: "", leave: "", attack: "", attackFlag: false, tag: false },
            { name: "", path: "", leave: "", attack: "", attackFlag: false, tag: false },
          ],
          elf: { name: "", path: "", level: "" },
          score: "",
          player: "",
          time: ""
        }, {
          difficulty: "",
          team: [
            { name: "", path: "", leave: "", attack: "", attackFlag: false, tag: false },
            { name: "", path: "", leave: "", attack: "", attackFlag: false, tag: false },
            { name: "", path: "", leave: "", attack: "", attackFlag: false, tag: false },
          ],
          elf: { name: "", path: "", level: "" },
          score: "",
          player: "",
          time: ""
        }, {
          difficulty: "",
          team: [
            { name: "", path: "", leave: "", attack: "", attackFlag: false, tag: false },
            { name: "", path: "", leave: "", attack: "", attackFlag: false, tag: false },
            { name: "", path: "", leave: "", attack: "", attackFlag: false, tag: false },
          ],
          elf: { name: "", path: "", level: "" },
          score: "",
          player: "",
          time: ""
        }
      ]
    }
  },
  methods: {
    setRoleDisplay(teamListIndex, index) {
      this.teamList[teamListIndex].team[index].tag = !this.teamList[teamListIndex].team[index].tag;
    },
    pushTeamData(data) {
      this.teamList[data.teamListIndex].team[data.index].name = data.name;
      this.teamList[data.teamListIndex].team[data.index].path = data.path;
    },
    createImage() {
      // 调用插件生成view部分的截图
      this.$utils.cerateImage("videoCoverPageImg", "screenshot", "VideoCover3");
      this.screenshotCover = true;
    },
    closeCover() {
      // 关闭遮罩层
      this.screenshotCover = false;
    }
  },
  components: {
    roleSelect
  }, created() {
    //   实例创建完成之后获取数据并设置初始值
    $getJson('json/bossPath.json').then((result) => {
      this.bossPath = result.data;
      this.selectBoss = this.bossPath.paths[1];
    },
    )
    $getJson('json//video/videoRole.json').then((result) => {
      this.roleData = result.data;
    },
    )
    $getJson('json//video/videoMiniElf.json').then((result) => {
      this.elfPath = result.data.elf;
    },
    )
  },
}
</script>
<style lang="less" scoped>
#videoCover {
  display: flex;
  text-align: left;
}
#videoCoverPageImg {
  position: relative;
  width: 1920px;
  height: 1080px;
  background-image: url("../assets/videoPage/video3/3-team-bg.jpg");
  background-repeat: no-repeat;
  color: #ffffff;
  font-weight: 600;
  font-style: italic;

  > ul {
    position: absolute;
    top: 215px;
    width: 100%;
    padding: 0;
    > li {
      position: relative;
      height: 144px;
      list-style: none;
      background-image: url("../assets/videoPage/video3/3-team-list-split.png");
      > div {
        position: absolute;
      }
    }
  }
}
.boss {
  height: 100%;
  > .bossImg {
    height: 90%;
  }
  > span {
    position: absolute;
    left: 0;
    bottom: 15px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.521);
    text-align: center;
    font-size: 24px;
  }
}

.teamRole {
  left: 340px;
  top: 0;
  height: 100%;
  > div {
    position: absolute;
    box-sizing: content-box;
    padding-top: 10px;
    width: 180px;
    height: 112px;
    border-radius: 10px;

    > img:nth-child(1) {
      width: 180px;
    }
    > img:nth-child(3) {
      position: absolute;
      right: 10px;
      bottom: -10px;
      width: 60px;
    }
    > span {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 140px;
      color: rgb(255, 255, 255);
      font-size: 16px;
      font-weight: 700;
      padding-left: 5px;
      background-color: rgba(61, 61, 61, 0.541);
    }
  }
  > div:nth-child(2) {
    left: 175px;
  }
  > div:nth-child(3) {
    left: 350px;
  }
}
.elf {
  top: 10px;
  left: 925px;
  > span {
    display: flex;
    position: absolute;
    left: -8px;
    bottom: -28px;
    width: 120px;
    justify-content: center;
    > img {
      width: 30px;
    }
  }
}
.score,
.player,
.time {
  display: flex;
  justify-content: center;
  top: 40px;
  width: 270px;
  font-size: 40px;
}
.score {
  right: 550px;
}
.player {
  right: 290px;
  width: 260px;
}
.time {
  width: 250px;
  right: 40px;
}
</style>