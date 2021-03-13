//import axios from 'axios';
import fetch from 'cross-fetch';

//Blog list
export const FETCH_BLOGS = 'FETCH_BLOGS';
export const FETCH_BLOGS_SUCCESS = 'FETCH_BLOGS_SUCCESS';
export const FETCH_BLOGS_FAILURE = 'FETCH_BLOGS_FAILURE';
export const RESET_BLOGS = 'RESET_BLOGS';

//Create new blog
export const CREATE_BLOG = 'CREATE_BLOG';
export const CREATE_BLOG_SUCCESS = 'CREATE_BLOG_SUCCESS';
export const CREATE_BLOG_FAILURE = 'CREATE_BLOG_FAILURE';
export const RESET_NEW_BLOG = 'RESET_NEW_BLOG';

//Edit blog
export const EDIT_BLOG = 'EDIT_BLOG';
export const EDIT_BLOG_SUCCESS = 'EDIT_BLOG_SUCCESS';
export const EDIT_BLOG_FAILURE = 'EDIT_BLOG_FAILURE';
export const RESET_EDIT_BLOG = 'RESET_EDIT_BLOG';

//Fetch blog
export const FETCH_BLOG = 'FETCH_BLOG';
export const FETCH_BLOG_SUCCESS = 'FETCH_BLOG_SUCCESS';
export const FETCH_BLOG_FAILURE = 'FETCH_BLOG_FAILURE';
export const RESET_ACTIVE_BLOG = 'RESET_ACTIVE_BLOG';

//Delete blog
export const DELETE_BLOG = 'DELETE_BLOG';
export const DELETE_BLOG_SUCCESS = 'DELETE_BLOG_SUCCESS';
export const DELETE_BLOG_FAILURE = 'DELETE_BLOG_FAILURE';
export const RESET_DELETED_BLOG = 'RESET_DELETED_BLOG';

function receiver(type, json) {
  return {
    type: type,
    payload: json,
    receivedAt: Date.now()
  }
}

//const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost/api' : '/api';
const ROOT_URL = require('../../../config.json').apiLink;

export function fetchBlogs(start, end) {
  return dispatch => {
    return fetch(`${ROOT_URL}/blogs/pagination/${start}/${end}/`)
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(FETCH_BLOGS, json)));
  };
}
export function fetchBlogsSuccess(blogs) {
  return {
    type: FETCH_BLOGS_SUCCESS,
    payload: blogs
  };
}
export function fetchBlogsFailure(error) {
  return {
    type: FETCH_BLOGS_FAILURE,
    payload: error
  };
}


export function createBlog(newBlog, token) {
  return dispatch => {
    return fetch(`${ROOT_URL}/blogs/create/`, {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({newBlog: newBlog})
      })
      .then(
        (response) => {
          if (response.status >= 400) {
            return response.text();
          } else {
            return response.json();
          }
        },
        error => console.log('An error occurred.', error)
      )
      .then(json => dispatch(receiver(CREATE_BLOG, json)));
  };
}
export function createBlogSuccess(newBlog) {
  return {
    type: CREATE_BLOG_SUCCESS,
    payload: newBlog
  };
}
export function createBlogFailure(error) {
  return {
    type: CREATE_BLOG_FAILURE,
    payload: error
  };
}
export function resetNewBlog() {
  return {
    type: RESET_NEW_BLOG
  }
}


export function editBlog(editedBlogId, editedBlogObj, token) {
  return dispatch => {
    return fetch(`${ROOT_URL}/blogs/edit/${editedBlogId}/`, {
        method: "put",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({editBlog: editedBlogObj})
      })
      .then(
        (response) => {
          if (response.status >= 400) {
            return response.text();
          } else {
            return response.json();
          }
        },
        error => console.log('An error occurred.', error)
      )
      .then(json => dispatch(receiver(EDIT_BLOG, json)));
  };
}
export function editBlogSuccess(editedBlog) {
  return {
    type: EDIT_BLOG_SUCCESS,
    payload: editedBlog
  };
}
export function editBlogFailure(error) {
  return {
    type: EDIT_BLOG_FAILURE,
    payload: error
  };
}
export function resetEditedBlog() {
  return {
    type: RESET_EDIT_BLOG
  }
}


export function fetchBlog(slug) {
  return dispatch => {
    return fetch(`${ROOT_URL}/blogs/active/${slug}/`)
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(FETCH_BLOG, json)));
  };
}
export function fetchBlogSuccess(activeBlog) {
  return {
    type: FETCH_BLOG_SUCCESS,
    payload: activeBlog
  };
}
export function fetchBlogFailure(error) {
  return {
    type: FETCH_BLOG_FAILURE,
    payload: error
  };
}
export function resetActiveBlog() {
  return {
    type: RESET_ACTIVE_BLOG
  }
}


export function deleteBlog(deletedBlogId, token) {
  return dispatch => {
    return fetch(`${ROOT_URL}/blogs/${deletedBlogId}/`, {
        method: "delete",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(
        (response) => {
          if (response.status >= 400) {
            return response.text();
          } else {
            return response.json();
          }
        },
        error => console.log('An error occurred.', error)
      )
      .then(json => dispatch(receiver(DELETE_BLOG, json)));
  };
}
export function deleteBlogSuccess(deletedBlog) {
  return {
    type: DELETE_BLOG_SUCCESS,
    payload: deletedBlog
  };
}
export function deleteBlogFailure(error) {
  return {
    type: DELETE_BLOG_FAILURE,
    payload: error
  };
}
export function resetDeletedBlog() {
  return {
    type: RESET_DELETED_BLOG
  }
}
