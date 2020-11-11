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
Vue.use(VeeValidate)
window.Vue = Vue;

Vue.prototype.$http = Axios; 
Vue.prototype.$apiUrl = 'http://127.0.0.1:8000/api'; 

Vue.config.productionTip = false 

Vue.use(vuetify);

const options = {
  confirmButtonColor: '#42A5F5',
  cancelButtonColor: '#FF5252',
};

Vue.use(VueSweetalert2, options);

Vue.use(VuePlyr, {
  plyr: {}
})

new Vue({ 
  render: h => h(App), 
  router,
  store,
  vuetify,
  components: { App } 
}).$mount('#app')