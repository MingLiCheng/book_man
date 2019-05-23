<template>
  <div class="me-info-wrap">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户信息卡片</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div style="display:flex;">
        <div style="width: 500px;">
          <div class="text item">
            <span>姓名：</span>
            {{ userInfo.username }}
          </div>
          <div class="text item">
            <span>权限:</span>
            {{ userInfo.authority == '1' ? '超级管理员' : '管理员' }}
          </div>
          <div class="text item">
            <span>邮箱：</span>
            {{ userInfo.email }}
          </div>
          <div class="text item">
            <span>手机号：</span>
            {{ userInfo.tel }}
          </div>
        </div>
        <div style="width: 50%;display: flax;">
          <div class="avatar-box">
            <ImageUpload></ImageUpload>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import ImageUpload from "@/components/public/ImageUpload";
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  components: { ImageUpload },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("user", this.userInfo);
  }
};
</script>

<style lang="less">
.me-info-wrap {
  .avatar-box {
    width: 220px;
    height: 100%;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    span {
      display: inline-block;
      width: 100px;
    }
  }
}
</style>
