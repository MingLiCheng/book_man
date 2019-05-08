<template>
  <section class="aside-wrap">
      <el-menu
        default-active="1-1"
        class="el-menu-vertical-demo"
        background-color="#222d32"
        text-color="#fff"
        active-text-color="#3c8dbc"
      >
        <router-link to="/">
          <el-menu-item class="homeicon-box" index="0">
            <a-icon type="home" style="font-size: 18px; margin:auto 20px;" />
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <template v-for="item in asidenavs">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <a-icon :type="item.icon" style="font-size: 18px; margin:auto 20px;" />
              <span slot="title">{{item.name}}</span>
            </template>
            <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
              <el-menu-item :index="citem.path">
                <span slot="title">{{citem.name}}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
  </section>
</template>

<script>
export default {
  data() {
    return {
      asidenavs: [
        {
          icon: "profile",
          name: "图书管理",
          path: "book",
          children: [{ path: "/book/list", name: "图书列表" }]
        },
        {
          icon: "aliwangwang",
          name: "评论管理",
          path: "comment",
          children: [{ path: "/comment/list", name: "评论列表" }]
        },
        {
          icon: "shop",
          name: "商城管理",
          path: "shop",
          children: [
            { path: "/shop/goodslist", name: "商品列表" },
            { path: "/shop/orderlist", name: "订单列表" }
            ]
        },
        {
          icon: "team",
          name: "用户管理",
          path: "user",
          children: [
            { path: "/user/list", name: "用户列表" },
            { path: "/user/adminlist", name: "管理员列表" },
            ]
        },
        {
          icon: "team",
          name: "广告管理",
          path: "advertisement",
          children: [
            { path: "/advertisement/booklist", name: "书本广告" },
            { path: "/advertisement/goodslist", name: "商品广告" },
          ]
        },
      ]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="less" scoped>
.aside-wrap {
  height: 100%;
  width: 100%;
  background-color: #222d32 !important;
  .homeicon-box {
    background-color: #fff;
    line-height: 56px;
  }
  .el-menu-vertical-demo {
    border: 0px;
    overflow: hidden;
  }
  .el-menu {
    height: 100%;
    overflow: hidden;
  }
}
</style>