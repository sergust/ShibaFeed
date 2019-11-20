import Vue from 'vue';
import Vuex from 'vuex';

import axios from '../auth/axios-auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    user: {
      isAuthorized: false,
      firstName: 'Sergey',
      lastName: 'Ustinov',
      email: 'shibafeeed@gmail.com'
    },
    posts: [
      {
        id: 1,
        title: 'Title 1 of post 1 from store',
        postOwner: 'Michele Palmer',
        description: 'Description 1 of post 1',
        lastUpdated: '1 November 2019',
        numberOfComments: 3,
        comments: [
          {
            id: 1,
            commentOwner: 'Pavel Molchanov',
            commentBody: 'bla bla bla'
          },
          {
            id: 2,
            commentOwner: 'John Doe',
            commentBody: 'ahahah bla bla bla'
          },
          {
            id: 3,
            commentOwner: 'Donald Trump',
            commentBody:
              'ahahah bla bla bla ahahah bla bla bla ahahah bla bla bla ahahah bla bla bla ahahah bla bla bla ahahah bla bla bla'
          }
        ]
      },
      {
        id: 2,
        title: 'Title 2',
        description: 'Description 2',
        postOwner: 'Paul Mcgregor',
        lastUpdated: '2 November 2019',
        numberOfComments: 1,
        comments: [
          { id: 2, commentOwner: 'John Doe', commentBody: 'bla bla bla bla' }
        ]
      },
      {
        id: 3,
        title: 'Title 4',
        description: 'Description 3',
        postOwner: 'Stuard Dickinson',
        lastUpdated: '3 November 2019',
        numberOfComments: 1,
        comments: [
          {
            id: 2,
            commentOwner: 'Sarah Lee',
            commentBody: 'bla bla bla bla bla'
          }
        ]
      }
    ]
  },
  mutations: {
    login(state, { user, token }) {
      state.user = user;
      state.user.token = token;
    }
  },
  actions: {
    login({ commit }, reqBody) {
      axios
        .post('/api/v1/auth/login', reqBody)
        .then(res => {
          console.log(res);

          commit('login', { user: res.data.user, token: res.data.token });
        })
        .catch(err => console.log(err.response));
    },
    signup({ commit }, reqBody) {
      axios
        .post('/api/v1/auth/register', reqBody)
        .then(res => {
          console.log(res);

          commit('login', { user: res.data.user, token: res.data.token });
        })
        .catch(err => console.log(err.response));
    }
  },
  modules: {},
  getters: {
    getUsername: state => {
      return `${state.user.firstName} ${state.user.lastName}`;
    },
    getPosts: state => {
      return state.posts;
    }
  }
});
