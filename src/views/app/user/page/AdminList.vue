<template>
  <div class="fillcontain">
    <div>
      <el-form :inline="true" ref="search_data" :model="search_data">
        <el-form-item label="管理员账号管理:">
          <!-- <el-input v-model="keyword" placeholder="根据书名或者编码筛选"></el-input> -->
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" size="small" icon="search" @keydown.enter="onSearchBook" @click="onSearchBook">筛选</el-button> -->
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button type="primary" size="small" icon="view" @click="onAddAdmin">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        :data="adminlist"
        max-height="700"
        border
        :default-sort="{prop: 'date', order: 'descending'}"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
        <el-table-column prop="user_id" label="ID" align="center" width="100"></el-table-column>
        <el-table-column prop="username" label="姓名" align="center" width="160"></el-table-column>
        <el-table-column prop="username" label="邮箱" align="center" width="180">
          <template slot-scope="scope">
            <span>
              <a @click="toBookInfo(scope.row.email)" style="color: #4db3ff">{{ scope.row.email }}</a>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="password" label="密码" align="center" width="200"></el-table-column>
        <el-table-column prop="tel" label="联系电话" align="center" width="200"></el-table-column>
        <el-table-column prop="authority" label="authority" align="center" width="150"></el-table-column>
        <el-table-column prop="authority" label="权限" align="center" width="150">
          <template slot-scope="scope">
            <el-switch
              :value="scope.row.authority == 1 ? true : false"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeAuthority(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="operation" align="center" label="操作" fixed="right" width="160">
          <template slot-scope="scope">
            <el-button type="warning" icon="edit" size="small" @click="onEditAdmin(scope.row)">编辑</el-button>
            <el-button
              type="danger"
              icon="delete"
              size="small"
              @click="onDeleteAdmin(scope.row.user_id,scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹框页面 -->
    <AddAdminDialog :dialog="dialog" :form="form" :getAdminList="getAdminList"></AddAdminDialog>
  </div>
</template>

<script>
import AddAdminDialog from "@/components/public/AddAdminDialog";

export default {
  name: "infotab",
  data () {
    return {
      keyword: '',
      adminlist: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      form: {
        username: '',
        email: '',
        password: '',
        tel: '',
      },
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 100, // 总数
        page_size: 5, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      search_data: {
        startTime: "",
        endTime: ""
      },
    };
  },
  components: {
    AddAdminDialog
  },
  created () {
    this.getAdminList()
  },
  methods: {
    // 获取管理员列表
    async getAdminList () {
      // 获取表格数据
      const admins = await this.$axios.get("/api/admin/list")
      this.adminlist = admins.data.data.admins
    },
    onEditAdmin (row) {
      // 编辑
      this.dialog = {
        show: true,
        title: "编辑管理员信息",
        option: "edit"
      };
      this.form = {
        user_id: row.user_id,
        username: row.username,
        password: row.password,
        email: row.email,
        tel: row.tel
      };
    },
    // 删除
    onDeleteAdmin (adminid, index) {
      this.$confirm({
        title: '提醒',
        content: '确定删除吗?',
        onOk: async () => {
          const res = await this.$axios.post('/api/admin/delById', {
            user_id: adminid
          })
          if (res.data.data.message == 'SUCCESS') {
            this.$message.success('删除成功')
            this.getAdminList()
          } else {
            this.$message.error('删除失败')
          }
        }
      })
    },
    onAddAdmin () {
      // 添加
      this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add"
      };
      this.form = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      };
    },
    async changeAuthority (row) {
      console.log('1');
      
      let res
      if (row.authority == 1) {
        res = await this.$axios.post('/api/admin/editById', {
          user_id: row.user_id,
          authority: 0
        })
      } else {
        res = await this.$axios.post('/api/admin/editById', {
          user_id: row.user_id,
          authority: 1
        })
      }
      if(res.data.data.message == 'SUCCESS') {
        this.$message.success = '成功'
        this.getAdminList()
      }else{
        this.$message.error = '失败'
        this.getAdminList()
      }

    }
  }
};
</script>
<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>
