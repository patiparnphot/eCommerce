import fetch from 'cross-fetch';


//Fetch index content
export const FETCH_INDEXCONTENT = 'FETCH_INDEXCONTENT';
export const FETCH_INDEXCONTENT_SUCCESS = 'FETCH_INDEXCONTENT_SUCCESS';
export const FETCH_INDEXCONTENT_FAILURE = 'FETCH_INDEXCONTENT_FAILURE';

//Fetch template content
export const FETCH_TEMPLATECONTENT = 'FETCH_TEMPLATECONTENT';
export const FETCH_TEMPLATECONTENT_SUCCESS = 'FETCH_TEMPLATECONTENT_SUCCESS';
export const FETCH_TEMPLATECONTENT_FAILURE = 'FETCH_TEMPLATECONTENT_FAILURE';

//Fetch blog detail content
export const FETCH_BLOGDETAILCONTENT = 'FETCH_BLOGDETAILCONTENT';
export const FETCH_BLOGDETAILCONTENT_SUCCESS = 'FETCH_BLOGDETAILCONTENT_SUCCESS';
export const FETCH_BLOGDETAILCONTENT_FAILURE = 'FETCH_BLOGDETAILCONTENT_FAILURE';

function receiver(type, json) {
  return {
    type: type,
    payload: json,
    receivedAt: Date.now()
  }
}

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost/api' : '/api';

export function fetchIndexcontent() {
  return dispatch => {
    return fetch(`${ROOT_URL}/contents/index`)
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(FETCH_INDEXCONTENT, json)));
  };
}
export function fetchIndexcontentSuccess(indexContent) {
  return {
    type: FETCH_INDEXCONTENT_SUCCESS,
    payload: indexContent
  };
}
export function fetchIndexcontentFailure(error) {
  return {
    type: FETCH_INDEXCONTENT_FAILURE,
    payload: error
  };
}

export function fetchTemplatecontent() {
  return dispatch => {
    return fetch(`${ROOT_URL}/contents/template`)
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(FETCH_TEMPLATECONTENT, json)));
  };
}
export function fetchTemplatecontentSuccess(templateContent) {
  return {
    type: FETCH_TEMPLATECONTENT_SUCCESS,
    payload: templateContent
  };
}
export function fetchTemplatecontentFailure(error) {
  return {
    type: FETCH_TEMPLATECONTENT_FAILURE,
    payload: error
  };
}

export function fetchBlogdetailcontent() {
  return dispatch => {
    return fetch(`${ROOT_URL}/contents/blogdetail`)
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(FETCH_BLOGDETAILCONTENT, json)));
  };
}
export function fetchBlogdetailcontentSuccess(blogdetailContent) {
  return {
    type: FETCH_BLOGDETAILCONTENT_SUCCESS,
    payload: blogdetailContent
  };
}
export function fetchBlogdetailcontentFailure(error) {
  return {
    type: FETCH_BLOGDETAILCONTENT_FAILURE,
    payload: error
  };
}