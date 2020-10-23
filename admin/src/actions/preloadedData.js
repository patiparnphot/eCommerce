import fetch from 'cross-fetch';


//Fetch preloaded blogs data
export const FETCH_PRELOADEDBLOGDATA = 'FETCH_PRELOADEDBLOGDATA';
export const FETCH_PRELOADEDBLOGDATA_SUCCESS = 'FETCH_PRELOADEDBLOGDATA_SUCCESS';
export const FETCH_PRELOADEDBLOGDATA_FAILURE = 'FETCH_PRELOADEDBLOGDATA_FAILURE';

//Blog list
export const FETCH_BLOGS = 'FETCH_BLOGS';
export const FETCH_BLOGS_SUCCESS = 'FETCH_BLOGS_SUCCESS';
export const FETCH_BLOGS_FAILURE = 'FETCH_BLOGS_FAILURE';
export const RESET_BLOGS = 'RESET_BLOGS';


function receiver(type, json) {
  return {
    type: type,
    payload: json,
    receivedAt: Date.now()
  }
}

//const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost/api' : '/api';
const ROOT_URL = '/api';

export function fetchPreloadedblogdata() {
  return dispatch => {
    return fetch(`${ROOT_URL}/blogs/preloadedData`)
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(FETCH_PRELOADEDBLOGDATA, json)));
  };
}
export function fetchPreloadedblogdataSuccess(preloadedData) {
  return {
    type: FETCH_PRELOADEDBLOGDATA_SUCCESS,
    payload: preloadedData
  };
}
export function fetchPreloadedblogdataFailure(error) {
  return {
    type: FETCH_PRELOADEDBLOGDATA_FAILURE,
    payload: error
  };
}

export function fetchBlogs(start, end) {
  return dispatch => {
    console.log(`${ROOT_URL}/blogs/pagination/${start}/${end}/`);
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
