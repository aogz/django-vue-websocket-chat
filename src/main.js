import Cookies from 'js-cookie'
import Vue from 'vue'
import VueWebsocket from 'vue-websocket'
import VueResource from 'vue-resource'
import VueNoty from 'vuejs-noty'

import App from './App.vue'
import store from './store'


Vue.use(VueNoty)
// Vue.use(VueWebsocket, "ws://localhost:8000");
Vue.use(VueResource);
Vue.use(VueNoty, {timeout: 4000, progressBar: true, layout: 'topRight'})
Vue.http.headers.common['X-CSRFToken'] = Cookies.get('csrftoken');

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
