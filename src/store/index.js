import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import rateModule from '@/store/modules/rateModule';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    key: 'vuex',
    storage: window.localStorage
});

const store = new Vuex.Store({
    modules: {
        rateModule
    },
    plugins: [vuexLocal.plugin]
});

export default store;
