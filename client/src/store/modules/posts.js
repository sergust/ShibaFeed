import axios from '../../auth/axios-auth';

const state = {
  posts: []
};

const mutations = {
  fetchPosts(state, { posts }) {
    state.posts = [...posts];
  },
  updatePosts(state, { newPost }) {
    state.posts.unshift(newPost);
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
  },
  sendPost({ commit }, reqBody) {
    // const config = {
    //   headers: {
    //     Authorization: 'Bearer ' + localStorage.getItem('token')
    //   }
    // };
    console.log(reqBody);

    axios
      .post('/api/v1/posts', reqBody)
      .then(res => {
        console.log(res);
        commit('updatePosts', { newPost: res.data.post });
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
