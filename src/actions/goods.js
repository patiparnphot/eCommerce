//import axios from 'axios';
import fetch from 'cross-fetch';

//Recent good list
export const FETCH_RCTGOODS = 'FETCH_RCTGOODS';
export const FETCH_RCTGOODS_SUCCESS = 'FETCH_RCTGOODS_SUCCESS';
export const FETCH_RCTGOODS_FAILURE = 'FETCH_RCTGOODS_FAILURE';
export const RESET_RCTGOODS = 'RESET_RCTGOODS';

//Popular good list
export const FETCH_POPGOODS = 'FETCH_POPGOODS';
export const FETCH_POPGOODS_SUCCESS = 'FETCH_POPGOODS_SUCCESS';
export const FETCH_POPGOODS_FAILURE = 'FETCH_POPGOODS_FAILURE';
export const RESET_POPGOODS = 'RESET_POPGOODS';

//Filter good list
export const FETCH_FLTGOODS = 'FETCH_FLTGOODS';
export const FETCH_FLTGOODS_SUCCESS = 'FETCH_FLTGOODS_SUCCESS';
export const FETCH_FLTGOODS_FAILURE = 'FETCH_FLTGOODS_FAILURE';
export const RESET_FLTGOODS = 'RESET_FLTGOODS';

//Fetch good
export const FETCH_GOOD = 'FETCH_GOOD';
export const FETCH_GOOD_SUCCESS = 'FETCH_GOOD_SUCCESS';
export const FETCH_GOOD_FAILURE = 'FETCH_GOOD_FAILURE';
export const RESET_ACTIVE_GOOD = 'RESET_ACTIVE_GOOD';

function receiver(type, json) {
  return {
    type: type,
    payload: json,
    receivedAt: Date.now()
  }
}

//const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost/api' : '/api';
const ROOT_URL = '/api';
export function fetchRecentGoods() {
  return dispatch => {
    return fetch(`${ROOT_URL}/goods/recent/`)
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(FETCH_RCTGOODS, json)));
  };
}
export function fetchRecentGoodsSuccess(goods) {
  return {
    type: FETCH_RCTGOODS_SUCCESS,
    payload: goods
  };
}
export function fetchRecentGoodsFailure(error) {
  return {
    type: FETCH_RCTGOODS_FAILURE,
    payload: error
  };
}


export function fetchPopularGoods() {
  return dispatch => {
    return fetch(`${ROOT_URL}/goods/popular/`)
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(FETCH_POPGOODS, json)));
  };
}
export function fetchPopularGoodsSuccess(goods) {
  return {
    type: FETCH_POPGOODS_SUCCESS,
    payload: goods
  };
}
export function fetchPopularGoodsFailure(error) {
  return {
    type: FETCH_POPGOODS_FAILURE,
    payload: error
  };
}


export function fetchFilterGoods(allGoods, filter) {
  console.log("allgoods: ", allGoods);
  console.log("filter: ", filter);
  let keys = Object.keys(filter);
  let filteredGood = allGoods;
  keys.forEach((key) => {
    filteredGood = filteredGood.filter(good => good[key] == filter[key]);
  });
  return {
    type: FETCH_FLTGOODS_SUCCESS,
    payload: filteredGood
  };
}
export function fetchFilterGoodsSuccess(goods) {
  return {
    type: FETCH_FLTGOODS_SUCCESS,
    payload: goods
  };
}
export function fetchFilterGoodsFailure(error) {
  return {
    type: FETCH_FLTGOODS_FAILURE,
    payload: error
  };
}


export function fetchGood(slug) {
  return dispatch => {
    return fetch(`${ROOT_URL}/goods/${slug}`)
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(FETCH_GOOD, json)));
  };
}
export function fetchGoodSuccess(activeGood) {
  return {
    type: FETCH_GOOD_SUCCESS,
    payload: activeGood
  };
}
export function fetchGoodFailure(error) {
  return {
    type: FETCH_GOOD_FAILURE,
    payload: error
  };
}
export function resetActiveGood() {
  return {
    type: RESET_ACTIVE_GOOD
  }
}