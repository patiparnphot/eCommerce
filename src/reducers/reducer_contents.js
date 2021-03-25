import {
  FETCH_INDEXCONTENT, FETCH_INDEXCONTENT_SUCCESS, FETCH_INDEXCONTENT_FAILURE,
  FETCH_TEMPLATECONTENT, FETCH_TEMPLATECONTENT_SUCCESS, FETCH_TEMPLATECONTENT_FAILURE,
  FETCH_CONTACTUSCONTENT, FETCH_CONTACTUSCONTENT_SUCCESS, FETCH_CONTACTUSCONTENT_FAILURE,
  FETCH_BLOGDETAILCONTENT, FETCH_BLOGDETAILCONTENT_SUCCESS, FETCH_BLOGDETAILCONTENT_FAILURE,
  FETCH_GOODCATEGORYCONTENT, FETCH_GOODCATEGORYCONTENT_SUCCESS, FETCH_GOODCATEGORYCONTENT_FAILURE,
  FETCH_GOODDETAILCONTENT, FETCH_GOODDETAILCONTENT_SUCCESS, FETCH_GOODDETAILCONTENT_FAILURE,
  FETCH_CARTCONTENT, FETCH_CARTCONTENT_SUCCESS, FETCH_CARTCONTENT_FAILURE
} from '../actions/contents';


	const INITIAL_STATE = {
      navOpen:      false,
	    index:        {content:null, error:null, loading: false},
      template:     {content:null, error:null, loading: false},
      contactUs:    {content:null, error:null, loading: false},
      blogDetail:   {content:null, error:null, loading: false},
      goodCategory: {content:null, error:null, loading: false},
      goodDetail:   {content:null, error:null, loading: false},
      cart:         {content:null, error:null, loading: false}
	};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case "TOGGLE_NAV":
    return { ...state, navOpen: action.payload };

  case FETCH_INDEXCONTENT:
  	return { ...state, index: {...state.index, loading: true} }; 
  case FETCH_INDEXCONTENT_SUCCESS:
    return { ...state, index: {content: action.payload, error:null, loading: false} };
  case FETCH_INDEXCONTENT_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, index: {content: null, error:error, loading:false} };
  
  case FETCH_TEMPLATECONTENT:
  	return { ...state, template: {...state.template, loading: true} }; 
  case FETCH_TEMPLATECONTENT_SUCCESS:
    return { ...state, template: {content: action.payload, error:null, loading: false} };
  case FETCH_TEMPLATECONTENT_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, template: {content: null, error:error, loading:false} };

  case FETCH_CONTACTUSCONTENT:
    return { ...state, contactUs: {...state.contactUs, loading: true} }; 
  case FETCH_CONTACTUSCONTENT_SUCCESS:
    return { ...state, contactUs: {content: action.payload, error:null, loading: false} };
  case FETCH_CONTACTUSCONTENT_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, contactUs: {content: null, error:error, loading:false} };
    
  case FETCH_BLOGDETAILCONTENT:
  	return { ...state, blogDetail: {...state.blogDetail, loading: true} }; 
  case FETCH_BLOGDETAILCONTENT_SUCCESS:
    return { ...state, blogDetail: {content: action.payload, error:null, loading: false} };
  case FETCH_BLOGDETAILCONTENT_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, blogDetail: {content: null, error:error, loading:false} };

  case FETCH_GOODCATEGORYCONTENT:
    return { ...state, goodCategory: {...state.goodCategory, loading: true} }; 
  case FETCH_GOODCATEGORYCONTENT_SUCCESS:
    return { ...state, goodCategory: {content: action.payload, error:null, loading: false} };
  case FETCH_GOODCATEGORYCONTENT_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, goodCategory: {content: null, error:error, loading:false} };

  case FETCH_GOODDETAILCONTENT:
    return { ...state, goodDetail: {...state.goodDetail, loading: true} }; 
  case FETCH_GOODDETAILCONTENT_SUCCESS:
    return { ...state, goodDetail: {content: action.payload, error:null, loading: false} };
  case FETCH_GOODDETAILCONTENT_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, goodDetail: {content: null, error:error, loading:false} };
  
  case FETCH_CARTCONTENT:
    return { ...state, cart: {...state.cart, loading: true} }; 
  case FETCH_CARTCONTENT_SUCCESS:
    return { ...state, cart: {content: action.payload, error:null, loading: false} };
  case FETCH_CARTCONTENT_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, cart: {content: null, error:error, loading:false} };

  default:
    return state;
  }
}

