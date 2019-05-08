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
          {{ issue.bookname }}
        </div>
        <div class="text item">
          <span>封面:</span>
          <img class="bookImage" :src="issue.image" alt>
        </div>
        <div class="text item">
          <span>图书编码:</span>
          {{ issue.isbn }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>问题具体信息</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div class="text item">
          <span>问题ID:</span>
          {{ issue.id }}
        </div>
        <div class="text item">
          <span>问题标题:</span>
          {{ issue.title }}
        </div>
        <div class="text item">
          <p>问题主要内容:</p>
          {{ issue.content }}
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
          <Comment v-for="(item, index) in commentlist" :key="index" :commentInfo="item"></Comment>
        </div>
      </el-card>
    </section>
  </section>
</template>

<script>
import Comment from '../../../../components/public/Comment'
export default {
  components: { Comment },
  data () {
    return {
      issue: {},
      bookInfo: {},
      commentlist:[]
    }
  },
  created () {
    this.getIssueDetailById()
  },
  methods: {
    async getIssueDetailById () {
      const detailRes = await this.$axios.get('/api/issue/detail', {
        params: {
          issueId: this.$route.params.commentId
        }
      })
      this.issue = detailRes.data.data.detail
      const commentInfo = await this.$axios.get('/api/comment/list', {
        params: {
          issue_id: this.issue.id
        }
      })
      console.log('commentInfo', commentInfo);
      this.commentlist = commentInfo.data.data.list
      

    },
    toUserInfo (userid) {
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
