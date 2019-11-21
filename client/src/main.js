import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faComment,
  faUserNinja,
  faPaw,
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faComment, faUserNinja, faPaw, faEdit);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(require('vue-moment'));

Vue.directive('click-outside', {
  bind: function(el, binding, vnode) {
    el.clickOutsideEvent = function(event) {
      if (!(el == event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unbind: function(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
