import axios from '../../auth/axios-auth';

const state = {
  posts: []
};

const mutations = {
  fetchPosts(state, { posts }) {
    state.posts = [...posts];
  }
};

const actions = {
  fetchPosts({ commit }) {
    axios
      .get('/api/v1/posts')
      .then(res => {
        commit('fetchPosts', { posts: res.data.data });
      })
      .catch(err => console.log(err.response));
  }
};

const getters = {
  getPosts: state => {
    return state.posts;
  }
};

export default { state, actions, getters, mutations };
