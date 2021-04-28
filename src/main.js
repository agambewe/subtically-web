import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Axios from 'axios' 
import store from './store';
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'
import * as VeeValidate from 'vee-validate'
import VueProgressBar from 'vue-progressbar'

Vue.use(VeeValidate)
window.Vue = Vue;

Vue.prototype.$http = Axios; 
// Vue.prototype.$apiUrl = 'http://subtically.com/api/api'; 
// Vue.prototype.$baseUrl = 'http://subtically.com/api';
Vue.prototype.$apiUrl = 'http://subtically.citizenscience.id/api/api'; 
Vue.prototype.$baseUrl = 'http://subtically.citizenscience.id/api';
// Vue.prototype.$apiUrl = 'http://127.0.0.1:8000/api';
// Vue.prototype.$baseUrl = 'http://127.0.0.1:8000';

Vue.config.productionTip = false 

Vue.use(vuetify);

const optionsAlert = {
  confirmButtonColor: '#42A5F5',
  cancelButtonColor: '#FF5252',
};
Vue.use(VueSweetalert2, optionsAlert);

Vue.use(VuePlyr, {
  plyr: {}
})

const optionsProgress = {
  color: '#9DB7B0',
  failedColor: '#FF5252',
  thickness: '10px',
  // transition: {
  //   speed: '1s',
  //   opacity: '0.8s',
  //   termination: 300
  // },
  // autoRevert: true,
  location: 'top',
  // inverse: false
}
Vue.use(VueProgressBar, optionsProgress)

new Vue({ 
  render: h => h(App), 
  router,
  store,
  vuetify,
  components: { App } 
}).$mount('#app')