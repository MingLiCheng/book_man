<template>
  <section class="goodslist-wrap">
    <div>
      <el-form :inline="true" ref="search_data">
        <el-form-item label="书本筛选:">
          <!-- <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>--
          <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>-->
          <el-input v-model="keyword" placeholder="根据书名或者编码筛选"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="search"
          >筛选</el-button>
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button type="primary" size="small" icon="view" @click="onAddGood">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        :data="goodsList"
        max-height="600"
        border
        :default-sort="{prop: 'date', order: 'descending'}"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>

        <el-table-column prop="title" label="标题" align="center" width="320">
          <template slot-scope="scope">
            <span style="color:#4db3ff">
              <a
                @click="toGoodDetail(scope.row.good_id)"
                style="color: #4db3ff"
              >{{ scope.row.title }}</a>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="图片" align="center" width="320">
          <template slot-scope="scope">
            <img style="width: 60px; height: 75px; margin: 0 auto" :src="scope.row.image">
          </template>
        </el-table-column>
        <el-table-column label="作者" align="center" width="400">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column label="价格" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剩余数量" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品id" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.good_id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="图书id" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.book_id }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" align="center" label="操作" fixed="right" width="180">
          <template slot-scope="scope">
            <el-button
              type="warning"
              icon="edit"
              size="small"
              @click="showEditDialog(scope.row,scope.$index)"
            >编辑</el-button>
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
  </section>
</template>

<script>
export default {
  data() {
    return {
      keyword:'',
      dialog: {
        show: false,
        operation: ''
      },
      form: {},
      goodsList: [],
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
    this.getGoodsList()
  },
  methods: {
    toUserInfo(id) {
      this.$router.push(`/user/userinfo/${id}`)
    },
    handleCurrentChange(page) {

    },
    handleSizeChange(page_size) {
      this.paginations.page_size = page_size;

    },
    getGoodsList() {
      let params = {
        typeId : 1
      }
      this.$axios.get('/api/adv/listByTypeId', {
        params
      }).then(res => {
        this.goodsList = res.data.data.list
        console.log('res', res)
      })
    },
    onDeleteUser(row, index) {
      this.$message.error('暂不支持')
    },
    showEditDialog(row, index) {
      this.dialog.show = true
      this.dialog.operation = 'edit'
      this.form = {
        good_id: row.good_id,
        book_price: row.book_price,
        price: row.price,
        number: row.number
      }
    },
    toGoodDetail(id) {
      console.log('id', id)
      //   this.$router.push(`/comment/detail/${id}`)
    },
    onAddGood() {
      this.dialog.show = true
      this.dialog.operation = 'add'
      this.form = {
        number: 10
      }
    }
  },

}
</script>

<style lang="less" scoped>
.goodslist-wrap {
  .btnRight {
    float: right;
  }
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>

