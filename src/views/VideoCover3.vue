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
        <div>
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
            <option value="video/level/s.png">S</option>
            <option value="video/level/s1.png">S1</option>
            <option value="video/level/s2.png">S2</option>
            <option value="video/level/s3.png">S3</option>
            <option value="video/level/ss.png">SS</option>
            <option value="video/level/ss1.png">SS1</option>
            <option value="video/level/ss2.png">SS2</option>
            <option value="video/level/ss3.png">SS3</option>
            <option value="video/level/sss.png">SSS</option>
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
        <br />
      </div>

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

      <!-- </div> -->

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
            <img class="bossImg"
                 :src="selectBoss.path">

            <div class="teamRole">
              <div>
                <div>
                  <img :src="item.team[0].path">
                  <span class="attack"
                        v-if="item.team[0].attackFlag">
                    <img src="../assets/videoPage/video3/icon-ack.png">
                    {{item.team[0].attack}}
                  </span>
                  <img :src="item.team[0].leave">
                </div>
              </div>

              <div>
                <div>
                  <img :src="item.team[1].path">
                  <span v-if="item.team[1].attackFlag">
                    <img src="../assets/videoPage/video3/icon-ack.png">
                    {{item.team[1].attack}}
                  </span>
                  <img :src="item.team[1].leave">
                </div>
              </div>

              <div>
                <div>
                  <img :src="item.team[2].path">
                  <span v-if="item.team[2].attackFlag">
                    <img src="../assets/videoPage/video3/icon-ack.png">
                    {{item.team[2].attack}}
                  </span>
                  <img :src="item.team[2].leave">
                </div>
              </div>
            </div>
            <div class="elf">
              <img :src="item.elf.path">
            </div>
            <div class="score">
              {{item.score}}
            </div>
            <div class="player">
              {{item.player}}
            </div>
            <div class="time">
              {{item.time}}
            </div>
          </li>
        </ul>
      </div>
    </div>
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
          elf: { name: "", path: "" },
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
          elf: { name: "", path: "" },
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
          elf: { name: "", path: "" },
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
          elf: { name: "", path: "" },
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
          elf: { name: "", path: "" },
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
      this.$utils.cerateImage("videoCoverPageImg", "screenshot", "VideoCover1");
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
    $getJson('json/videoRole.json').then((result) => {
      this.roleData = result.data;
    },
    )
    $getJson('json/battleElf.json').then((result) => {
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
        top: 0;
        height: 100%;
      }
    }
  }
}
.bossImg {
  height: 90%;
}
.teamRole {
  left: 340px;
  > div {
    position: absolute;
    box-sizing: content-box;
    padding-top: 10px;
    width: 150px;
    height: 112px;
    border-radius: 10px;
    transform: skewX(-17deg);
    overflow: hidden;
    > div {
      position: absolute;
      left: -15px;
      transform: skewX(17deg);

      > img:nth-child(1) {
        width: 180px;
      }
      > img:nth-child(3) {
        position: absolute;
        right: 25px;
        bottom: 0;
        width: 60px;
      }
      > span {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        color: rgb(255, 255, 255);
        font-size: 16px;
        font-weight: 700;
        padding-left: 5px;
        background-color: rgba(61, 61, 61, 0.541);
      }
    }
  }
  > div:nth-child(2) {
    left: 175px;
  }
  > div:nth-child(3) {
    left: 350px;
  }
}
</style>