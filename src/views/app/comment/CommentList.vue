<template>
  <section>
    <div class="table_container">
      <el-table
        :data="issueList"
        max-height="600"
        border
        :default-sort="{prop: 'date', order: 'descending'}"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>

        <el-table-column prop="nickName" label="标题" align="center" width="320">
          <template slot-scope="scope">
            <span style="color:#4db3ff">
              <a @click="toCommentDetail(scope.row.id)" style="color: #4db3ff">{{ scope.row.title }}</a>
            </span>
          </template>
        </el-table-column>
        <el-table-column  label="发起人" align="center" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.user_info.nickName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="简介" align="center" width="320">
          <template slot-scope="scope">
            <span>{{ scope.row.content.substring(0,30) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="相关书籍" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.bookname }}</span>
          </template>
        </el-table-column>

        <el-table-column label="赞" align="center" width="60">
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.upnumber  }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="踩" align="center" width="60">
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.downnumber  }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" align="center" width="60"></el-table-column>
        <!-- <el-table-column label="openid" align="center" width="260">
          <template slot-scope="scope">
            <span>
              <a href="javascript:;" style="color: #4db3ff">{{ scope.row.openid }}</a>
            </span>
          </template>
        </el-table-column> -->
        <el-table-column prop="operation" align="center" label="操作" fixed="right" width="180">
          <template slot-scope="scope">
            <el-button type="warning" icon="edit" size="small" @click="showEditDialog(scope.row,scope.$index)">编辑</el-button>
            <el-button
              type="danger"
              icon="delete"
              size="small"
              @click="onDeleteUser(scope.row,scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
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
      </el-row>
    </div>
    <CommentDialog :dialog="dialog" :form="form"></CommentDialog>
  </section>
</template>

<script>
import CommentDialog from '@/components/public/CommentDialog'
export default {
  components:{ CommentDialog },
  data() {
    return {
      dialog:{
        show: false
      },
      form:{},
      issueList: [],
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 100, // 总数
        page_size: 5, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
    }
  },
  created() {
    this.getIssueList()
  },
  methods: {
    toUserInfo(id){
      this.$router.push(`/user/userinfo/${id}`)
    },
    handleCurrentChange(page) {

    },
    handleSizeChange(page_size) {
      this.paginations.page_size = page_size;

    },
    getIssueList() {
      this.$axios.get('/api/issue/list').then(res => {
        this.issueList = res.data.data.list
      })
    },
    onDeleteUser(row,index){
      this.$message.error('暂不支持')
    },
    showEditDialog(row,index) {
      this.dialog.show = true
      this.form = {
        id: row.id,
        title: row.title ,
        nickName: row.user_info.nickName ,
        summary: row.summary ,
        upnumber: row.upnumber ,
        downnumber: row.downnumber ,
      }
    },
    toCommentDetail(id){
      console.log('1')
      this.$router.push(`/comment/detail/${id}`)
    },
  },

}
</script>

<style lang="less" scoped>
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>
