<template>
  <section class="home-wrap">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="card kjfs">
          <p class="title">
            <i class="el-icon-menu"></i>快捷方式
          </p>
          <ul>
            <li>
              <router-link to="/book/list" class="kjfs kjfs-bluee">
                <span>
                  <a-icon type="book" style="font-size: 40px;"/>
                </span>
                <span>书本列表</span>
              </router-link>
            </li>
            <li>
              <router-link to="/shop/list" class="kjfs kjfs-pinkk">
                <span>
                  <i style="font-size: 40px;" class="el-icon-goods"></i>
                </span>
                <span>商品管理</span>
              </router-link>
            </li>
            <li>
              <router-link to="/comment/list" class="kjfs kjfs-yelloww">
                <span>
                  <a-icon type="aliwangwang" style="font-size: 40px;"/>
                </span>
                <span>ISSUE列表</span>
              </router-link>
            </li>
          </ul>
          <ul>
            <li>
              <router-link to="/shop/orderlist" class="kjfs kjfs-grennn">
                <span>
                  <a-icon style="font-size: 40px;" type="file-text"/>
                </span>
                <span>订单管理</span>
              </router-link>
            </li>
            <li>
              <router-link to="/user/list" class="kjfs kjfs-purplee">
                <span>
                  <a-icon style="font-size: 40px;" type="user-add"/>
                </span>
                <span>管理员权限</span>
              </router-link>
            </li>
            <li>
              <router-link to="/advertisement/booklist" class="kjfs kjfs-lightBluee">
                <span>
                  <a-icon style="font-size: 40px;" type="crown"/>
                </span>
                <span>广告管理</span>
              </router-link>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card dbsx">
          <p class="title">
            <a-icon type="file-text"/>待办事项
          </p>
          <ul>
            <li>
              <router-link to="#">
                <span>全部订单</span>
                <span class="num">{{ allNumber }}</span>
              </router-link>
            </li>
            <li>
              <a href="#weifahuo">
                <span>待发货</span>
                <span class="num">{{ noFahuoNumber }}</span>
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <router-link to="#">
                <span>未支付</span>
                <span class="num">{{ noPayNumber }}</span>
              </router-link>
            </li>
            <li>
              <router-link to="#">
                <span>未收货</span>
                <span class="num">{{ noShouhuoNumber }}</span>
              </router-link>
            </li>
          </ul>
          <div class="allPayPrice">￥{{ allPayPrice | priceFormat }}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card bbxx">
          <p class="title">
            <span>
              <a-icon type="hdd"/>版本信息
            </span>
            <span style="color: #409EFF;cursor: pointer;" @click="shuxin">刷新</span>
          </p>
          <div class="table">
            <p>
              <span class="tit">欢迎使用</span>思多多后台管理系统
            </p>
            <p>
              <span class="tit">当前版本</span>v1.0.0
            </p>
            <p>
              <span class="tit">基于框架</span>vue2 + element-ui + ant-design-vue
            </p>
            <p>
              <span class="tit">开源地址</span>
              <span class="gitbox">
                <a target="_blank" href="https://github.com/MingLiCheng/book_man">
                  <el-button type="primary" icon="el-icon-download" size="small">github</el-button>
                </a>
              </span>
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <line-echarts id="lineEcharts" height="300px" ref="echarts"></line-echarts>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="table_container" id="weifahuo">
          <el-table
            v-loading="loading"
            :data="orderlist"
            max-height="700"
            border
            :default-sort="{prop: 'date', order: 'descending'}"
            style="width: 100%"
          >
            <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
            <el-table-column prop="order_number" label="订单编号" align="center" width="330"></el-table-column>
            <el-table-column prop="trade_status" label="订单状态" align="center" width="160">
              <template slot-scope="scope">
                <span v-if="scope.row.trade_status == 1" style="color: red;">待发货</span>
              </template>
            </el-table-column>
            <el-table-column prop="pay_status" label="支付状态" align="center" width="160">
              <template slot-scope="scope">
                <span v-if="scope.row.pay_status == 1" style="color: green;">已支付</span>
              </template>
            </el-table-column>
            <el-table-column prop="order_amount" label="订单金额" align="center" width="160">
              <template slot-scope="scope">
                <span>{{ scope.row.order_amount | priceFormat }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="open_id" label="用户" align="center" width="320">
              <template slot-scope="scope">
                <span>
                  <a style="color: #4db3ff">{{ scope.row.open_id }}</a>
                </span>
              </template>
            </el-table-column>

            <el-table-column prop="operation" align="center" label="操作" fixed="right" width="160">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="edit"
                  size="small"
                  @click="openFahuo(scope.row.order_id)"
                >发货</el-button>
                <el-button
                  type="primary"
                  icon="edit"
                  size="small"
                  @click="openFahuo(scope.row.order_id)"
                >发货</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import LineEcharts from '../../../components/assets/ECharts/lineEcharts'
import { Message } from 'element-ui'
export default {
  name: 'mainIndex',
  components: { LineEcharts },
  data () {
    return {
      orderlist: [],
      allNumber: 0,
      noPayNumber: 0,
      noFahuoNumber: 0,
      noShouhuoNumber: 0,
      loading: false,
      allPayPrice: 0,
    }
  },
  created () {
    // this.getOrderListByTradeStatus()
  },
  mounted () {
    // setInterval(() => {
    this.selfAdaption()
    this.getOrderTotalInfo()
    this.getOrderListByTradeStatus()

    // }, 1000);
    // this.selfAdaption()
    // this.getOrderTotalInfo()
  },
  methods: {
    shuxin () {
      this.selfAdaption()
      this.getOrderTotalInfo()
      this.getOrderListByTradeStatus()
    },
    // echart自适应
    selfAdaption () {
      let that = this
      setTimeout(() => {
        window.onresize = function () {
          if (that.$refs.echarts) {
            that.$refs.echarts.chart.resize()
          }
        }
      }, 10)
    },
    async getOrderListByTradeStatus () {
      const orders = await this.$axios.post('/api/order/list', {
        trade_status: '1' //已经支付的订单--等待发货
      })
      this.orderlist = orders.data.data.list
    },
    // 获取订单的数量信息
    async getOrderTotalInfo () {
      const info = await this.$axios.get('/api/order/info/orderTotal')
      this.allNumber = info.data.data.all
      this.noPayNumber = info.data.data.noPay
      this.noFahuoNumber = info.data.data.noFahuo
      this.noShouhuoNumber = info.data.data.noShouhuo
      this.allPayPrice = info.data.data.payPrice
    },
    openFahuo (order_id) {
      this.$prompt('请输入邮箱', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
        inputPattern: /\d{10}/,
        inputErrorMessage: '请输入10位数字'
      }).then(({ value }) => {
        this.loading = true
        setTimeout(async () => {
          // 改变状态
          const res = await this.$axios.post('/api/order/editStatus', {
            trade_status: '2', //已发货
            order_id
          })
          if (res.data.data.message == 'SUCCESS') {
            Message.success('发货成功')
          } else {
            Message.error('失败，未知错误')
          }
          this.loading = false
          this.getOrderListByTradeStatus()
          this.getOrderTotalInfo()
        }, 1000);
      }).catch(() => {
        console.log('this', this);
        Message.info('取消输入')
      });
    }
  }
}
</script>

