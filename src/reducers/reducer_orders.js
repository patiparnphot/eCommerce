import {
	FETCH_ORDER, FETCH_ORDER_SUCCESS,  FETCH_ORDER_FAILURE, RESET_ACTIVE_ORDER,
	CREATE_ORDER, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE, RESET_NEW_ORDER
} from '../actions/orders';


	const INITIAL_STATE = {
    activeOrder:{order:null, error:null, loading: false},
    newOrder:   {order:null, error:null, loading: false}
  };

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_ORDER:
    return { ...state, activeOrder: {order: null, error:null, loading: true}};
  case FETCH_ORDER_SUCCESS:
    return { ...state, activeOrder: {order: action.payload, error:null, loading: false}};
  case FETCH_ORDER_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, activeOrder: {order: null, error:error, loading:false}};
  case RESET_ACTIVE_ORDER:
    return { ...state, activeOrder: {order: null, error:null, loading: false}};

  case CREATE_ORDER:
    return { ...state, newOrder: {order: null, error:null, loading: true}};
  case CREATE_ORDER_SUCCESS:
    return { ...state, newOrder: {order: action.payload, error:null, loading: false}};
  case CREATE_ORDER_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, newOrder: {order: null, error:error, loading:false}};
  case RESET_NEW_ORDER:
    return { ...state, newOrder: {order: null, error:null, loading: false}}; 

  default:
    return state;
  }
}

