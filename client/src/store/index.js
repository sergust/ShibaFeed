import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import posts from './modules/posts';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { auth, posts },
  getters: {}
});
