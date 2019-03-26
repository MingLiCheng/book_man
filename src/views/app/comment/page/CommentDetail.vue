<template>
  <section class="comment-detail-wrap">
    <section class="related-info-box">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>相关书本信息卡片</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div class="text item">
          <span>书名：</span>
          {{ bookInfo.title }}
        </div>
        <div class="text item">
          <span>封面:</span>
          <img class="bookImage" :src="bookInfo.image" alt>
        </div>
        <div class="text item">
          <span>图书编码:</span>
          {{ bookInfo.isbn }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>问题具体信息</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div class="text item">
          <span>问题ID:</span>
          {{ comment.comment_id }}
        </div>
        <div class="text item">
          <span>问题标题:</span>
          {{ comment.title }}
        </div>
        <div class="text item">
          <p>问题主要内容:</p>
          {{ comment.content }}
        </div>
      </el-card>
    </section>
    <section class="comment-info-box">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>相关评论信息</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div class="text item">
          <p>问题主要内容:</p>
            <div v-for="(item, index) in comment.list" :key="index" class="childItem-box">
                <p><span> {{ item.user_info.nickName }} </span><span class="user-openid" @click="toUserInfo(item.openid)"> {{ item.openid }} </span></p>
                <p class="content-wrap">{{ item.content }}</p>
                    <div v-for="(childItem, childIndex) in item.list" :key="childIndex" class="childchild-box">
                        <p><span> {{ childItem.user_info.nickName }} </span><span class="user-openid" @click="toUserInfo(childItem.openid)"> {{ childItem.openid }} </span></p>
                        <p class="content-wrap">{{ childItem.content}}</p>
                        <div v-for="(childchildItem, childchildIndex) in childItem.list" :key="childchildIndex" class="childchildchild-box">
                            <p><span> {{ childchildItem.user_info.nickName }} </span><span class="user-openid" @click="toUserInfo(childchildItem.openid)">  {{ childchildItem.openid }} </span></p>
                            <p class="content-wrap">{{ childchildItem.content }}</p>
                        </div>
                    </div>
            </div>
        </div>
      </el-card>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      comment: {},
      bookInfo: {}
    }
  },
  created() {
    this.getCommentDetailById()
  },
  methods: {
    async getCommentDetailById() {
      const detailRes = await this.$axios.get('/api/comment/detail', {
        params: {
          commentId: this.$route.params.commentId
        }
      })
      this.comment = detailRes.data.data.info.list

      const bookInfo = await this.$axios.get('/api/book/detail', {
        params: {
          id: this.comment.bookid
        }
      })
      this.bookInfo = bookInfo.data.data
    },
    toUserInfo(userid){
        this.$router.push(`/user/userinfo/${userid}`)
    }
  },

}
</script>

<style lang="less" scoped>
.comment-detail-wrap {
  display: flex;
  .related-info-box {
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    padding-right: 40px;
    .box-card {
      width: 480px;
      margin-bottom: 20px;
    }
  }

  .comment-info-box {
    .box-card {
      width: 580px;
    }
    .childItem-box{
        border: 1px solid rgb(240, 158, 158);
        border-radius: 5px;
        padding: 5px;
        margin: 5px 0px 5px 20px ;
        p{
            margin: 0;
            padding: 0;
        }
        .content-wrap {
            padding: 12px;
        }
        .user-openid {
            color: rgb(85, 168, 236);
            cursor: pointer;
        }
        // box-shadow: 2px 5px 10px rgb(231, 229, 229);
        .childchild-box {
            border: 1px solid rgb(136, 233, 133);
            border-radius: 5px;
            margin: 5px 0px 5px 20px ;
            .childchildchild-box{
                border: 1px solid rgb(102, 133, 235);
                border-radius: 5px;
                margin: 5px 0px 5px 20px ;
            }
        }
    }
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
    .bookImage {
      height: 100px;
      width: 80px;
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
}
</style>
