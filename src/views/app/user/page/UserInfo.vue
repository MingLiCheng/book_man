<template>
  <section class="userinfo-wrap">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户信息卡片</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="text item">
        <span>昵称：</span>
        {{ userinfo.nickName }}
      </div>
      <div class="text item">
        <span>UUID:</span>
        {{ userinfo.uuid }}
      </div>
      <div class="text item">
        <span>OPEN_ID：</span>
        {{ userinfo.open_id }}
      </div>
      <div class="text item">
        <span>国家：</span>
        {{ userinfo.country || '暂无' }}
      </div>
      <div class="text item">
        <span>名字：</span>
        {{ userinfo.username || '暂无' }}
      </div>
      <div class="text item">
        <span>手机号码：</span>
        {{ userinfo.tel_num || '暂无' }}
      </div>
      <div class="text item">
        <span>邮箱：</span>
        {{ userinfo.email || '暂无'}}
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户信息卡片</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="text item">
        <span>昵称：</span>
        {{ userinfo.nickName }}
      </div>
      <div class="text item">
        <span>UUID:</span>
        {{ userinfo.uuid }}
      </div>
      <div class="text item">
        <span>OPEN_ID：</span>
        {{ userinfo.open_id }}
      </div>
      <div class="text item">
        <span>国家：</span>
        {{ userinfo.country }}
      </div>
      <div class="text item">
        <span>名字：</span>
        {{ userinfo.username }}
      </div>
      <div class="text item">
        <span>手机号码：</span>
        {{ userinfo.tel_num }}
      </div>
      <div class="text item">
        <span>邮箱：</span>
        {{ userinfo.email }}
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户信息卡片</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="text item">
        <span>昵称：</span>
        {{ userinfo.nickName }}
      </div>
      <div class="text item">
        <span>UUID:</span>
        {{ userinfo.uuid }}
      </div>
      <div class="text item">
        <span>OPEN_ID：</span>
        {{ userinfo.open_id }}
      </div>
      <div class="text item">
        <span>国家：</span>
        {{ userinfo.country }}
      </div>
      <div class="text item">
        <span>名字：</span>
        {{ userinfo.username }}
      </div>
      <div class="text item">
        <span>手机号码：</span>
        {{ userinfo.tel_num }}
      </div>
      <div class="text item">
        <span>邮箱：</span>
        {{ userinfo.email }}
      </div>
    </el-card>
    <el-card class="recommend-card">
      <div slot="header" class="clearfix">
        <span>用户智能推荐结果</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="refurbish">刷新</el-button>
      </div>
      <div class="table_container">
        <el-table
          :data="recBooks"
          max-height="800"
          border
          :default-sort="{prop: 'date', order: 'descending'}"
          style="width: 100%"
        >
          <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
          <el-table-column prop="id" label="ID" align="center" width="80"></el-table-column>
          <el-table-column prop="title" label="书名" align="center" width="210">
            <template slot-scope="scope">
              <span>
                <a @click="toBookInfo(scope.row.id)" style="color: #4db3ff">{{ scope.row.title }}</a>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="image" label="图片" align="center" width="180">
            <template slot-scope="scope">
              <img
                style="width: 60px; height: 75px; margin: 0 auto"
                :src="scope.row.image"
                alt
                srcset
              >
            </template>
          </el-table-column>
          <el-table-column prop="isbn" label="书本条形码" align="center" width="170"></el-table-column>
          <el-table-column prop="publisher" label="出版社" align="center" width="240"></el-table-column>

          <el-table-column prop="rec_rate" label="推荐评分" align="center" width="240">
            <template slot-scope="scope">
              <span style="color: hotpink">{{ scope.row .rec_rate }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="operation" align="center" label="操作" fixed="right" width="160">
            <template>
              <el-button type="warning" icon="edit" size="small">编辑</el-button>
              <el-button type="danger" icon="delete" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- <el-row>
          <el-col :span="24">
            <div class="pagination">
              <el-pagination
                v-if="paginations.total > 0"
                :page-sizes="paginations.page_sizes"
                :page-size="paginations.page_size"
                :layout="paginations.layout"
                :total="paginations.total"
                :current-page.sync="paginations.page_index"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
              ></el-pagination>
            </div>
          </el-col>
        </el-row>-->
      </div>
    </el-card>
  </section>
</template>

<script>
export default {
  data () {
    return {
      userinfo: {},
      recBooks: []
    }
  },
  created () {
    this.getUserInfoById()
    this.getUserRecommend()
  },
  methods: {
    refurbish(){
      this.getUserRecommend()
    },
    getUserInfoById () {
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
    },
    async getUserRecommend () {
      const recommentions = await this.$axios.post('/api/rec/listByOpenid', {
        openid: `${this.$route.params.userid}`
      })
      console.log('rec', recommentions);
      this.recBooks = recommentions.data.data.rec_list
    },
    toBookInfo (id) {
      this.$router.push(`/book/detail/${id}`)
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
    span {
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
  .recommend-card {
    width: 98%;
    margin-top: 20px;
  }
}
</style>
