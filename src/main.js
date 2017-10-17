import 'babel-polyfill';
import App from './app.vue';
import VueRouter from 'vue-router';
import Vue from 'vue';
// import Login from './Login.vue';
// import Chatting from './Chatting.vue';
// import Messages from './Messages.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'
import router from './router';
import VueResource from 'vue-resource';
import VueCookie from 'vue-cookie';

Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(VueCookie);
Vue.use(VueRouter);

// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'my_db'
// });
// this.$router.push('/user');
// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

// connection.end();


// Vue.use(VueRouter);
// Vue.use(ElementUI);

// const router = new VueRouter({
//     routes: [
//     {
//         path: '/login',
//         name: 'userInfo',
//         component: User,
//         children: [
//             {
//                 path: 'detail/:id',
//                 name: 'details',
//                 component: Activity,
//                 beforeEnter: function(to, from, next){
//                     console.log(to);
//                     // alert(22);
//                     next();
//                 }
//             },
//             {
//                 path: 'info',
//                 components: {
//                     default: Activity,
//                     'a': Messages
//                 }
//             }

//         ]
//     },
//     ]
// });

// router.beforeEach((to, from, next) => {
//     const login = false;
//     if (!login && !(to.fullpath === '/user/info' )) {
//         next('/user/info');
//     } else {
//         next();
//     }
// });

new Vue({
    el: '#app',
    router,
    render: h => h(App),
    // visible: false
});

//.$mount('#app') 和用 el:'#app' 效果一样