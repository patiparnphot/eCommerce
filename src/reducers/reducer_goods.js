import {
  FETCH_RCTGOODS, FETCH_RCTGOODS_SUCCESS, FETCH_RCTGOODS_FAILURE, RESET_RCTGOODS,
  FETCH_POPGOODS, FETCH_POPGOODS_SUCCESS, FETCH_POPGOODS_FAILURE, RESET_POPGOODS,
  FETCH_FLTGOODS, FETCH_FLTGOODS_SUCCESS, FETCH_FLTGOODS_FAILURE, RESET_FLTGOODS,
	FETCH_GOOD, FETCH_GOOD_SUCCESS,  FETCH_GOOD_FAILURE, RESET_ACTIVE_GOOD
} from '../actions/goods';


	const INITIAL_STATE = {
    recentGoods:  {goods: [], error: null, loading: false}, 
    popularGoods: {goods: [], error: null, loading: false}, 
    filterGoods:  {goods: [], error: null, loading: false},
    activeGood:   {good: null, error: null, loading: false}
  };

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_RCTGOODS:
  	return { ...state, recentGoods: {goods: [], error: null, loading: true} }; 
  case FETCH_RCTGOODS_SUCCESS:
    return { ...state, recentGoods: {goods: action.payload, error: null, loading: false} };
  case FETCH_RCTGOODS_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, recentGoods: {goods: [], error: error, loading: false} };
  case RESET_RCTGOODS:
    return { ...state, recentGoods: {goods: [], error: null, loading: false} };

  case FETCH_POPGOODS:
    return { ...state, popularGoods: {goods: [], error: null, loading: true} };
  case FETCH_POPGOODS_SUCCESS:
    return { ...state, popularGoods: {goods: action.payload, error: null, loading: false} };
  case FETCH_POPGOODS_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, popularGoods: {goods: [], error: error, loading: false} };
  case RESET_POPGOODS:
    return { ...state, popularGoods: {goods: [], error: null, loading: false} };

  case FETCH_FLTGOODS:
    return { ...state, filterGoods: {goods: [], error: null, loading: true} };
  case FETCH_FLTGOODS_SUCCESS:
    return { ...state, filterGoods: {goods: action.payload, error: null, loading: false} };
  case FETCH_FLTGOODS_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, filterGoods: {goods: [], error: error, loading: false} };
  case RESET_FLTGOODS:
    return { ...state, filterGoods: {goods: [], error: null, loading: false} };

  case FETCH_GOOD:
    return { ...state, activeGood: {...state.activeGood, loading: true} };
  case FETCH_GOOD_SUCCESS:
    return { ...state, activeGood: {good: action.payload, error: null, loading: false} };
  case FETCH_GOOD_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, activeGood: {good: null, error: error, loading:false} };
  case RESET_ACTIVE_GOOD:
    return { ...state, activeGood: {good: null, error: null, loading: false}};

  default:
    return state;
  }
}

