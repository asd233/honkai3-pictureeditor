<template>
  <div id="teamCard">
    <p>分数</p>
    <input class="form-control"
           type="text"
           v-model="teamData.score"
           @keyup="pushTeamData(null)">
    <p>作者</p>
    <input class="form-control"
           type="text"
           v-model="teamData.author"
           @keyup="pushTeamData(null)">
    <label>
      <input type="checkbox"
             v-model="teamData.newTag"
             @change="pushTeamData(null)">
      NEW!标志
    </label>

    <p>队长</p>
    <input class="form-control"
           type="text"
           readonly="readonly"
           v-model="teamData.memberList[0].data.name">
    <button class="btn btn-default"
            @click="setRoleDisplay(0)">从素材库选择</button>
    <roleSelect v-if="teamData.memberList[0].tag"
                :templateIndex="0"
                :roleData=roleData
                @pushTeamData="pushTeamData"
                @setRoleDisplay="setRoleDisplay(0)">
    </roleSelect>

    <p>队员1</p>
    <input class="form-control"
           type="text"
           readonly="readonly"
           v-model="teamData.memberList[1].data.name">
    <button class="btn btn-default"
            @click="setRoleDisplay(1)">从素材库选择</button>
    <roleSelect v-if="teamData.memberList[1].tag"
                :templateIndex="1"
                :roleData=roleData
                @pushTeamData="pushTeamData"
                @setRoleDisplay="setRoleDisplay(1)">
    </roleSelect>

    <p>队员2</p>
    <input class="form-control"
           type="text"
           readonly="readonly"
           v-model="teamData.memberList[2].data.name">
    <button class="btn btn-default"
            @click="setRoleDisplay(2)">从素材库选择</button>
    <roleSelect v-if="teamData.memberList[2].tag"
                :templateIndex="2"
                :roleData=roleData
                @pushTeamData="pushTeamData"
                @setRoleDisplay="setRoleDisplay(2)">
    </roleSelect>

    <p>人偶</p>
    <input class="form-control"
           type="text"
           readonly="readonly"
           v-model="teamData.memberList[3].data.name">
    <button class="btn btn-default"
            @click="setRoleDisplay(3)">
      从素材库选择
    </button>
    <div id="elf"
         v-show="teamData.memberList[3].tag">
      <div v-for="(item,i) in elf"
           :key="i"
           @click="setElfDisplay(item)">
        <img :src="item.path">
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import roleSelect from '../roleSelect.vue'
import { $getJson } from '../../http'

const getroleDataJson = data => {
  return $getJson('json/role.json')
}
const getElfDataJson = data => {
  return $getJson('json/elf.json')
}

export default {
  data() {
    return {
      teamData: {
        score: "0",
        author: "",
        newTag: false,
        memberList: [
          {
            data: { name: "", path: "" },
            tag: false
          },
          {
            data: { name: "", path: "" },
            tag: false
          }, {
            data: { name: "", path: "" },
            tag: false
          }, {
            data: { name: "", path: "" },
            tag: false
          }
        ]
      },
      roleData: {
        role: [
          { roleList: [] }
        ]
      },
      elf: elf.elf,
    }
  },
  methods: {
    pushTeamData(data) {
      console.log(data);
      if (data !== null) {
        this.teamData.memberList[data.index].data = data;
      }
      this.$emit("pushTeamData", this.teamData);
    },
    setRoleDisplay(index) {
      if (index === 3) {
        getElfDataJson({}).then((result) => {
          this.elf = result.data.elf;
        })
      } else {
        getroleDataJson({}).then((result) => {
          this.roleData = result.data;
        })
      }

      this.teamData.memberList[index].tag = !this.teamData.memberList[index].tag
    },
    setElfDisplay(data) {

      this.teamData.memberList[3].tag = false;
      data.index = 3;
      this.pushTeamData(data);
    }
  },
  components: {
    roleSelect
  }
}
</script>
<style lang="less" scoped>
#elf {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 360px;
  height: 400px;
  box-shadow: 0px 1px 13px 9px #4f4f4f40;
  border-radius: 15px;
  margin: 5px 0px 5px;
  overflow-y: scroll;
  overflow: -moz-scrollbars-none;
  &::-webkit-scrollbar {
    display: none;
  }
  > div {
    width: 100px;
    margin: 5px 10px 5px;

    > img {
      width: 100px;
    }
    > span {
      width: 100px;
      text-align: center;
    }
  }
}
</style>>
