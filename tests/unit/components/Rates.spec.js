import { shallowMount, createLocalVue } from '@vue/test-utils';
import rateModule from '@/store/modules/rateModule';
import Rates from '@/components/Rates.vue';
import RatesForm from '@/components/RatesForm.vue';
import RatesTable from '@/components/RatesTable.vue';
import RatesChart from '@/components/RatesChart';
import Vuex from 'vuex';

const localVue = createLocalVue();
const factory = (data = {}, store) => shallowMount(Rates, {
    data() {
        return { ...data };
    },
    localVue,
    store
});

localVue.use(Vuex);

describe('Rates.vue', () => {
    it('should render the Rates component', () => {
        const wrapper = factory(
            {},
            (new Vuex.Store({
                modules: {
                    rateModule
                }
            }))
        );

        expect(wrapper.exists()).toBe(true);
    });

    it('should render the Rates Form component', () => {
        const wrapper = factory(
            {},
            (new Vuex.Store({
                modules: {
                    rateModule
                }
            }))
        );

        expect(wrapper.find(RatesForm).exists()).toBe(true);
        expect(wrapper.find(RatesForm).isVisible()).toBe(true);
    });

    it('should render the Rates Table component', () => {
        const wrapper = factory(
            {},
            (new Vuex.Store({
                modules: {
                    rateModule
                }
            }))
        );

        expect(wrapper.find(RatesTable).exists()).toBe(true);
        expect(wrapper.find(RatesTable).isVisible()).toBe(true);
    });

    it('should render the Rates Chart component  but not visible', () => {
        const wrapper = factory(
            {},
            (new Vuex.Store({
                modules: {
                    rateModule
                }
            }))
        );

        expect(wrapper.find(RatesChart).exists()).toBe(true);
        expect(wrapper.find(RatesChart).isVisible()).toBe(false);
    });

    it('should render the Rates Chart component and visible when there is rates records', async () => {
        const wrapper = factory(
            {},
            (new Vuex.Store({
                modules: {
                    rateModule
                }
            }))
        );

        wrapper.vm.$store.commit('rateModule/setRatesResult', {
            records: [{
                end_of_month: '2018-01',
                banks_fixed_deposits_3m: '0.1',
                fc_fixed_deposits_3m: '0.2'
            }]
        });

        await wrapper.vm.$nextTick().then(() => {
            expect(wrapper.find(RatesChart).exists()).toBe(true);
            expect(wrapper.find(RatesChart).isVisible()).toBe(true);
        });
    });

    describe('watch: ratesRecords', () => {
        it('should populate the datacollection with empty result when rates have no value', async () => {
            const wrapper = factory(
                {},
                (new Vuex.Store({
                    modules: {
                        rateModule
                    }
                }))
            );

            wrapper.vm.$store.commit('rateModule/setRatesResult', {
                records: []
            });

            await wrapper.vm.$nextTick().then(() => {
                expect(wrapper.vm.$data.datacollection).toEqual({
                    labels: [],
                    datasets: []
                });
            });
        });

        it('should populate the datacollection when rates have a new value', async () => {
            const wrapper = factory(
                {},
                (new Vuex.Store({
                    modules: {
                        rateModule
                    }
                }))
            );

            wrapper.vm.$store.commit('rateModule/setRatesResult', {
                records: [{
                    end_of_month: '2018-01',
                    banks_fixed_deposits_3m: '0.1',
                    fc_fixed_deposits_3m: '0.2'
                }]
            });

            await wrapper.vm.$nextTick().then(() => {
                expect(wrapper.vm.$data.datacollection).toEqual({
                    labels: ['2018-01'],
                    datasets: [{
                        label: 'Banks Fixed Deposits 3 mos.',
                        borderColor: '#8cc679',
                        backgroundColor: 'transparent',
                        data: [0.1]
                    }, {
                        label: 'Finance Companies Fixed Deposits 3 mos.',
                        borderColor: '#e8587c',
                        backgroundColor: 'transparent',
                        data: [0.2]
                    }]
                });
            });
        });
    });
});
