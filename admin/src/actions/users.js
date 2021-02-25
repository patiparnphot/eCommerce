import fetch from 'cross-fetch';

//Get current user(me) from token in localStorage
export const ME_FROM_PAGE = 'ME_FROM_PAGE';
export const ME_FROM_PAGE_SUCCESS = 'ME_FROM_PAGE_SUCCESS';
export const ME_FROM_PAGE_FAILURE = 'ME_FROM_PAGE_FAILURE';
export const RESET_ME_FROM_PAGE = 'RESET_ME_FROM_PAGE';

//Sign Up User
export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';
export const RESET_USER = 'RESET_USER';

//Sign In User
export const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE';

//log out user
export const LOGOUT_USER = 'LOGOUT_USER';

function receiver(type, json) {
    return {
        type: type,
        payload: json,
        receivedAt: Date.now()
    }
}

// const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';
const ROOT_URL = require('../../../config.json').encodedApiLink;


export function signInUser(props) {
  return dispatch => {
    return fetch(atob(ROOT_URL) + atob('L3VzZXJzL2xvZ2luL2FkbWluLw=='), {
      method: "post",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(props)
    })
    .then(response => response.json(), error => console.log('An error occurred.', error))
    .then(json => dispatch(receiver(SIGNIN_USER, json)));
  };
}

export function signInUserSuccess(user) {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: user
  };
}

export function signInUserFailure(error) {
  return {
    type: SIGNIN_USER_FAILURE,
    payload: error
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
  };
}