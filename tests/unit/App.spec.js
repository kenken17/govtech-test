import { mount, createLocalVue } from '@vue/test-utils';
import App from '@/App.vue';
import Home from '@/views/Home.vue';
import router from '@/router';

const localVue = createLocalVue();

jest.mock('@/views/Home.vue', () => ({
    name: 'Home',
    render: h => h('div')
}));

describe('App.vue', () => {
    it('renders child component via routing', () => {
        const wrapper = mount(App, {
            localVue,
            router
        });

        router.push('/');

        expect(wrapper.find(Home).exists()).toBe(true);
    });
});
