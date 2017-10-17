<template>
  <div id="player"></div>
</template>

<script>
import loadScript from 'load-script';

export default {
  data() {
    return {
      resNo: '',
      playerToken: '',
    }
  },
  created() {
    this.resNo = this.$route.query.resNo;
    this.getPlayerToken();
    // console.log(this.resNo,this.playerToken);
  },
  methods: {
    getPlayerToken() {
      this.$http.get('/player/token', {params: {resNo: this.resNo}}).then(res => {
        this.playerToken = 'private:' + res.body.playerToken;
        // console.log(this.playerToken);
      });
    }
  },
  mounted() {
    const playerSDKUri = '//service-cdn.qiqiuyun.net/js-sdk/sdk-v1.js?' + ~~(Date.now() / 1000 / 60);
    loadScript(playerSDKUri, (err) => {
        if (err) {
          throw err;
        }
        new window.QiQiuYun.Player({
          id: 'player',  // 用于初始化的DOM节点id
          resNo: this.resNo, // 想要播放的资源编号
          token: this.playerToken, // 请求播放的认证token
          playServer: '124.160.104.76:10012',
        });
    });
  },
}
</script>
