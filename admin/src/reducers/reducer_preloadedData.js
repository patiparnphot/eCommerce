import {
  FETCH_PRELOADEDBLOGDATA,
  FETCH_PRELOADEDBLOGDATA_SUCCESS,
  FETCH_PRELOADEDBLOGDATA_FAILURE
} from '../actions/preloadedData';

//import {
//  FETCH_BLOGS, FETCH_BLOGS_SUCCESS, FETCH_BLOGS_FAILURE, RESET_BLOGS
//} from '../actions/preloadedData';


	const INITIAL_STATE = {
	    blogData: {data:null, error:null, loading: false}
	};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_PRELOADEDBLOGDATA:
    return { ...state, blogData: {...state.blogsData, loading: true} }; 
  case FETCH_PRELOADEDBLOGDATA_SUCCESS:
    return { ...state, blogData: {data: action.payload, error:null, loading: false} };
  case FETCH_PRELOADEDBLOGDATA_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, blogData: {data: null, error:error, loading:false} };
  
  //case FETCH_BLOGS:
  //  return { ...state, ListOfBlog: {blog:[], error: null, loading: true} }; 
  //case FETCH_BLOGS_SUCCESS:
  //  return { ...state, ListOfBlog: {blog: action.payload, error:null, loading: false} };
  //case FETCH_BLOGS_FAILURE:
  //  error = action.payload || {message: action.payload.message};
  //  return { ...state, ListOfBlog: {blog: [], error: error, loading: false} };
  //case RESET_BLOGS:
  //  return { ...state, ListOfBlog: {blog: [], error:null, loading: false} };

  default:
    return state;
  }
}

