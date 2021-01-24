import {
    ME_FROM_PAGE, ME_FROM_PAGE_SUCCESS, ME_FROM_PAGE_FAILURE, RESET_PAGE,
	SIGNUP_USER, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILURE, RESET_ME_FROM_PAGE,
	SIGNIN_USER, SIGNIN_USER_SUCCESS, SIGNIN_USER_FAILURE, LOGOUT_USER
} from '../actions/users';


//user = userobj, 
// status can be: 
// 1. 'storage' ie. tokenized)
// 2. 'signup' (signing up) 
// 3. 'signin' (signing in)
// 4. 'validate'(validate fields)
// 5. 'validate_email' (validating email token)
// 5. 'authenticated'(after signin) 
// 6. 'logout' (after logout)

const INITIAL_STATE = {user: null, token: null, status:null, error:null, loading: false};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

    case ME_FROM_PAGE:// loading currentUser("me") from jwttoken in local/session storage storage,
    return { ...state, user: null, status:'storage', error:null, loading: true}; 
    case ME_FROM_PAGE_SUCCESS://return user, status = authenticated and make loading = false
    return { ...state, user: action.payload.modUser, token: action.payload.token, status:'authenticated', error:null, loading: false}; //<-- authenticated
    case ME_FROM_PAGE_FAILURE:// return error and make loading = false
     error = action.payload || {message: action.payload.message};//2nd one is network or server down errors   
    return { ...state, user: null, status:'storage', error:error, loading: false};
    case RESET_ME_FROM_PAGE:// remove token from storage make loading = false
    return { ...state, user: null, status:'logout', error:null, loading: false};

    case SIGNUP_USER:// sign up user, set loading = true and status = signup
    return { ...state, user: null, status:'signup', token:null, error:null, loading: true}; 
    case SIGNUP_USER_SUCCESS://return user, status = authenticated and make loading = false
    return { ...state, user: action.payload.modUser, token: action.payload.token, status:'authenticated', error:null, loading: false}; //<-- authenticated
    case SIGNUP_USER_FAILURE:// return error and make loading = false
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors      
    return { ...state, user: null, status:'signup', error:error, loading: false};


    case SIGNIN_USER:// sign in user,  set loading = true and status = signin
    return { ...state, user: null, status:'signin', token:null, error:null, loading: true}; 
    case SIGNIN_USER_SUCCESS://return authenticated user,  make loading = false and status = authenticated
    return { ...state, user: action.payload.modUser, token: action.payload.token, status:'authenticated', error:null, loading: false}; //<-- authenticated
    case SIGNIN_USER_FAILURE:// return error and make loading = false
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors      
    return { ...state, user: null, status:'signin', error:error, loading: false};


    case LOGOUT_USER:
      return {...state, user:null, status:'storage', token:null, error:null, loading: false};
    
    default:
    return state;
  }
}