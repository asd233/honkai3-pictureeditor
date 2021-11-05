<template>
  <div id="roleSelect">
    <div id="role">
      <ul>
        <li v-for="(item,i) in roleData.role"
            :key="i"
            @click="selectRole(i)">
          {{item.roleName}}
        </li>
      </ul>
    </div>
    <div id="list">
      <div v-for="(item,i) in roleData.role[selectIndex].roleList"
           :key="item.name+i"
           @click="selectArmor(item)">
        <img :src="item.path">
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectIndex: 0,
    }
  },
  methods: {
    selectRole(index) {
      this.selectIndex = index;
    },
    selectArmor(data) {
      data["index"] = this.templateIndex;
      this.$emit("pushTeamData", data);
      this.$emit("setRoleDisplay");
    }
  },
  props: [
    "templateIndex",
    "roleData"
  ]
}
</script>
<style lang="less">
#roleSelect {
  display: flex;
  justify-content: space-between;
  width: 360px;
  height: 400px;
  box-shadow: 0px 1px 13px 9px #4f4f4f40;
  border-radius: 15px;
  margin: 5px 0 5px;
  > #role {
    width: 120px;
    overflow: auto;
    > ul {
      padding: 0;
      > li {
        list-style: none;
        line-height: 30px;
        border-bottom: 1px solid rgb(199, 199, 199);
        cursor: pointer;
        text-align: center;
      }
    }
  }
}
#list {
  display: flex;
  width: 240px;
  padding-left: 5px;
  padding-top: 10px;
  justify-content: space-between;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
  > div {
    width: 117px;
    height: 130px;
    > img {
      width: 115px;
    }
    > span {
      display: block;
      width: 90px;
      text-align: center;
    }
  }
}
</style>>

