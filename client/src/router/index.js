import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Auth from '../components/Auth/Auth.vue';
import MainPage from '../components/MainPage/MainPage.vue';

const routes = [
  { path: '/', component: Auth },
  { path: '/feed', component: MainPage }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
