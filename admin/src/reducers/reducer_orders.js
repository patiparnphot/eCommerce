import {
	FETCH_ORDERS, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE, RESET_ORDERS,
  FETCH_ORDER, FETCH_ORDER_SUCCESS,  FETCH_ORDER_FAILURE, RESET_ACTIVE_ORDER,
  APPROVE_ORDER, APPROVE_ORDER_SUCCESS, APPROVE_ORDER_FAILURE, RESET_APPROVED_ORDER
} from '../actions/orders';


	const INITIAL_STATE = {
    ordersList:     {orders:[], error:null, loading: false},
    activeOrder:    {order:null, error:null, loading: false},
    approveOrder:   {order:null, error:null, loading: false}
  };

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_ORDERS:
    return { ...state, ordersList: {orders: [], error:null, loading: true}};
  case FETCH_ORDERS_SUCCESS:
    return { ...state, ordersList: {orders: action.payload, error:null, loading: false}};
  case FETCH_ORDERS_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, ordersList: {orders: [], error:error, loading:false}};
  case RESET_ORDERS:
    return { ...state, ordersList: {orders: [], error:null, loading: false}};

  case FETCH_ORDER:
    return { ...state, activeOrder: {order: null, error:null, loading: true}};
  case FETCH_ORDER_SUCCESS:
    return { ...state, activeOrder: {order: action.payload, error:null, loading: false}};
  case FETCH_ORDER_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, activeOrder: {order: null, error:error, loading:false}};
  case RESET_ACTIVE_ORDER:
    return { ...state, activeOrder: {order: null, error:null, loading: false}};

  case APPROVE_ORDER:
    return { ...state, approveOrder: {order: null, error:null, loading: true}};
  case APPROVE_ORDER_SUCCESS:
    return { ...state, approveOrder: {order: action.payload, error:null, loading: false}};
  case APPROVE_ORDER_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, approveOrder: {order: null, error:error, loading:false}};
  case RESET_APPROVED_ORDER:
    return { ...state, approveOrder: {order: null, error:null, loading: false}}; 

  default:
    return state;
  }
}

