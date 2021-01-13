import {
  FETCH_CONTENT, FETCH_CONTENT_SUCCESS, FETCH_CONTENT_FAILURE, RESET_ACTIVE_CONTENT,
  CREATE_CONTENT, CREATE_CONTENT_SUCCESS, CREATE_CONTENT_FAILURE, RESET_NEW_CONTENT
} from '../actions/contents';


	const INITIAL_STATE = {
      activeContent: {content:null, error:null, loading: false},
      newContent: {content:null, error: null, loading: false}
	};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_CONTENT:
    return { ...state, activeContent: {...state.activeContent, loading: true}};
  case FETCH_CONTENT_SUCCESS:
    return { ...state, activeContent: {content: action.payload, error:null, loading: false}};
  case FETCH_CONTENT_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, activeContent: {content: null, error:error, loading:false}};
  case RESET_ACTIVE_CONTENT:
    return { ...state, activeContent: {content: null, error:null, loading: false}};

  case CREATE_CONTENT:
    return {...state, newContent: {...state.newContent, loading: true}};
  case CREATE_CONTENT_SUCCESS:
    return {...state, newContent: {content:action.payload, error:null, loading: false}};
  case CREATE_CONTENT_FAILURE:
    error = action.payload || {message: action.payload.message};
    return {...state, newContent: {content:null, error:error, loading: false}};
  case RESET_NEW_CONTENT:
    return {...state, newContent: {content:null, error:null, loading: false}};

  default:
    return state;
  }
}

