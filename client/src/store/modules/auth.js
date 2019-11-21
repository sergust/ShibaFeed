import axios from '../../auth/axios-auth';
import router from '../../router/index';

const state = {
  user: {
    isAuthorized: false,
    firstName: 'Guest',
    lastName: '',
    email: 'shibafeeed@gmail.com',
    token: null
  }
};

const mutations = {
  login(state, { user, token }) {
    state.user = user;
    state.user.token = token;
  },
  logout(state) {
    state.user.token = null;
    state.user.email = null;
    state.user.firstName = null;
    state.user.lastName = null;
  }
};

const actions = {
  login({ commit }, { vm, reqBody }) {
    axios
      .post('/api/v1/auth/login', reqBody)
      .then(res => {
        console.log(res);
        commit('login', { user: res.data.user, token: res.data.token });
        // vm.$bvToast.toast(`Hey, ${res.data.user.firstName}!`, {
        //   title: 'You are logged in!',
        //   toaster: 'b-toaster-top-center',
        //   variant: 'success',
        //   solid: true
        // });
        localStorage.setItem('token', res.data.token);
        router.push('/feed');
      })
      .catch(err => {
        vm.$bvToast.toast(`${err.response.data.error}`, {
          title: 'Whoops, something went wrong!',
          toaster: 'b-toaster-top-center',
          variant: 'danger',
          solid: true
        });
        console.log(err.response);
      });
  },
  signup({ commit }, { vm, reqBody }) {
    axios
      .post('/api/v1/auth/register', reqBody)
      .then(res => {
        console.log(res);
        commit('login', { user: res.data.user, token: res.data.token });
      })
      .catch(err => {
        vm.$bvToast.toast(`${err.response.data.error}`, {
          title: 'Whoops, something went wrong!',
          toaster: 'b-toaster-top-center',
          variant: 'danger',
          solid: true
        });
        console.log(err.response);
      });
  },
  tryAutoLogin() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
  },
  signout({ commit, getters }) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + getters.getToken
      }
    };
    axios
      .get('/api/v1/auth/logout', config)
      .then(res => {
        console.log(res);
        commit('logout');
      })
      .catch(err => console.log(err.response));
  }
};

const getters = {
  getUsername: state => {
    return `${state.user.firstName} ${state.user.lastName}`;
  },
  getToken: state => {
    return state.user.token;
  },
  isAuthenticated(state) {
    return state.user.token !== null;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
