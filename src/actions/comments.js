//import axios from 'axios';
import fetch from 'cross-fetch';

//Create new comment
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_FAILURE = 'CREATE_COMMENT_FAILURE';
export const RESET_NEW_COMMENT = 'RESET_NEW_COMMENT';

//Edit comment
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE';
export const RESET_EDITED_COMMENT = 'RESET_EDITED_COMMENT';

//Delete comment
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';
export const RESET_DELETED_COMMENT = 'RESET_DELETED_COMMENT';

function receiver(type, json) {
  return {
    type: type,
    payload: json,
    receivedAt: Date.now()
  }
}

//const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost/api' : '/api';
const ROOT_URL = require('../../config.json').apiLink;

export function createComment(goodSlug, newComment, token) {
  return dispatch => {
    return fetch(`${ROOT_URL}/comments`, {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({slug: goodSlug, comment: newComment})
      })
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(CREATE_COMMENT, json)));
  };
}
export function createCommentSuccess(newComment) {
  return {
    type: CREATE_COMMENT_SUCCESS,
    payload: newComment
  };
}
export function createCommentFailure(error) {
  return {
    type: CREATE_COMMENT_FAILURE,
    payload: error
  };
}
export function resetNewComment() {
  return {
    type: RESET_NEW_COMMENT
  }
}


export function editComment(editedCommentId, goodSlug, editedComment, token) {
  return dispatch => {
    return fetch(`${ROOT_URL}/comments/${editedCommentId}`, {
        method: "put",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({slug: goodSlug, comment: editedComment})
      })
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(EDIT_COMMENT, json)));
  };
}
export function editCommentSuccess(editedComment) {
  return {
    type: EDIT_COMMENT_SUCCESS,
    payload: editedComment
  };
}
export function editCommentFailure(error) {
  return {
    type: EDIT_COMMENT_FAILURE,
    payload: error
  };
}
export function resetEditedComment() {
  return {
    type: RESET_EDITED_COMMENT
  }
}


export function deleteComment(deletedCommentId, goodSlug, token) {
  return dispatch => {
    return fetch(`${ROOT_URL}/comments/${deletedCommentId}`, {
        method: "delete",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({slug: goodSlug})
      })
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(DELETE_COMMENT, json)));
  };
}
export function deleteCommentSuccess(deletedComment) {
  return {
    type: DELETE_COMMENT_SUCCESS,
    payload: deletedComment
  };
}
export function deleteCommentFailure(error) {
  return {
    type: DELETE_COMMENT_FAILURE,
    payload: error
  };
}
export function resetDeletedComment() {
  return {
    type: RESET_DELETED_COMMENT
  };
}
