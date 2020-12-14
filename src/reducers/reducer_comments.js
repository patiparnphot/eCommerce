import {
  CREATE_COMMENT, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAILURE, RESET_NEW_COMMENT,
  EDIT_COMMENT, EDIT_COMMENT_SUCCESS, EDIT_COMMENT_FAILURE, RESET_EDITED_COMMENT,
  DELETE_COMMENT, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE, RESET_DELETED_COMMENT
} from '../actions/comments';


	const INITIAL_STATE = {
      newComment: {comment:null, error: null, loading: false},
      editComment: {comment:null, error:null, loading: false}, 
      deleteComment: {comment: null, error:null, loading: false}
  };

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case CREATE_COMMENT:
    return {...state, newComment: {...state.newComment, loading: true}};
  case CREATE_COMMENT_SUCCESS:
    return {...state, newComment: {comment:action.payload, error:null, loading: false}};
  case CREATE_COMMENT_FAILURE:
    error = action.payload || {message: action.payload.message};
    return {...state, newComment: {comment:null, error:error, loading: false}};
  case RESET_NEW_COMMENT:
    return {...state, newComment: {comment:null, error:null, loading: false}};

  case EDIT_COMMENT:
    return { ...state, editComment: {comment: null, error: null, loading: true}};
  case EDIT_COMMENT_SUCCESS:
    return { ...state, editComment: {comment: action.payload, error:null, loading: false}};
  case EDIT_COMMENT_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, editComment: {comment: null, error:error, loading:false}};
  case RESET_EDITED_COMMENT:
    return { ...state, editComment: {comment: null, error:null, loading: false}};
  
  case DELETE_COMMENT:
  	return {...state, deleteComment: {...state.deleteComment, loading: true}};
  case DELETE_COMMENT_SUCCESS:
  	return {...state, deleteComment: {comment:action.payload, error:null, loading: false}};
  case DELETE_COMMENT_FAILURE:
   error = action.payload || {message: action.payload.message};
  	return {...state, deleteComment: {comment:null, error:error, loading: false}};
  case RESET_DELETED_COMMENT:
  	return {...state, deleteComment: {comment:null, error:null, loading: false}};

  default:
    return state;
  }
}

