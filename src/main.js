import Cookies from 'js-cookie'
import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import VueResource from 'vue-resource'
import VueNoty from 'vuejs-noty'
import VueChatScroll from 'vue-chat-scroll'

import App from './App.vue'
import store from './store'

Vue.use(VueChatScroll);
Vue.use(VueNativeSock, 'ws://localhost:8000/ws/chat/', { store: store, format: 'json'});
Vue.use(VueNoty, {timeout: 4000, progressBar: true, layout: 'topRight'});
Vue.use(VueResource);
Vue.http.headers.common['X-CSRFToken'] = Cookies.get('csrftoken');

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
