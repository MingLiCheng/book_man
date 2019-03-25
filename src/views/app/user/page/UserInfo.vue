<template>
  <section class="userinfo-wrap">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户信息卡片</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="text item"><span>昵称：</span>{{ userinfo.nickName }}</div>
      <div class="text item"><span>UUID:</span>{{ userinfo.uuid }}</div>
      <div class="text item"><span>OPEN_ID：</span>{{ userinfo.open_id }}</div>
      <div class="text item"><span>国家：</span>{{ userinfo.country || '暂无'  }}</div>
      <div class="text item"><span>名字：</span>{{ userinfo.username || '暂无' }}</div>
      <div class="text item"><span>手机号码：</span>{{ userinfo.tel_num || '暂无' }}</div>
      <div class="text item"><span>邮箱：</span>{{ userinfo.email || '暂无'}}</div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户信息卡片</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="text item"><span>昵称：</span>{{ userinfo.nickName }}</div>
      <div class="text item"><span>UUID:</span>{{ userinfo.uuid }}</div>
      <div class="text item"><span>OPEN_ID：</span>{{ userinfo.open_id }}</div>
      <div class="text item"><span>国家：</span>{{ userinfo.country }}</div>
      <div class="text item"><span>名字：</span>{{ userinfo.username }}</div>
      <div class="text item"><span>手机号码：</span>{{ userinfo.tel_num }}</div>
      <div class="text item"><span>邮箱：</span>{{ userinfo.email }}</div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户信息卡片</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="text item"><span>昵称：</span>{{ userinfo.nickName }}</div>
      <div class="text item"><span>UUID:</span>{{ userinfo.uuid }}</div>
      <div class="text item"><span>OPEN_ID：</span>{{ userinfo.open_id }}</div>
      <div class="text item"><span>国家：</span>{{ userinfo.country }}</div>
      <div class="text item"><span>名字：</span>{{ userinfo.username }}</div>
      <div class="text item"><span>手机号码：</span>{{ userinfo.tel_num }}</div>
      <div class="text item"><span>邮箱：</span>{{ userinfo.email }}</div>
    </el-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
        userinfo:{}
    }
  },
  created() {
    this.getUserInfoById()
  },
  methods: {
    getUserInfoById() {
      this.$axios.post('/api/user/userinfo', {
        openId: `${this.$route.params.userid}`
      }).then(res => {
        this.userinfo = {
            nickName: res.data.data.wxUserinfo[0].nickName,
            uuid: res.data.data.wxUserinfo[0].uuid,
            open_id: res.data.data.wxUserinfo[0].open_id,
            country: res.data.data.wxUserinfo[0].country,
            avatarUrl: res.data.data.wxUserinfo[0].avatarUrl,
            username: res.data.data.userinfo.username,
            tel_num: res.data.data.userinfo.tel_num,
            email: res.data.data.userinfo.email,
            address: res.data.data.userinfo.address,
        }
      })
    }
  },

}
</script>

<style lang="less" scoped>
.userinfo-wrap {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    span{
        display: inline-block;
        width: 100px;
    }
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 480px;
  }
}
</style>