<style lang="less">
.home-wrap {
  .card {
    color: #666;
    border-radius: 5px;
    -webkit-box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.2);
    height: 350px;
    .title {
      font-size: 14px;
      padding: 10px;
      i {
        margin-right: 5px;
      }
    }
    ul {
      display: flex;
      margin: 0px;
      padding: 0px;
      li {
        list-style: none;
        flex: 1;
        a {
          color: #666666;
          align-items: center;
          padding-top: 20px;
          padding-bottom: 20px;
          display: flex;
          flex-direction: column;
          span {
            height: 44px;
          }
          .num {
            line-height: 44px;
            font-size: 42px;
            color: blue;
            margin: 0px;
          }
        }
        .kjfs-bluee {
          color: blue;
        }
        .kjfs-pinkk {
          color: pink;
        }
        .kjfs-yelloww {
          color: yellow;
        }
        .kjfs-grennn {
          color: green;
        }
        .kjfs-purplee {
          color: purple;
        }
        .kjfs-lightBluee {
          color: lightBlue;
        }
        &:hover {
          .kjfs-bluee {
            color: #ffffff;
            background: blue;
          }
          .kjfs-pinkk {
            color: #ffffff;
            background: pink;
          }
          .kjfs-yelloww {
            color: #ffffff;
            background: yellow;
          }
          .kjfs-grennn {
            color: #ffffff;
            background: green;
          }
          .kjfs-purplee {
            color: #ffffff;
            background: purple;
          }
          .kjfs-lightBluee {
            color: #ffffff;
            background: lightBlue;
          }
        }
      }
    }
  }
  .bbxx {
    padding: 5px 20px;
    .title {
      display: flex;
      justify-content: space-between;
    }
    .table {
      padding: 21px;
      p {
        padding: 0;
        margin: 0;
        height: 52px;
        line-height: 52px;
        border: 1px solid #cccccc;
        overflow: hidden;
        border-top: none;
        display: flex;

        span {
        }
        .tit {
          width: 90px;
          min-width: 90px;
          height: 100%;
          text-align: center;
          border-right: 1px solid #cccccc;
          margin-right: 18px;
        }
        span.gitbox {
          flex: 1;
          height: 100%;
          overflow: hidden;
          display: flex;
          a {
            &:first-child {
              margin-right: 30px;
            }
          }
        }
      }
      p:first-child {
        border-top: 1px solid #cccccc;
      }
    }
  }
  .dbsx {
    .allPayPrice {
      position: absolute;
      background-color: rgba(9, 73, 250, 0.541);
      height: 60px;
      width: 293px;
      border-radius: 5px;
      top: 2%;
      left: 41%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40px;
      font-weight: 500;
      color: #ffffff;
    }
  }
  #lineEcharts {
    margin-top: 30px;
    padding-top: 30px;
    background: #fff;
    border-radius: 5px;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.2);
    .title {
      font-size: 14px;
      padding: 10px;
      i {
        margin-right: 5px;
      }
    }
  }
  .table_container {
    margin-top: 30px;
    padding-top: 30px;
    background: #fff;
    border-radius: 5px;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.2);
    .title {
      font-size: 14px;
      padding: 10px;
      i {
        margin-right: 5px;
      }
    }
  }
}
</style>
