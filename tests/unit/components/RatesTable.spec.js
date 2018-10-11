import { shallowMount, createLocalVue } from '@vue/test-utils';
import store from '@/store';
import RatesTable from '@/components/RatesTable.vue';
import Vuex from 'vuex';
import VueMaterial from 'vue-material';

const localVue = createLocalVue();
const factory = (data = {}, computed = {}) => shallowMount(RatesTable, {
    data() {
        return { ...data };
    },
    computed,
    localVue,
    store
});

localVue.use(VueMaterial);
localVue.use(Vuex);

describe('RatesTable.vue', () => {
    it('should render the Rate Table component', () => {
        const wrapper = factory();

        expect(wrapper.exists()).toBe(true);
    });
});
