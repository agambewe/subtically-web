import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);


const vuetify = new Vuetify({
    theme: {
        themes: {
        light: {
            primary: '#9DB7B0',
            secondary: '#F5F5F5',
            anchor: '#7A7A7A',
        },
        },
    },
})

export default vuetify