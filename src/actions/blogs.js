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
const ROOT_URL = require('../../config.json').encodedApiLink;
export function fetchBlogs() {
  return dispatch => {
    return fetch(atob(ROOT_URL) + atob('L2Jsb2dzLw=='))
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


export function fetchBlog(title) {
  return dispatch => {
    return fetch(atob(ROOT_URL) + atob('L2Jsb2dzLw==') + title)
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
