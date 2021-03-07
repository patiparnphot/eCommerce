//import axios from 'axios';
import fetch from 'cross-fetch';

//Good list
export const FETCH_GOODCATEGORIES = 'FETCH_GOODCATEGORIES';
export const FETCH_GOODCATEGORIES_SUCCESS = 'FETCH_GOODCATEGORIES_SUCCESS';
export const FETCH_GOODCATEGORIES_FAILURE = 'FETCH_GOODCATEGORIES_FAILURE';
export const RESET_GOODCATEGORIES = 'RESET_GOODCATEGORIES';

//Create new good
export const CREATE_GOODCATEGORY = 'CREATE_GOODCATEGORY';
export const CREATE_GOODCATEGORY_SUCCESS = 'CREATE_GOODCATEGORY_SUCCESS';
export const CREATE_GOODCATEGORY_FAILURE = 'CREATE_GOODCATEGORY_FAILURE';
export const RESET_NEW_GOODCATEGORY = 'RESET_NEW_GOODCATEGORY';

//Edit good
export const EDIT_GOODCATEGORY = 'EDIT_GOODCATEGORY';
export const EDIT_GOODCATEGORY_SUCCESS = 'EDIT_GOODCATEGORY_SUCCESS';
export const EDIT_GOODCATEGORY_FAILURE = 'EDIT_GOODCATEGORY_FAILURE';
export const RESET_EDIT_GOODCATEGORY = 'RESET_EDIT_GOODCATEGORY';

//Fetch good
export const FETCH_GOODCATEGORY = 'FETCH_GOODCATEGORY';
export const FETCH_GOODCATEGORY_SUCCESS = 'FETCH_GOODCATEGORY_SUCCESS';
export const FETCH_GOODCATEGORY_FAILURE = 'FETCH_GOODCATEGORY_FAILURE';
export const RESET_ACTIVE_GOODCATEGORY = 'RESET_ACTIVE_GOODCATEGORY';

//Delete good
export const DELETE_GOODCATEGORY = 'DELETE_GOODCATEGORY';
export const DELETE_GOODCATEGORY_SUCCESS = 'DELETE_GOODCATEGORY_SUCCESS';
export const DELETE_GOODCATEGORY_FAILURE = 'DELETE_GOODCATEGORY_FAILURE';
export const RESET_DELETED_GOODCATEGORY = 'RESET_DELETED_GOODCATEGORY';

function receiver(type, json) {
  return {
    type: type,
    payload: json,
    receivedAt: Date.now()
  }
}

//const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost/api' : '/api';
const ROOT_URL = require('../../../config.json').apiLink;

export function fetchGoodCategories(start, end) {
  return dispatch => {
    return fetch(`${ROOT_URL}/goods/categories/${start}/${end}/`)
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(FETCH_GOODCATEGORIES, json)));
  };
}
export function fetchGoodCategoriesSuccess(goodCategories) {
  return {
    type: FETCH_GOODCATEGORIES_SUCCESS,
    payload: goodCategories
  };
}
export function fetchGoodCategoriesFailure(error) {
  return {
    type: FETCH_GOODCATEGORIES_FAILURE,
    payload: error
  };
}


export function createGoodCategory(newCategory, token) {
  return dispatch => {
    return fetch(`${ROOT_URL}/goods/categories/`, {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({category: newCategory})
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
      .then(json => dispatch(receiver(CREATE_GOODCATEGORY, json)));
  };
}
export function createGoodCategorySuccess(newCategory) {
  return {
    type: CREATE_GOODCATEGORY_SUCCESS,
    payload: newCategory
  };
}
export function createGoodCategoryFailure(error) {
  return {
    type: CREATE_GOODCATEGORY_FAILURE,
    payload: error
  };
}
export function resetNewGoodCategory() {
  return {
    type: RESET_NEW_GOODCATEGORY
  }
}


export function editGoodCategory(editedGoodCategoryId, editedGoodCategoryObj, token) {
  return dispatch => {
    return fetch(`${ROOT_URL}/goods/categories/${editedGoodCategoryId}/`, {
        method: "put",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({editCategory: editedGoodCategoryObj})
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
      .then(json => dispatch(receiver(EDIT_GOODCATEGORY, json)));
  };
}
export function editGoodCategorySuccess(editedGoodCategory) {
  return {
    type: EDIT_GOODCATEGORY_SUCCESS,
    payload: editedGoodCategory
  };
}
export function editGoodCategoryFailure(error) {
  return {
    type: EDIT_GOODCATEGORY_FAILURE,
    payload: error
  };
}
export function resetEditedGoodCategory() {
  return {
    type: RESET_EDIT_GOODCATEGORY
  }
}


export function fetchGoodCategory(title) {
  return dispatch => {
    return fetch(`${ROOT_URL}/goods/categories/${title}/`)
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(FETCH_GOODCATEGORY, json)));
  };
}
export function fetchGoodCategorySuccess(activeGoodCategory) {
  return {
    type: FETCH_GOODCATEGORY_SUCCESS,
    payload: activeGoodCategory
  };
}
export function fetchGoodCategoryFailure(error) {
  return {
    type: FETCH_GOODCATEGORY_FAILURE,
    payload: error
  };
}
export function resetActiveGoodCategory() {
  return {
    type: RESET_ACTIVE_GOODCATEGORY
  }
}


export function deleteGoodCategory(deleteGoodCategoryTitle, token) {
  return dispatch => {
    return fetch(`${ROOT_URL}/goods/categories/${deleteGoodCategoryTitle}/`, {
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
      .then(json => dispatch(receiver(DELETE_GOODCATEGORY, json)));
  };
}
export function deleteGoodCategorySuccess(deletedGoodCategory) {
  return {
    type: DELETE_GOODCATEGORY_SUCCESS,
    payload: deletedGoodCategory
  };
}
export function deleteGoodCategoryFailure(error) {
  return {
    type: DELETE_GOODCATEGORY_FAILURE,
    payload: error
  };
}
export function resetDeletedGoodCategory() {
  return {
    type: RESET_DELETED_GOODCATEGORY
  };
}
