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
    postsCopy.splice(
      postsCopy.findIndex(post => post.id === postId),
      1
    );
    state.posts = [...postsCopy];
  },
  updatePost(state, { updatedPost, postId }) {
    let postsCopy = state.posts;

    postsCopy.splice(
      postsCopy.findIndex(post => post.id === postId),
      1,
      updatedPost
    );

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
        })
        .catch(err => console.log(err.response));
    }
  },
  sendPost({ commit }, reqBody) {
    HTTP.post('/api/v1/posts', reqBody)
      .then(res => {
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
    HTTP.delete(`/api/v1/posts/${postId}`).then(
      commit('deletePost', { postId })
    );
  },
  updatePost({ commit }, { reqBody, postId }) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    HTTP.put(`/api/v1/posts/${postId}`, reqBody, config).then(res => {
      commit('updatePost', { updatedPost: res.data.post, postId });
    });
  },
  leaveComment({ commit }, { postId, commentBody }) {
    HTTP.post(`api/v1/posts/${postId}/comments/addcomment`, { commentBody })
      .then(res => {
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

    HTTP.put(`/api/v1/posts/${postId}/comments/${commentId}`, { commentBody })
      .then(res => {
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
    HTTP.delete(`/api/v1/posts/${postId}/comments/${commentId}`)
      .then(
        commit('deletePostComment', {
          commentId,
          postId
        })
      )
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
