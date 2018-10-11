import { shallowMount, createLocalVue } from '@vue/test-utils';
import store from '@/store';
import RatesForm from '@/components/RatesForm.vue';
import VeeValidate from '@/validate';
import Vuex from 'vuex';
import VueMaterial from 'vue-material';
import commonMixin from '@/mixins/commonMixin';

const localVue = createLocalVue();

localVue.use(VueMaterial);
localVue.use(Vuex);
localVue.use(VeeValidate, {
    events: ''
});

const factory = (data = {}) => shallowMount(RatesForm, {
    data() {
        return { ...data };
    },
    localVue,
    store,
    mixin: [commonMixin]
});

describe('RatesForm.vue', () => {
    it('should validate the form when submit', async () => {
        const wrapper = factory({
            startDate: 'Jan-2018',
            endDate: 'Jun-2018',
            selections: ['fixed_deposits_3m']
        });
        const validate = jest.spyOn(wrapper.vm.$validator, 'validate').mockResolvedValue(false);

        wrapper.vm.onSubmitData();

        await wrapper.vm.$nextTick().then(() => {
            expect(validate).toHaveBeenCalled();
        });
    });
});
