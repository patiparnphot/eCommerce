import fetch from 'cross-fetch';


//Fetch preloaded blog amount
export const FETCH_BLOGAMOUNT = 'FETCH_BLOGAMOUNT';
export const FETCH_BLOGAMOUNT_SUCCESS = 'FETCH_BLOGAMOUNT_SUCCESS';
export const FETCH_BLOGAMOUNT_FAILURE = 'FETCH_BLOGAMOUNT_FAILURE';

//Fetch preloaded good amount
export const FETCH_GOODAMOUNT = 'FETCH_GOODAMOUNT';
export const FETCH_GOODAMOUNT_SUCCESS = 'FETCH_GOODAMOUNT_SUCCESS';
export const FETCH_GOODAMOUNT_FAILURE = 'FETCH_GOODAMOUNT_FAILURE';

//Fetch preloaded order amount
export const FETCH_ORDERAMOUNT = 'FETCH_ORDERAMOUNT';
export const FETCH_ORDERAMOUNT_SUCCESS = 'FETCH_ORDERAMOUNT_SUCCESS';
export const FETCH_ORDERAMOUNT_FAILURE = 'FETCH_ORDERAMOUNT_FAILURE';

//Fetch preloaded good category amount
export const FETCH_GOODCATAMT = 'FETCH_GOODCATAMT';
export const FETCH_GOODCATAMT_SUCCESS = 'FETCH_GOODCATAMT_SUCCESS';
export const FETCH_GOODCATAMT_FAILURE = 'FETCH_GOODCATAMT_FAILURE';

//Fetch preloaded good categories
export const FETCH_GOODCATT = 'FETCH_GOODCATT';
export const FETCH_GOODCATT_SUCCESS = 'FETCH_GOODCATT_SUCCESS';
export const FETCH_GOODCATT_FAILURE = 'FETCH_GOODCATT_FAILURE';


function receiver(type, json) {
  return {
    type: type,
    payload: json,
    receivedAt: Date.now()
  }
}

//const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost/api' : '/api';
const ROOT_URL = '/api';

export function fetchBlogamount() {
  return dispatch => {
    return fetch(`${ROOT_URL}/blogs/amount/`)
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(FETCH_BLOGAMOUNT, json)));
  };
}
export function fetchBlogamountSuccess(blogAmount) {
  return {
    type: FETCH_BLOGAMOUNT_SUCCESS,
    payload: blogAmount
  };
}
export function fetchBlogamountFailure(error) {
  return {
    type: FETCH_BLOGAMOUNT_FAILURE,
    payload: error
  };
}

export function fetchGoodamount() {
  return dispatch => {
    return fetch(`${ROOT_URL}/goods/amount/`)
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(FETCH_GOODAMOUNT, json)));
  };
}
export function fetchGoodamountSuccess(goodAmount) {
  return {
    type: FETCH_GOODAMOUNT_SUCCESS,
    payload: goodAmount
  };
}
export function fetchGoodamountFailure(error) {
  return {
    type: FETCH_GOODAMOUNT_FAILURE,
    payload: error
  };
}

export function fetchOrderamount() {
  return dispatch => {
    return fetch(`${ROOT_URL}/orders/amount/`)
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(FETCH_ORDERAMOUNT, json)));
  };
}
export function fetchOrderamountSuccess(orderAmount) {
  return {
    type: FETCH_ORDERAMOUNT_SUCCESS,
    payload: orderAmount
  };
}
export function fetchOrderamountFailure(error) {
  return {
    type: FETCH_ORDERAMOUNT_FAILURE,
    payload: error
  };
}

export function fetchGoodcategoryamount() {
  return dispatch => {
    return fetch(`${ROOT_URL}/goods/categories/amount/`)
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(FETCH_GOODCATAMT, json)));
  };
}
export function fetchGoodcategoryamountSuccess(goodcategoryAmount) {
  return {
    type: FETCH_GOODCATAMT_SUCCESS,
    payload: goodcategoryAmount
  };
}
export function fetchGoodcategoryamountFailure(error) {
  return {
    type: FETCH_GOODCATAMT_FAILURE,
    payload: error
  };
}

export function fetchGoodcategorytitles() {
  return dispatch => {
    return fetch(`${ROOT_URL}/goods/categories/allProps/`)
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(FETCH_GOODCATT, json)));
  };
}
export function fetchGoodcategorytitlesSuccess(allCategoryTitle) {
  return {
    type: FETCH_GOODCATT_SUCCESS,
    payload: allCategoryTitle
  };
}
export function fetchGoodcategorytitlesFailure(error) {
  return {
    type: FETCH_GOODCATT_FAILURE,
    payload: error
  };
}
