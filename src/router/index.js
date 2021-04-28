import Vue from 'vue' 
import Router from 'vue-router'

const Login = () => import(/* webpackChunkName: "Login" */ '../components/login.vue')
const SideBar = () => import(/* webpackChunkName: "SideBar" */ '../components/sideBar.vue')
const Landing = () => import(/* webpackChunkName: "SideBar" */ '../components/landingPage.vue')

function loadVideo(video) {
    return () => import(/* webpackChunkName: "Load Video" */ `../components/video/${video}.vue`) 
}

function loadUser(user) {
    return () => import(/* webpackChunkName: "Load Video" */ `../components/user/${user}.vue`) 
}
const routes = [ 
    {
        path: '/', component: SideBar,
        children: [
            { name: 'dashboard', path: '/dashboard', component: SideBar },
            //video
            { name: 'listVideo', path: '/videos', component: loadVideo('listController') },
            { name: 'myVideo', path: '/my-videos', component: loadVideo('myController'),
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('user_id')!=3) {
                    next();
                } else{
                    next('/videos');
                } }
            },
            { name: 'viewController', path: '/video/:id', component: loadVideo('viewController') },
            // { name: 'viewLiveController', path: '/videos/live/:id', component: loadVideo('viewLiveController') },
            { name: 'storeVideo', path: '/videos/store', component: loadVideo('storeController'),
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('user_id')!=3) {
                    next();
                } else{
                    next('/videos');
                } }
            },
            // { name: 'liveVideo', path: '/videos/live', component: loadVideo('liveController') },
            { name: 'updateVideo', path: '/videos/update/:id', component: loadVideo('updateController'),
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('user_id')!=3) {
                    next();
                } else{
                    next('/videos');
                } }
            },

            //user
            { name: 'listUser', path: '/users', component: loadUser('listController'),
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('user_id')==1) {
                    next();
                } else{
                    next('/videos');
                } }
            },
            { name: 'storeUser', path: '/users/store', component: loadUser('storeController'),
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('user_id')==1) {
                    next();
                } else{
                    next('/videos');
                } }
            },
            { name: 'updateUser', path: '/users/update/:id', component: loadUser('updateController'),
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('user_id')==1) {
                    next();
                } else{
                    next('/videos');
                } }
            },
        ],
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem('user_id')) {
                next();
            } else{
                next('/home');
            }
        },  
    },
    { name: 'login',path: '/login', component: Login },
    { name: 'landing',path: '/home', component: Landing },
] 
Vue.use(Router) 

const router = new Router({
    mode: 'history', 
    routes: routes}) 
export default router