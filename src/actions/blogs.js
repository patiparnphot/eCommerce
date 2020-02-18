import axios from 'axios';
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

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost/api' : '/api';
export function fetchBlogs() {
  return dispatch => {
    return fetch(`${ROOT_URL}/blogs`)
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


export function createBlog(props) {
  return dispatch => {
    return fetch(`${ROOT_URL}/createblog`, {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(props)
      })
      .then(response => response.json(), error => console.log('An error occurred.', error))
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


export function fetchBlog(title) {
  return dispatch => {
    return fetch(`${ROOT_URL}/blogs/${title}`)
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


export function deleteBlog(id) {
  return dispatch => {
    return fetch(`${ROOT_URL}/deleteblog?id="${id}"`)
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(DELETE_BLOG, json)));
  };
}
export function deleteBlogSuccess(deletedBlog) {
  return {
    type: DELETE_BLOG_SUCCESS,
    payload: deletedBlog
  };
}
export function deleteBlogFailure(response) {
  return {
    type: DELETE_BLOG_FAILURE,
    payload: response
  };
}
export function resetDeletedBlog() {
  return {
    type: RESET_DELETED_BLOG
  };
}