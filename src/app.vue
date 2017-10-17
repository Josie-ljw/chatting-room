<template>
    <div class="login-item">
        <!-- {{ message }} -->
        <router-view></router-view>
        <!-- <router-link :to="{ name: 'details' }" > 首页 </router-link> -->
        <!-- <router-link :to="{ path: '/login' }" tag="li"> toUser </router-link> -->
        <!-- <router-link to="/login" replace> 登录 </router-link> -->
        <!-- <router-link to="/chat/detail"> DETAIL </router-link> -->
        <!-- <router-link :to="val"> 123123 </router-link> -->
        <!-- <button @click="goto">跳转</button> -->

        <!-- <my-text></my-text> -->

    </div>

</template>

<script>
    import myText from './test.vue';
    export default {
        components: {
            'my-text': myText
        },
        data() {
            return {
                message: "hello josie",
                val: '/chatroom/info'
            }
        },
        methods: {
            // goto: function(){
            //     console.log(this.$router);
            //     this.$router.go(0);
            //     // this.$router.push('/user');
            // }
        }
    }
</script>

<style lang="less">
@import './less/main.less';
  // .name-borad img{
  //   height: auto;
  //   width: 200px;
  //   float: left;
  //   margin-left: 20px;
  //   // background-size: contain;
  //   // background-repeat: no-repeat;
  //   // margin-left: 200px;
  //   // background: url('');
  // }
</style>


