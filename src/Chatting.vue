<template>
    <div class="chatting-box">
      <div class="name-borad"><img src="./img/name-borad.png">
        <div class="my-name" v-model="myName">{{ user }}</div>
      </div>
      <div class="user-list-box">
        <div class="user-list-title">用户列表：<button class="hall-room" @click="gohall()">大厅</button></div>
        <ul class="user-name-list" v-for="(user, index) in users" @click="private(user)">
          <li>
            <el-badge :value="msgNums[user]" :max="99" class="item">
              {{ user }}
            </el-badge>
          </li>
        </ul>
      </div>
      <div class="chatting-content">
        <div class="room-name">{{ area }}<button class="btn-exit hall-room" @click="leave()">退出</button></div>
        <ul class="hall-chattingroom">
          <li v-bind:class="{selfMsg : list.author==user , otherMsg: isOther }" v-for="(list,index) in msgstr" v-if="(list.toName!='大厅')&&((list.toName==area&&list.author==user) || (list.toName==user&&list.author==area))">
            <span class="author-name">{{list.author}}</span>
            <div class="chat-msg" v-if="(list.type=='notify')">{{list.msg}}</div>
            <div class="chat-msg" v-else-if="(list.type!=='notify')">
              <router-link :to="{path: '/player/token?resNo=' + list.resNo}" target="_blank">这是一个视频文件，点击打开</router-link>
            </div>
          </li>
          <li v-bind:class="{selfMsg : list.author==user , otherMsg: isOther }" v-for="(list,index) in msgstr" v-if="(list.toName=='大厅')&&(area=='大厅')">
            <span class="author-name">{{list.author}}</span>
            <div class="chat-msg" v-if="(list.type=='notify')">{{list.msg}}</div>
            <div class="chat-msg" v-else-if="(list.type!=='notify')">
              <router-link :to="{path: '/player/token?resNo=' + list.resNo}" target="_blank">这是一个视频文件，点击打开</router-link>
            </div>
          </li>
        </ul>
      </div>
      <div class="send-message">
        <div class="send-file">
          <div class="el-icon-document" @click="dialogVisible = true"></div>
        </div>
        <textarea class="message-area" placeholder="在这里输入聊天消息" v-model="message" @keyup.enter="sendAll()"></textarea>
        <el-dialog title="课件选择" :visible.sync="dialogVisible">
          <div class="block">
            <el-button type="success" @click="sendFile('56e61a5c78e74dc9ac0c0359efe0c75f')">课件1</el-button>
            <el-button type="warning" @click="sendFile('56e61a5c78e74dc9ac0c0359efe0c75f')">课件2</el-button>
            <el-button type="danger" @click="sendFile('6b96aebadf6444fe8336a21d05965a6a')">课件3</el-button>
            <el-button type="info" @click="sendFile('1f4991567c9841e3ab5bc37302936afe')">课件4</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
</template>

<script>

import io from 'socket.io-client';

var socket = io.connect('192.168.18.219:8089');
export default {
  name: 'Chatting',
  data() {
    return {
      message:'',
      myName: '',
      user: '',
      // sendMessage: '',
      dialogVisible: false,
      dialogPlayVisible: false,
      area: '大厅',
      users: [],
      userName: '',
      data:{},
      messageBox: [],
      index: null,
      list: '',
      messages: [],
      // publicmsglist: [],
      // singlemsglist: [],
      msgstr: [],
      msgNums: {},
      resNo: '',
      playerToken: '',
      isSelf: false,
      isOther: true,
    }
  },
  created() {
    this.user = this.$cookie.get('currentUser');
    socket.emit('user join', {user: this.user, fromUser: this.area});
    if (!this.user) {
      this.$router.push({name: 'login'});
    }
    if(this.user == '') {
      redirect: {name: 'login'}
    }
    let self = this;
    socket.on('sendmsg', function(data) {
      self.users = data.users;
      self.messages.push(data);
    });
    socket.on('hallchat', function(data) {
      // console.log(data)
      if(data.author==self.user) {
        self.isSelf = true;
        self.isOther = false;
        // console.log(self.isSelf,11)
      }else if (data.author!=self.user) {
        self.isSelf = false;
        self.isOther = true;
        // console.log(self.isSelf,22)
      }
      if((!self.msgNums[data.author])&&(self.area !== data.author)&&(data.toName==self.user)) {
        self.msgNums[data.author] = 0;
      }
      if((data.author !== self.user)&&(self.area !== data.author)&&(data.toName==self.user)) {
        self.msgNums[data.author] ++;
      }
      self.msgstr.push(data);
    });
    socket.on('goodbye', (users) => {
      this.users = users;
      this.$message({
        message: this.user+'退出了群聊',
      });
    });
  },
  methods: {
    sendAll: function(data) {
      var halldata = {};
      var type = 'notify';
      var resno = '';
      halldata.msg = this.message;
      halldata.author = this.user;
      halldata.toName = this.area;
      if(data) {
        halldata.type = data.type;
        halldata.resNo = data.resNo;
      }else {
        halldata.type = type;
        halldata.resNo = resno;
      }
      var strValue = this.message.replace(/\n/g,'');
      if((halldata.type=='notify')&&(strValue!=='')) {
        socket.emit('sayall', halldata);
      } else if (halldata.type=='file') {
        socket.emit('sayall', halldata);
      }
      this.message = '';
    },
    private: function(user) {
        this.area = user;
        this.msgNums[user] = 0;
    },
    gohall: function() {
      this.area = '大厅';
    },
    leave: function() {
      var author = this.user;
      this.$cookie.delete('currentUser');
      socket.emit('leave');
      this.$router.push({name: 'login'});
    },
    sendFile(resNo) {
      var resdata = {};
      resdata.type = 'file';
      resdata.resNo = resNo;
      this.sendAll(resdata);
      this.dialogVisible = false;
    }
  }
}

</script>

<style lang="less" scoped>
  .room-name {
    line-height: 45px;
    padding: 0 10px;
    background: #f0f0f0;
    border-bottom: #ddd 1px solid;
  }
  .hall-room {
    float: right;
    margin-top: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
  }
  .user-list-title {
    padding-left: 10px;
    text-align: left;
    padding-right: 10px;
    line-height: 45px;
    border-bottom: 1px solid #ddd;
  }
  .btn-exit {
    float: right;
    margin-top: 10px;
  }
  .my-name {
    position: absolute;
    left: 50px;
    top: 73px;
    text-align: center;
    font-size: 18px;
    overflow: hidden;
    width: 120px;
    line-height: 45px;
    padding: 0 9px;
  }
  .name-borad {
    position: absolute;
    left: 0;
  }
  .name-borad img{
    height: auto;
    overflow: auto;
    width: 200px;
    float: left;
    margin-left: 20px;
  }
</style>