import Vue from 'vue'
import Vuex from 'vuex';
import VueWebsocket from 'vue-websocket'
import VueResource from 'vue-resource'
import VueNoty from 'vuejs-noty'

import App from './App.vue'
import store from './store'


Vue.use(VueNoty)
Vue.use(VueWebsocket, "ws://localhost:8080");
Vue.use(VueResource);
Vue.use(Vuex);

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
