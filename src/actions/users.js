import fetch from 'cross-fetch';

//Get current user(me) from token in localStorage
export const ME_FROM_PAGE = 'ME_FROM_PAGE';
export const ME_FROM_PAGE_SUCCESS = 'ME_FROM_PAGE_SUCCESS';
export const ME_FROM_PAGE_FAILURE = 'ME_FROM_PAGE_FAILURE';
export const RESET_PAGE = 'RESET_PAGE';

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
const ROOT_URL = '/api';
// export function meFromPage(username) {
//   //check if the token is still valid, if so, get me from the server
//   const request = axios({
//     method: 'get',
//     url: `${ROOT_URL}/mefrompage.php?page=${username}`,
//     headers: {
//       'Authorization': `Bearer ${username}`
//     }
//   });

//   return {
//     type: ME_FROM_PAGE,
//     payload: request
//   };
// }

// export function meFromPageSuccess(currentUser) {
//   return {
//     type: ME_FROM_PAGE_SUCCESS,
//     payload: currentUser
//   };
// }

// export function meFromPageFailure(error) {
//   return {
//     type: ME_FROM_PAGE_FAILURE,
//     payload: error
//   };
// }


// export function resetPage() {//used for logout
//   return {
//     type: RESET_PAGE
//   };
// }


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
        .then(response => response.json(), error => console.log('An error occurred.', error))
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

export function logoutUser() {
  return {
    type: LOGOUT_USER
  };
}