<template>
  <div class="comment-dialog-wrap">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      width="40%"
      center:true
    >
      <div class="form">
        <el-form
          ref="form"
          :model="form"
          label-width="120px"
          style="margin:10px auto;width:420px;"
          label-position="left"
        >
          <el-form-item
            v-if="dialog.operation === 'add'"
            label="选择书本："
          >
            <el-select
              v-model="bookinfo"
              filterable
              remote
              placeholder="请输入关键词选择对应的书本"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option
                v-for="item in filterBooks"
                :key="item.value"
                :label="item.title"
                :value="item.value+'-s-'+ item.price"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="dialog.operation === 'add'"
            label="售价："
          >
            <el-input
              type="text"
              v-model="form.price"
            ></el-input>
            <span>参考价格：{{ bookinfo.split('-s-')[1] }}</span>
          </el-form-item>
          <el-form-item
            v-if="dialog.operation === 'edit'"
            label="售价："
          >
            <el-input
              type="text"
              v-model="form.price"
            ></el-input>
            <span>参考价格：{{ form.book_price }}</span>
          </el-form-item>
          <el-form-item
            label="数量："
          >
            <el-input
              type="text"
              v-model="form.number"
            ></el-input>
          </el-form-item>

          <el-form-item class="text_right">
            <el-button @click="dialog.show = false">取 消</el-button>
            <el-button
              type="primary"
              @click="onSubmit('form')"
            >提 交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dialogsection",
  props: {
    dialog: Object,
    form: Object
  },
  data() {
    return {
      filterBooks: [],
      bookinfo: "",
      loading: false
    };
  },
  mounted() {},
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialog.operation === "add") {
            let params = {
              price: this.form.price,
              book_id: this.bookinfo.split("-s-")[0],
              number: this.form.number
            };
            console.log("添加商品params", params);
            this.$axios.post("/api/shop/addgood", params).then(res => {
              if (res.data.data.message === "SUCCESS") {
                this.$message.success("成功");
                this.dialog.show = false;
                this.$parent.getGoodsList();
              } else {
                this.$message.error("失败");
              }
            });
          } else {
            let params = {
              good_id: this.form.good_id,
              price: this.form.price,
              number: this.form.number
            };
            console.log("更新params", params);
            this.$axios.post("/api/shop/editgood", params).then(res => {
              if (res.data.data.message === "SUCCESS") {
                this.$message.success("成功");
                this.dialog.show = false;
                this.$parent.getGoodsList();
              } else {
                this.$message.error("失败");
              }
            })
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleChange(value) {
      console.log(value);
    },
    remoteMethod(query) {
      console.log("query", query);
      if (query !== "") {
        this.getBookMapByName(query);
      } else {
        this.filterBooks = [];
      }
    },
    getBookMapByName(query) {
      this.$axios
        .get("/api/book/bookmap", {
          params: {
            bookname: query
          }
        })
        .then(res => {
          this.loading = false;
          console.log("res", res);
          this.filterBooks = res.data.data.list;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

