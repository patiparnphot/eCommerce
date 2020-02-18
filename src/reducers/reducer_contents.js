import {
  FETCH_INDEXCONTENT, FETCH_INDEXCONTENT_SUCCESS, FETCH_INDEXCONTENT_FAILURE,
  FETCH_TEMPLATECONTENT, FETCH_TEMPLATECONTENT_SUCCESS, FETCH_TEMPLATECONTENT_FAILURE,
  FETCH_BLOGDETAILCONTENT, FETCH_BLOGDETAILCONTENT_SUCCESS, FETCH_BLOGDETAILCONTENT_FAILURE
} from '../actions/contents';


	const INITIAL_STATE = {
	    index: {content:null, error:null, loading: false},
	    template: {content:null, error:null, loading: false},
	    blogDetail: {content:null, error:null, loading: false}
	};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

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
    
  case FETCH_BLOGDETAILCONTENT:
  	return { ...state, blogDetail: {...state.template, loading: true} }; 
  case FETCH_BLOGDETAILCONTENT_SUCCESS:
    return { ...state, blogDetail: {content: action.payload, error:null, loading: false} };
  case FETCH_BLOGDETAILCONTENT_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, blogDetail: {content: null, error:error, loading:false} };

  default:
    return state;
  }
}

