import HTTP from '../../auth/axios-auth';
import router from '../../router/index';

const state = {
  user: {},
  fetchUser: {},
  auth: {
    firstName: localStorage.getItem('firstName') || '',
    lastName: localStorage.getItem('lastName') || '',
    email: '',
    token: localStorage.getItem('token') || '',
    userId: localStorage.getItem('userId') || ''
  }
};

const mutations = {
  login(state, { user, token }) {
    state.auth = user;
    state.auth.token = token;
  },
  logout(state) {
    state.auth = {};
  },
  fetchUser(state, { user }) {
    state.user = user;
  }
};

const actions = {
  login({ commit }, { vm, reqBody }) {
    HTTP.post('/api/v1/auth/login', reqBody)
      .then(res => {
        commit('login', { user: res.data.user, token: res.data.token });
        // vm.$bvToast.toast(`Hey, ${res.data.user.firstName}!`, {
        //   title: 'You are logged in!',
        //   toaster: 'b-toaster-top-center',
        //   variant: 'success',
        //   solid: true
        // });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.user._id);
        localStorage.setItem('firstName', res.data.user.firstName);
        localStorage.setItem('lastName', res.data.user.lastName);
        router.push('/');
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
  signup({ commit }, { vm, reqSignUpBody }) {
    HTTP.post('/api/v1/auth/register', reqSignUpBody)
      .then(res => {
        commit('login', { user: res.data.user, token: res.data.token });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.user._id);
        localStorage.setItem('firstName', res.data.user.firstName);
        localStorage.setItem('lastName', res.data.user.lastName);
        router.push('/');
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
  tryAutoLogin({ commit }) {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    const user = {
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      _id: localStorage.getItem('userId')
    };
    commit('login', { token, user });
  },
  signout({ commit }) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    HTTP.get('/api/v1/auth/logout', config)
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('userId');
        commit('logout');
      })
      .catch(err => console.log(err.response));
  },
  getSingleUser({ commit }, { userId }) {
    HTTP.get(`/api/v1/auth/users/${userId}`)
      .then(res => {
        commit('fetchUser', { user: res.data.data });
        commit('fetchPosts', { posts: res.data.data.posts });
      })
      .catch(err => console.log(err.response));
  }
};

const getters = {
  getUsername: state => {
    return `${state.auth.firstName} ${state.auth.lastName}`;
  },
  getToken: state => {
    return state.auth.token;
  },
  isAuthenticated: state => !!state.auth.token,
  userId: state => {
    return state.auth._id;
  },
  authorizedUser: state => {
    return state.user;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
