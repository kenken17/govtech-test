import { shallowMount, createLocalVue } from '@vue/test-utils';
import store from '@/store';
import Rates from '@/components/Rates.vue';
import RatesForm from '@/components/RatesForm.vue';
import RatesTable from '@/components/RatesTable.vue';
import RatesChart from '@/components/RatesChart';
import Vuex from 'vuex';

const localVue = createLocalVue();
const factory = (data = {}, computed = {}) => shallowMount(Rates, {
    data() {
        return { ...data };
    },
    computed,
    localVue,
    store
});

localVue.use(Vuex);

describe('Rates.vue', () => {
    it('should render the Rates component', () => {
        const wrapper = factory();

        expect(wrapper.exists()).toBe(true);
    });

    it('should render the Rates Form component', () => {
        const wrapper = factory();

        expect(wrapper.find(RatesForm).exists()).toBe(true);
        expect(wrapper.find(RatesForm).isVisible()).toBe(true);
    });

    it('should render the Rates Table component', () => {
        const wrapper = factory();

        expect(wrapper.find(RatesTable).exists()).toBe(true);
        expect(wrapper.find(RatesTable).isVisible()).toBe(true);
    });

    it('should render the Rates Chart component  but not visible', () => {
        const wrapper = factory();

        expect(wrapper.find(RatesChart).exists()).toBe(true);
        expect(wrapper.find(RatesChart).isVisible()).toBe(false);
    });

    it('should render the Rates Chart copnent and visible when there is rates records', (done) => {
        const wrapper = factory({}, {
            ratesRecords() {
                return [{
                    end_of_month: '2018-01',
                    banks_fixed_deposits_3m: '0.1',
                    fc_fixed_deposits_3m: '0.2'
                }];
            }
        });

        wrapper.vm.$nextTick(() => {
            expect(wrapper.find(RatesChart).exists()).toBe(true);
            expect(wrapper.find(RatesChart).isVisible()).toBe(true);

            done();
        });
    });

});
