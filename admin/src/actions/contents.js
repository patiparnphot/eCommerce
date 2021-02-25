//import axios from 'axios';
import fetch from 'cross-fetch';

//Fetch content
export const FETCH_CONTENT = 'FETCH_CONTENT';
export const FETCH_CONTENT_SUCCESS = 'FETCH_CONTENT_SUCCESS';
export const FETCH_CONTENT_FAILURE = 'FETCH_CONTENT_FAILURE';
export const RESET_ACTIVE_CONTENT = 'RESET_ACTIVE_CONTENT';

//Create new content
export const CREATE_CONTENT = 'CREATE_CONTENT';
export const CREATE_CONTENT_SUCCESS = 'CREATE_CONTENT_SUCCESS';
export const CREATE_CONTENT_FAILURE = 'CREATE_CONTENT_FAILURE';
export const RESET_NEW_CONTENT = 'RESET_NEW_CONTENT';

function receiver(type, json) {
  return {
    type: type,
    payload: json,
    receivedAt: Date.now()
  }
}

//const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost/api' : '/api';
const ROOT_URL = require('../../../config.json').encodedApiLink;

export function fetchContent(contentType) {
  return dispatch => {
    return fetch(atob(ROOT_URL) + atob('L2NvbnRlbnRzLw==') + contentType)
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(FETCH_CONTENT, json)));
  };
}
export function fetchContentSuccess(activeContent) {
  return {
    type: FETCH_CONTENT_SUCCESS,
    payload: activeContent
  };
}
export function fetchContentFailure(error) {
  return {
    type: FETCH_CONTENT_FAILURE,
    payload: error
  };
}
export function resetActiveContent() {
  return {
    type: RESET_ACTIVE_CONTENT
  }
}


export function createContent(newContent, token) {
  return dispatch => {
    return fetch(atob(ROOT_URL) + atob('L2NvbnRlbnRzLw=='), {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({content: newContent})
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
      .then(json => dispatch(receiver(CREATE_CONTENT, json)));
  };
}
export function createContentSuccess(newContent) {
  return {
    type: CREATE_CONTENT_SUCCESS,
    payload: newContent
  };
}
export function createContentFailure(error) {
  return {
    type: CREATE_CONTENT_FAILURE,
    payload: error
  };
}
export function resetNewContent() {
  return {
    type: RESET_NEW_CONTENT
  }
}
