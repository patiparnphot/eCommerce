import {
  FETCH_BLOGAMOUNT, FETCH_BLOGAMOUNT_SUCCESS, FETCH_BLOGAMOUNT_FAILURE,
  FETCH_GOODAMOUNT, FETCH_GOODAMOUNT_SUCCESS, FETCH_GOODAMOUNT_FAILURE,
  FETCH_GOODCATAMT, FETCH_GOODCATAMT_SUCCESS, FETCH_GOODCATAMT_FAILURE,
  FETCH_GOODCATT, FETCH_GOODCATT_SUCCESS, FETCH_GOODCATT_FAILURE,
  FETCH_ORDERAMOUNT, FETCH_ORDERAMOUNT_SUCCESS, FETCH_ORDERAMOUNT_FAILURE
} from '../actions/preloadedData';


	const INITIAL_STATE = {
    navOpen:            true,
    blogAmount:         {data:null, error:null, loading: false},
    goodAmount:         {data:null, error:null, loading: false},
    goodCategoryAmount: {data:null, error:null, loading: false},
    goodCategoryTitle:  {data:null, error:null, loading: false},
    orderAmount:        {data:null, error:null, loading: false},
	};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
  
  case "TOGGLE_NAV":
    return { ...state, navOpen: !state.navOpen };

  case FETCH_BLOGAMOUNT:
    return { ...state, blogAmount: {...state.blogAmount, loading: true} }; 
  case FETCH_BLOGAMOUNT_SUCCESS:
    return { ...state, blogAmount: {data: action.payload, error:null, loading: false} };
  case FETCH_BLOGAMOUNT_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, blogAmount: {data: null, error:error, loading:false} };

  case FETCH_GOODAMOUNT:
    return { ...state, goodAmount: {...state.goodAmount, loading: true} }; 
  case FETCH_GOODAMOUNT_SUCCESS:
    return { ...state, goodAmount: {data: action.payload, error:null, loading: false} };
  case FETCH_GOODAMOUNT_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, goodAmount: {data: null, error:error, loading:false} };

  case FETCH_GOODCATAMT:
    return { ...state, goodCategoryAmount: {...state.goodCategoryAmount, loading: true} }; 
  case FETCH_GOODCATAMT_SUCCESS:
    return { ...state, goodCategoryAmount: {data: action.payload, error:null, loading: false} };
  case FETCH_GOODCATAMT_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, goodCategoryAmount: {data: null, error:error, loading:false} };

  case FETCH_GOODCATT:
    return { ...state, goodCategoryTitle: {...state.goodCategoryTitle, loading: true} }; 
  case FETCH_GOODCATT_SUCCESS:
    return { ...state, goodCategoryTitle: {data: action.payload, error:null, loading: false} };
  case FETCH_GOODCATT_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, goodCategoryTitle: {data: null, error:error, loading:false} };
  
  case FETCH_ORDERAMOUNT:
    return { ...state, orderAmount: {...state.orderAmount, loading: true} }; 
  case FETCH_ORDERAMOUNT_SUCCESS:
    return { ...state, orderAmount: {data: action.payload, error:null, loading: false} };
  case FETCH_ORDERAMOUNT_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, orderAmount: {data: null, error:error, loading:false} };

  default:
    return state;
  }
}

