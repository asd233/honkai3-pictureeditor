<template>
  <div id="roleSelect">
    <div id="role">
      <ul>
        <li v-for="(item,i) in roleData.role"
            :key="i">
          {{item.roleName}}
        </li>
      </ul>
    </div>
    <div id="list">
      <div v-for="(item,i) in roleData.role[selectIndex].roleList"
           :key="item.name+i">
        <img :src="item.path"
             alt="">
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import roleData from '../assets/role.json'
export default {
  data() {
    return {
      roleData: roleData,
      selectIndex: 0
    }
  },
  methods: {
    cl() {
      console.log(this.roleData);
    }
  },
  created() {
    this.cl();
  },
}
</script>
<style lang="less">
#roleSelect {
  display: flex;
  justify-content: space-between;
  width: 350px;
  height: 400px;
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
  position: relative;
  width: 230px;
  padding-left: 5px;
  > div {
    position: absolute;
    width: 100px;
    height: 130px;
    > img {
      position: absolute;
      width: 115px;
    }
    > span {
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
    }
  }
  > div:nth-child(even) {
    right: 0;
  }
}
</style>>

