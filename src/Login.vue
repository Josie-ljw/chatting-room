<template>
  <div>
    <!-- <router-view></router-view> -->
    <!-- <router-view name="a"></router-view> -->
    <p>哥们儿，留个名吧</p>
    <input type="text" v-model="newName" v-on:keyup.enter="login">
    <button @click="login">跳转</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        newName : '',
      }
    },
    name: 'Login',
    // beforeRouteEnter: function(to, form, next){
    //     alert('路由进入前');
    //     next();
    // },
    // beforeRouteLeave: function(to, form, next){
    //     alert('路由退出前');
    //     next();
    // }
    // data(){
    //     return {
    //         val : 'hello'
    //     }
    // }
    methods: {
      login() {
        this.$http.post('/login', {username: this.newName}).then(res => {
          if (res.body.success) {
            this.$message({
              message: '恭喜，登录成功',
              type: 'success',
            });
            this.$cookie.set('currentUser', res.body.username, 1);
            this.$router.push({name: 'Chatting'});
          } else if (res.body.existed) {
            this.$message({
              message: '用户名已存在,请重新输入',
              type: 'error',
            });
          } else {
            this.$message({
              message: '登录失败，请重试',
              type: 'error',
            });
          }
        })
      },
    }
  }
</script>

<style>
  .login-item {
    text-align: center;
    font-size: 18px;
  }
</style>