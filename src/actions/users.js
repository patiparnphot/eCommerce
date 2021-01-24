import fetch from 'cross-fetch';

//Get current user(me) from token
export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';

//Get current user(me) from localStorage
export const ME_FROM_PAGE = 'ME_FROM_PAGE';
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

//Update User
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

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
const ROOT_URL = '/api';

export function meFromToken(token) {
  return dispatch => {
    return fetch(`${ROOT_URL}/users/profile/`, {
        method: "get",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(ME_FROM_TOKEN, json)));
  };
}


export function meFromPage(currentUser) {
  return {
    type: ME_FROM_PAGE,
    payload: currentUser
  };
}
export function resetMeFromPage() {
  return {
    type: RESET_ME_FROM_PAGE
  };
}


export function signUpUser(formValues) {
  return dispatch => {
    return fetch(`${ROOT_URL}/users/register/`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues)
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
    .then(json => dispatch(receiver(SIGNUP_USER, json)));
  };
}
export function signUpUserSuccess(user) {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: user
  };
}
export function signUpUserFailure(error) {
  return {
    type: SIGNUP_USER_FAILURE,
    payload: error
  };
}


export function signInUser(props) {
  return dispatch => {
    return fetch(`${ROOT_URL}/users/login/`, {
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


export function updateUser(token, editUser) {
  return dispatch => {
    return fetch(`${ROOT_URL}/users/update/`, {
        method: "put",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({editUser: editUser})
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
      .then(json => dispatch(receiver(UPDATE_USER, json)));
  };
}
export function updateUserSuccess(editedUser) {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: editedUser
  };
}
export function updateUserFailure(error) {
  return {
    type: UPDATE_USER_FAILURE,
    payload: error
  };
}


export function logoutUser() {
  return {
    type: LOGOUT_USER
  };
}
