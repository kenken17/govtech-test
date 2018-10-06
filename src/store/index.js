import Vue from 'vue';
import Vuex from 'vuex';
import rateModule from '@/store/modules/rateModule';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        rateModule
    }
});

export default store;
