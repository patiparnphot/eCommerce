import fetch from 'cross-fetch';


//Fetch index content
export const FETCH_INDEXCONTENT = 'FETCH_INDEXCONTENT';
export const FETCH_INDEXCONTENT_SUCCESS = 'FETCH_INDEXCONTENT_SUCCESS';
export const FETCH_INDEXCONTENT_FAILURE = 'FETCH_INDEXCONTENT_FAILURE';

//Fetch template content
export const FETCH_TEMPLATECONTENT = 'FETCH_TEMPLATECONTENT';
export const FETCH_TEMPLATECONTENT_SUCCESS = 'FETCH_TEMPLATECONTENT_SUCCESS';
export const FETCH_TEMPLATECONTENT_FAILURE = 'FETCH_TEMPLATECONTENT_FAILURE';

//Fetch contact us content
export const FETCH_CONTACTUSCONTENT = 'FETCH_CONTACTUSCONTENT';
export const FETCH_CONTACTUSCONTENT_SUCCESS = 'FETCH_CONTACTUSCONTENT_SUCCESS';
export const FETCH_CONTACTUSCONTENT_FAILURE = 'FETCH_CONTACTUSCONTENT_FAILURE';

//Fetch blog detail content
export const FETCH_BLOGDETAILCONTENT = 'FETCH_BLOGDETAILCONTENT';
export const FETCH_BLOGDETAILCONTENT_SUCCESS = 'FETCH_BLOGDETAILCONTENT_SUCCESS';
export const FETCH_BLOGDETAILCONTENT_FAILURE = 'FETCH_BLOGDETAILCONTENT_FAILURE';

//Fetch good category content
export const FETCH_GOODCATEGORYCONTENT = 'FETCH_GOODCATEGORYCONTENT';
export const FETCH_GOODCATEGORYCONTENT_SUCCESS = 'FETCH_GOODCATEGORYCONTENT_SUCCESS';
export const FETCH_GOODCATEGORYCONTENT_FAILURE = 'FETCH_GOODCATEGORYCONTENT_FAILURE';

//Fetch good detail content
export const FETCH_GOODDETAILCONTENT = 'FETCH_GOODDETAILCONTENT';
export const FETCH_GOODDETAILCONTENT_SUCCESS = 'FETCH_GOODDETAILCONTENT_SUCCESS';
export const FETCH_GOODDETAILCONTENT_FAILURE = 'FETCH_GOODDETAILCONTENT_FAILURE';

//Fetch cart content
export const FETCH_CARTCONTENT = 'FETCH_CARTCONTENT';
export const FETCH_CARTCONTENT_SUCCESS = 'FETCH_CARTCONTENT_SUCCESS';
export const FETCH_CARTCONTENT_FAILURE = 'FETCH_CARTCONTENT_FAILURE';

function receiver(type, json) {
  return {
    type: type,
    payload: json,
    receivedAt: Date.now()
  }
}

//const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost/api' : '/api';
const ROOT_URL = require('../../config.json').apiLink;

export function fetchIndexcontent() {
  return dispatch => {
    return fetch(`${ROOT_URL}/contents/index/`)
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
    return fetch(`${ROOT_URL}/contents/template/`)
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

export function fetchContactuscontent() {
  return dispatch => {
    return fetch(`${ROOT_URL}/contents/contactus/`)
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(FETCH_CONTACTUSCONTENT, json)));
  };
}
export function fetchContactuscontentSuccess(contactusContent) {
  return {
    type: FETCH_CONTACTUSCONTENT_SUCCESS,
    payload: contactusContent
  };
}
export function fetchContactuscontentFailure(error) {
  return {
    type: FETCH_CONTACTUSCONTENT_FAILURE,
    payload: error
  };
}

export function fetchBlogdetailcontent() {
  return dispatch => {
    return fetch(`${ROOT_URL}/contents/blogdetail/`)
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

export function fetchGoodcategorycontent(category) {
  return dispatch => {
    return fetch(`${ROOT_URL}/goods/categories/${category}/`)
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(FETCH_GOODCATEGORYCONTENT, json)));
  };
}
export function fetchGoodcategorycontentSuccess(goodcategoryContent) {
  return {
    type: FETCH_GOODCATEGORYCONTENT_SUCCESS,
    payload: goodcategoryContent
  };
}
export function fetchGoodcategorycontentFailure(error) {
  return {
    type: FETCH_GOODCATEGORYCONTENT_FAILURE,
    payload: error
  };
}

export function fetchGooddetailcontent() {
  return dispatch => {
    return fetch(`${ROOT_URL}/contents/gooddetail/`)
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(FETCH_GOODDETAILCONTENT, json)));
  };
}
export function fetchGooddetailcontentSuccess(gooddetailContent) {
  return {
    type: FETCH_GOODDETAILCONTENT_SUCCESS,
    payload: gooddetailContent
  };
}
export function fetchGooddetailcontentFailure(error) {
  return {
    type: FETCH_GOODDETAILCONTENT_FAILURE,
    payload: error
  };
}

export function fetchCartcontent() {
  return dispatch => {
    return fetch(`${ROOT_URL}/contents/cart/`)
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(FETCH_CARTCONTENT, json)));
  };
}
export function fetchCartcontentSuccess(cartContent) {
  return {
    type: FETCH_CARTCONTENT_SUCCESS,
    payload: cartContent
  };
}
export function fetchCartcontentFailure(error) {
  return {
    type: FETCH_CARTCONTENT_FAILURE,
    payload: error
  };
}

// export function sendMessage(values) {
//   return dispatch => {
//     return fetch(atob(ROOT_URL) + '/contents/message',
//       {
//         method: "post",
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(values)
//       })
//       .then(response => response, error => console.log('An error occurred.', error));
//   };
// }
