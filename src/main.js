import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

import store from '@/store';
import Vue from 'vue';
import VueMaterial from 'vue-material';
import VeeValidate from './validate';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.use(VeeValidate);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
