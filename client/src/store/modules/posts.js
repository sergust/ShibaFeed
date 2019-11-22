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
  fetchPosts({ commit }) {
    axios
      .get('/api/v1/posts')
      .then(res => {
        commit('fetchPosts', { posts: res.data.data });
      })
      .catch(err => console.log(err.response));
  },
  sendPost({ commit }, reqBody) {
    axios
      .post('/api/v1/posts', reqBody)
      .then(res => {
        console.log(res);

        commit('updatePosts', { newPost: res.data.post });
      })
      .catch(err => console.log(err.response));
  },
  leaveComment({ commit }, { postId, commentBody }) {
    console.log(postId);
    console.log(commentBody);

    axios
      .post(`api/v1/posts/${postId}/comments/addcomment`, { commentBody })
      .then(res => {
        console.log(res);

        commit('updatePostComments', {
          newComment: res.data.createComment,
          postId
        });
      })
      .catch(err => console.log(err.response));
  },
  updateComment({ commit }, { commentBody, commentId, postId }) {
    axios
      .put(`/api/v1/posts/${postId}/comments/${commentId}`, { commentBody })
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
    console.log('Comment ID', commentId);
    console.log('Post ID', postId);

    axios
      .delete(`/api/v1/posts/${postId}/comments/${commentId}`)
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
  }
};

export default { state, actions, getters, mutations };
