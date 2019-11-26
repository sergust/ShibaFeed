import HTTP from '../../auth/axios-auth';

const state = {
  posts: []
};

const mutations = {
  fetchPosts(state, { posts }) {
    state.posts = [...posts];
  },
  updatePosts(state, { newPost }) {
    state.posts.unshift(newPost);
  },
  deletePost(state, { postId }) {
    let postsCopy = state.posts;
    console.log('posts copy', postsCopy);

    postsCopy.splice(
      postsCopy.findIndex(post => post.id === postId),
      1
    );
    console.log('after delete', postsCopy);
    state.posts = [...postsCopy];
  },
  updatePostComments(state, { newComment, postId }) {
    const post = state.posts.find(post => post.id === postId);
    post.comments.push(newComment);
  },
  updatePostComment(state, { newComment, commentId, postId }) {
    const post = state.posts.find(post => post.id === postId);
    post.comments.find(
      comment => comment._id === commentId
    ).commentBody = newComment;
  },
  deletePostComment(state, { commentId, postId }) {
    const post = state.posts.find(post => post.id === postId);
    const commentIndex = post.comments.findIndex(
      comment => comment._id === commentId
    );
    post.comments.splice(commentIndex, 1);
  }
};

const actions = {
  fetchPosts({ commit, getters }) {
    if (!getters.getPosts[1]) {
      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      };
      HTTP.get('/api/v1/posts', config)
        .then(res => {
          commit('fetchPosts', { posts: res.data.data });
          console.log(getters.getPosts);
        })
        .catch(err => console.log(err.response));
    }
  },
  sendPost({ commit }, reqBody) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    HTTP.post('/api/v1/posts', reqBody, config)
      .then(res => {
        console.log(res);
        const newPost = {
          ...res.data.post,
          comments: []
        };

        commit('updatePosts', { newPost });
      })
      .catch(err => {
        console.log(err.response);
      });
  },
  deletePost({ commit }, { postId }) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    HTTP.delete(`/api/v1/posts/${postId}`, config).then(res => {
      console.log(res);
      commit('deletePost', { postId });
    });
  },
  leaveComment({ commit }, { postId, commentBody }) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };

    HTTP.post(
      `api/v1/posts/${postId}/comments/addcomment`,
      { commentBody },
      config
    )
      .then(res => {
        console.log(res);

        commit('updatePostComments', {
          newComment: res.data.createComment,
          postId
        });
      })
      .catch(err => console.log(err.response));
  },
  updateComment({ commit, dispatch }, { commentBody, commentId, postId }) {
    if (commentBody === '') {
      dispatch('deleteComment', { commentId, postId });
      return;
    }
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    HTTP.put(
      `/api/v1/posts/${postId}/comments/${commentId}`,
      { commentBody },
      config
    )
      .then(res => {
        console.log(res);
        commit('updatePostComment', {
          newComment: res.data.comment.commentBody,
          commentId,
          postId
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  },
  deleteComment({ commit }, { commentId, postId }) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    HTTP.delete(`/api/v1/posts/${postId}/comments/${commentId}`, config)
      .then(res => {
        console.log(res);
        commit('deletePostComment', {
          commentId,
          postId
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  }
};

const getters = {
  getPosts: state => {
    return state.posts;
  },
  getPost: state => postId => {
    return state.posts.find(post => post.id === postId);
  }
};

export default { state, actions, getters, mutations };
