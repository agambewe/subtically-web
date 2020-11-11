import Vue from 'vue' 
import Router from 'vue-router'

const Login = () => import(/* webpackChunkName: "Login" */ '../components/login.vue')
const SideBar = () => import(/* webpackChunkName: "SideBar" */ '../components/sideBar.vue')

function loadVideo(video) {
    return () => import(/* webpackChunkName: "Load Video" */ `../components/video/${video}.vue`) 
}

function loadUser(user) {
    return () => import(/* webpackChunkName: "Load Video" */ `../components/user/${user}.vue`) 
}
const routes = [ 
    {
        path: '/dashboard', component: SideBar,
        children: [
            //video
            { name: 'myVideo', path: '/my-videos', component: loadVideo('myController') },
            { name: 'listVideo', path: '/videos', component: loadVideo('listController') },
            { name: 'viewController', path: '/video/:id', component: loadVideo('viewController') },
            { name: 'storeVideo', path: '/videos/store', component: loadVideo('storeController') },
            { name: 'liveVideo', path: '/videos/live', component: loadVideo('liveController') },
            { name: 'updateVideo', path: '/videos/update/:id', component: loadVideo('updateController') },

            //user
            { name: 'listUser', path: '/users', component: loadUser('listController') },
            { name: 'storeUser', path: '/users/store', component: loadUser('storeController') },
            { name: 'updateUser', path: '/users/update/:id', component: loadUser('updateController') },
        ]
    },
    { name: 'login',path: '/login', component: Login },
] 
Vue.use(Router) 

const router = new Router({
    mode: 'history', 
    routes: routes}) 
export default router