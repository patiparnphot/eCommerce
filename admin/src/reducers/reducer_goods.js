import {
  FETCH_GOODS, FETCH_GOODS_SUCCESS, FETCH_GOODS_FAILURE, RESET_GOODS,
  FETCH_GOOD, FETCH_GOOD_SUCCESS,  FETCH_GOOD_FAILURE, RESET_ACTIVE_GOOD,
  EDIT_GOOD, EDIT_GOOD_SUCCESS, EDIT_GOOD_FAILURE, RESET_EDIT_GOOD,
  CREATE_GOOD, CREATE_GOOD_SUCCESS, CREATE_GOOD_FAILURE, RESET_NEW_GOOD,
  DELETE_GOOD, DELETE_GOOD_SUCCESS, DELETE_GOOD_FAILURE, RESET_DELETED_GOOD
} from '../actions/goods';


	const INITIAL_STATE = {
	    goodsList: {goods: null, error:null, loading: false},  
      newGood: {good:null, error: null, loading: false}, 
	    activeGood: {good:null, error:null, loading: false},
      editGood: {good:null, error:null, loading: false}, 
      deletedGood: {good: null, error:null, loading: false}
  };

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_GOODS:
    return { ...state, goodsList: {goods: [], error: null, loading: true} }; 
  case FETCH_GOODS_SUCCESS:
    return { ...state, goodsList: {goods: action.payload, error:null, loading: false} };
  case FETCH_GOODS_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, goodsList: {goods: [], error: error, loading: false} };
  case RESET_GOODS:
    return { ...state, goodsList: {goods: [], error:null, loading: false} };

  case FETCH_GOOD:
    return { ...state, activeGood: {...state.activeGood, loading: true}};
  case FETCH_GOOD_SUCCESS:
    return { ...state, activeGood: {good: action.payload, error:null, loading: false}};
  case FETCH_GOOD_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, activeGood: {good: null, error:error, loading:false}};
  case RESET_ACTIVE_GOOD:
    return { ...state, activeGood: {good: null, error:null, loading: false}};

  case EDIT_GOOD:
    return { ...state, editGood: {good: null, error: null, loading: true}};
  case EDIT_GOOD_SUCCESS:
    return { ...state, editGood: {good: action.payload, error:null, loading: false}};
  case EDIT_GOOD_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, editGood: {good: null, error:error, loading:false}};
  case RESET_EDIT_GOOD:
    return { ...state, editGood: {good: null, error:null, loading: false}};

  case CREATE_GOOD:
    return {...state, newGood: {...state.newGood, loading: true}};
  case CREATE_GOOD_SUCCESS:
    return {...state, newGood: {good:action.payload, error:null, loading: false}};
  case CREATE_GOOD_FAILURE:
    error = action.payload || {message: action.payload.message};
    return {...state, newGood: {good:null, error:error, loading: false}};
  case RESET_NEW_GOOD:
    return {...state, newGood: {good:null, error:null, loading: false}};

  case DELETE_GOOD:
  	return {...state, deletedGood: {...state.deletedGood, loading: true}};
  case DELETE_GOOD_SUCCESS:
  	return {...state, deletedGood: {good:action.payload, error:null, loading: false}};
  case DELETE_GOOD_FAILURE:
   error = action.payload || {message: action.payload.message};
  	return {...state, deletedGood: {good:null, error:error, loading: false}};
  case RESET_DELETED_GOOD:
  	return {...state, deletedGood: {good:null, error:null, loading: false}};

  default:
    return state;
  }
}

