<template>
  <div class="fillcontain">
    <div>
      <el-form :inline="true" ref="search_data" :model="search_data">
        <!-- <el-form-item label="书本筛选:">  -->
        <!-- <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>--
        <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>-->
        <!-- <el-input v-model="keyword" placeholder="根据书名或者编码筛选"></el-input>
        </el-form-item>-->
        <el-form-item>
          <!-- <el-button type="primary" size="small" icon="search" @keydown.enter="onSearchBook" @click="onSearchBook">筛选</el-button> -->
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button type="primary" size="small" icon="view" @click="onAddGood">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        :data="bookList"
        max-height="600"
        border
        :default-sort="{prop: 'date', order: 'descending'}"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
        <el-table-column prop="id" label="ID" align="center" width="60"></el-table-column>
        <el-table-column prop="title" label="书名" align="center" width="180">
          <template slot-scope="scope">
            <span>
              <a @click="toBookInfo(scope.row.id)" style="color: #4db3ff">{{ scope.row.title }}</a>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="image" label="图片" align="center" width="160">
          <template slot-scope="scope">
            <img
              style="width: 60px; height: 75px; margin: 0 auto"
              :src="scope.row.image"
              alt
              srcset
            >
          </template>
        </el-table-column>
        <el-table-column prop="isbn" label="书本条形码" align="center" width="150"></el-table-column>
        <el-table-column prop="author" label="作者" align="center" width="180"></el-table-column>
        <el-table-column prop="price" label="价格" align="center" width="120">
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="publisher" label="出版社" align="center" width="220"></el-table-column>
        <el-table-column prop="pages" label="页数" align="center" width="200"></el-table-column>
        <el-table-column prop="operation" align="center" label="操作" fixed="right" width="180">
          <template slot-scope="scope">
            <el-button type="warning" icon="edit" size="small" @click="onEditMoney(scope.row)">编辑</el-button>
            <el-button
              type="danger"
              icon="delete"
              size="small"
              @click="onDeleteBook(scope.row,scope.$index)"
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
    <!-- 弹框页面 -->
    <GoodsDialog :dialog="dialog" :form="form"></GoodsDialog>
  </div>
</template>

<script>
import GoodsDialog from "../public/GoodsDialog";

export default {
  name: "infotab",
  data () {
    return {
      keyword: '',
      bookList: [],
      tableData: [],
      allTableData: [],
      filterTableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      form: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
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
    GoodsDialog
  },
  created () {
    this.getProfile({ size: `${this.paginations.page_size}`, typeId: 0 });
  },
  methods: {
    getProfile (params) {
      // 获取表格数据
      this.$http.get("/api/adv/listByTypeId", {
        params,
      }).then(res => {
        this.bookList = res.data.data.list
        this.paginations.total = res.data.data.total
      });
    },
    showEditDialog (row, index) {
      this.dialog.show = true
      this.dialog.operation = 'edit'
      this.form = {
        good_id: row.good_id,
        book_price: row.book_price,
        price: row.price,
        number: row.number
      }
    },
    // 删除
    onDeleteBook (row, index) {
      this.$confirm({
        title: '提醒',
        content: '确定删除吗?',
        onOk: async () => {
          console.log('row', row);
          
          const res = await this.$axios.post('/api/adv/delByBookId', {
            bookid: row.id
          })
          if(res.data.data.message == 'SUCCESS') {
             this.$message.success("成功");
            this.getProfile({ size: 5, typeId: 0 });
          }else{
             this.$message.success("失败， 联系管理员");
          }
        }
      })
    },
    onAddMoney () {
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
    handleCurrentChange (page) {
      this.getProfile({ size: `${this.paginations.page_size}`, page: page - 1 })
    },
    handleSizeChange (page_size) {
      this.paginations.page_size = page_size;
      this.getProfile({ size: page_size })
    },
    toBookInfo (id) {
      this.$router.push(`/book/detail/${id}`)
    },
    onAddGood () {
      this.dialog.show = true
      this.dialog.operation = 'add'
      this.form = {
        number: 10
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

