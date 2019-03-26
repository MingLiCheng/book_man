<template>
    <section class="header-wrap">
        <div class="left-wrap">
            <h1 class="title">平台管理系统</h1>
        </div>
        <div class="right-wrap">
            <div class="userInfo-box">
                <UserInfo></UserInfo>
            </div>
        </div>
    </section>
</template>

<script>
import UserInfo from './../public/UserInfo'
import { Modal } from 'ant-design-vue'
export default {
    components: {
        UserInfo,
        Modal
    },
    data() {
        return {

        }
    },
    methods: {
        quite() {
            Modal.confirm({
                title: '提醒',
                content: '确定退出吗?',
                onOk: () => {
                    localStorage.clear();
                    this.$router.push('/signin')
                }
            });
        }
    },
}
</script>

<style lang="less" scoped>
.header-wrap{
    height: 100%;
    width: 100%;
    background-color: #3c8dbc;
    display: flex;
    justify-content: space-between;
    .left-wrap{
        width: 20%;
        height: 100%;
        margin: 0 20px;
        line-height: 80px;
        .title{
            font-family: STXingkai;
            font-size: 50px;
            color: #fff;
        }
    }
    .right-wrap{
        width: 20%;
        height: 100%;
        margin: 0 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        .userInfo-box{
            width: 200px;
            height: 40px;
        }
    }
}
</style>

