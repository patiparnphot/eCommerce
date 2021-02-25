//import axios from 'axios';
import fetch from 'cross-fetch';

//Good list
export const FETCH_GOODS = 'FETCH_GOODS';
export const FETCH_GOODS_SUCCESS = 'FETCH_GOODS_SUCCESS';
export const FETCH_GOODS_FAILURE = 'FETCH_GOODS_FAILURE';
export const RESET_GOODS = 'RESET_GOODS';

//Create new good
export const CREATE_GOOD = 'CREATE_GOOD';
export const CREATE_GOOD_SUCCESS = 'CREATE_GOOD_SUCCESS';
export const CREATE_GOOD_FAILURE = 'CREATE_GOOD_FAILURE';
export const RESET_NEW_GOOD = 'RESET_NEW_GOOD';

//Edit good
export const EDIT_GOOD = 'EDIT_GOOD';
export const EDIT_GOOD_SUCCESS = 'EDIT_GOOD_SUCCESS';
export const EDIT_GOOD_FAILURE = 'EDIT_GOOD_FAILURE';
export const RESET_EDIT_GOOD = 'RESET_EDIT_GOOD';

//Fetch good
export const FETCH_GOOD = 'FETCH_GOOD';
export const FETCH_GOOD_SUCCESS = 'FETCH_GOOD_SUCCESS';
export const FETCH_GOOD_FAILURE = 'FETCH_GOOD_FAILURE';
export const RESET_ACTIVE_GOOD = 'RESET_ACTIVE_GOOD';

//Delete good
export const DELETE_GOOD = 'DELETE_GOOD';
export const DELETE_GOOD_SUCCESS = 'DELETE_GOOD_SUCCESS';
export const DELETE_GOOD_FAILURE = 'DELETE_GOOD_FAILURE';
export const RESET_DELETED_GOOD = 'RESET_DELETED_GOOD';

function receiver(type, json) {
  return {
    type: type,
    payload: json,
    receivedAt: Date.now()
  }
}

//const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost/api' : '/api';
const ROOT_URL = require('../../../config.json').encodedApiLink;

export function fetchGoods(start, end) {
  return dispatch => {
    console.log(atob(ROOT_URL) + atob('L2dvb2RzLw==') + start + '/' + end);
    return fetch(atob(ROOT_URL) + atob('L2dvb2RzLw==') + start + '/' + end)
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(FETCH_GOODS, json)));
  };
}
export function fetchGoodsSuccess(goods) {
  return {
    type: FETCH_GOODS_SUCCESS,
    payload: goods
  };
}
export function fetchGoodsFailure(error) {
  return {
    type: FETCH_GOODS_FAILURE,
    payload: error
  };
}


export function createGood(newGood, token) {
  return dispatch => {
    return fetch(atob(ROOT_URL) + atob('L2dvb2RzLw=='), {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({good: newGood})
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
      .then(json => dispatch(receiver(CREATE_GOOD, json)));
  };
}
export function createGoodSuccess(newGood) {
  return {
    type: CREATE_GOOD_SUCCESS,
    payload: newGood
  };
}
export function createGoodFailure(error) {
  return {
    type: CREATE_GOOD_FAILURE,
    payload: error
  };
}
export function resetNewGood() {
  return {
    type: RESET_NEW_GOOD
  }
}


export function editGood(editedGoodId, editedGoodObj, token) {
  return dispatch => {
    return fetch(atob(ROOT_URL) + atob('L2dvb2RzLw==') + editedGoodId, {
        method: "put",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({editGood: editedGoodObj})
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
      .then(json => dispatch(receiver(EDIT_GOOD, json)));
  };
}
export function editGoodSuccess(editedGood) {
  return {
    type: EDIT_GOOD_SUCCESS,
    payload: editedGood
  };
}
export function editGoodFailure(error) {
  return {
    type: EDIT_GOOD_FAILURE,
    payload: error
  };
}
export function resetEditedGood() {
  return {
    type: RESET_EDIT_GOOD
  }
}


export function fetchGood(slug) {
  return dispatch => {
    return fetch(atob(ROOT_URL) + atob('L2dvb2RzLw==') + slug)
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


export function deleteGood(deleteGoodSlug, token) {
  return dispatch => {
    return fetch(atob(ROOT_URL) + atob('L2dvb2RzLw==') + deleteGoodSlug, {
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
      .then(json => dispatch(receiver(DELETE_GOOD, json)));
  };
}
export function deleteGoodSuccess(deletedGood) {
  return {
    type: DELETE_GOOD_SUCCESS,
    payload: deletedGood
  };
}
export function deleteGoodFailure(error) {
  return {
    type: DELETE_GOOD_FAILURE,
    payload: error
  };
}
export function resetDeletedGood() {
  return {
    type: RESET_DELETED_GOOD
  };
}
