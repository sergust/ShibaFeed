import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';

Vue.use(VueRouter);

import Auth from '../components/Auth/Auth.vue';
import ForgotPassword from '../components/Auth/ForgotPassword.vue';
import MainPage from '../components/MainPage/MainPage.vue';
import editPost from '../components/Feed/editPost.vue';
import Profile from '../components/Profile/Profile.vue';

const routes = [
  { path: '/', component: MainPage },
  {
    path: '/auth',
    component: Auth,
    beforeEnter: (to, from, next) => {
      if (
        store.getters.getToken === '' ||
        store.getters.getToken === undefined
      ) {
        next();
      } else next('/');
    }
  },
  { path: '/forgotpassword', component: ForgotPassword },
  { path: '/:postId', name: 'post', component: editPost },
  { path: '/user/:userId', name: 'profile', component: Profile },
  { path: '*', redirect: '/' }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
