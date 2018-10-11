import { shallowMount, createLocalVue } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import Rate from '@/components/Rate.vue';

const localVue = createLocalVue();
const factory = (data = {}) => shallowMount(Home, {
    data() {
        return { ...data };
    },
    localVue
});

describe('Home.vue', () => {
    it('should render the Home component', () => {
        const wrapper = factory();

        expect(wrapper.exists()).toBe(true);
    });

    it('should render the Rate component and visible', () => {
        const wrapper = factory();

        expect(wrapper.find(Rate).exists()).toBe(true);
        expect(wrapper.find(Rate).isVisible()).toBe(true);
    });
});
