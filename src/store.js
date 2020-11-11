import Vue from 'vue' 
import Vuex from 'vuex';

Vue.use(Vuex);

import side from './stores/side';
import user from './stores/user';

const vuex_store = new Vuex.Store({
    modules: {
        side,
        user
    },
});

export default vuex_store;