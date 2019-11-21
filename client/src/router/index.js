import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Auth from '../components/Auth/Auth.vue';
import ForgotPassword from '../components/Auth/ForgotPassword.vue';
import MainPage from '../components/MainPage/MainPage.vue';

const routes = [
  { path: '/', component: MainPage },
  { path: '/auth', component: Auth },
  { path: '/forgotpassword', component: ForgotPassword },
  { path: '*', redirect: '/' }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
