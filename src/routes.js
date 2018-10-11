import Home from './views/Home.vue';
import Rate from './components/Rate.vue';

const routes = [{
    path: '/',
    name: 'home',
    component: Home
}, {
    path: '/home',
    name: 'home2',
    component: Rate

}];

export default routes;
