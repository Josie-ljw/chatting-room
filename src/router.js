// import 'babel-polyfill';
// import App from './app.vue';
import VueRouter from 'vue-router';
import Player from './Player.vue';
import Login from './Login.vue';
import Chatting from './Chatting.vue';
import Messages from './Messages.vue';
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'


const router = new VueRouter({
    routes: [{
        path: '/login',
        name: 'login',
        component: Login,
    },
    // {
    //     path: 'info',
    //     components: {
    //         default: Chatting,
    //         'a': Messages
    //     }
    // },
    {
      path: '/chatroom',
      component: Chatting,
      name: 'Chatting',
    },
    {
      path: '/',
      redirect: {name: 'login'},
    },
    {
        path: '/player/:id',
        component: Player,
        name: 'player',
    }]
});

export default router;