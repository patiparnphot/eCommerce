import {
  FETCH_BLOGS, FETCH_BLOGS_SUCCESS, FETCH_BLOGS_FAILURE, RESET_BLOGS,
  FETCH_BLOG, FETCH_BLOG_SUCCESS,  FETCH_BLOG_FAILURE, RESET_ACTIVE_BLOG,
  EDIT_BLOG, EDIT_BLOG_SUCCESS, EDIT_BLOG_FAILURE, RESET_EDIT_BLOG,
  CREATE_BLOG, CREATE_BLOG_SUCCESS, CREATE_BLOG_FAILURE, RESET_NEW_BLOG,
  //DELETE_BLOG, DELETE_BLOG_SUCCESS, DELETE_BLOG_FAILURE, RESET_DELETED_BLOG
} from '../actions/blogs';


	const INITIAL_STATE = {
	    blogsList: {blogs: null, error:null, loading: false},  
      newBlog: {blog:null, error: null, loading: false}, 
	    activeBlog: {blog:null, error:null, loading: false},
      editBlog: {blog:null, error:null, loading: false}, 
      deletedBlog: {blog: null, error:null, loading: false}
  };

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_BLOGS:
    return { ...state, blogsList: {blogs: [], error: null, loading: true} }; 
  case FETCH_BLOGS_SUCCESS:
    return { ...state, blogsList: {blogs: action.payload, error:null, loading: false} };
  case FETCH_BLOGS_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, blogsList: {blogs: [], error: error, loading: false} };
  case RESET_BLOGS:
    return { ...state, blogsList: {blogs: [], error:null, loading: false} };

  case FETCH_BLOG:
    return { ...state, activeBlog: {...state.activeBlog, loading: true}};
  case FETCH_BLOG_SUCCESS:
    return { ...state, activeBlog: {blog: action.payload, error:null, loading: false}};
  case FETCH_BLOG_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, activeBlog: {blog: null, error:error, loading:false}};
  case RESET_ACTIVE_BLOG:
    return { ...state, activeBlog: {blog: null, error:null, loading: false}};

  case EDIT_BLOG:
    return { ...state, editBlog: {blog: null, error: null, loading: true}};
  case EDIT_BLOG_SUCCESS:
    return { ...state, editBlog: {blog: action.payload, error:null, loading: false}};
  case EDIT_BLOG_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, editBlog: {blog: null, error:error, loading:false}};
  case RESET_EDIT_BLOG:
    return { ...state, editBlog: {blog: null, error:null, loading: false}};

  case CREATE_BLOG:
    return {...state, newBlog: {...state.newBlog, loading: true}};
  case CREATE_BLOG_SUCCESS:
    return {...state, newBlog: {blog:action.payload, error:null, loading: false}};
  case CREATE_BLOG_FAILURE:
    error = action.payload || {message: action.payload.message};
    return {...state, newBlog: {blog:null, error:error, loading: false}};
  case RESET_NEW_BLOG:
    return {...state, newBlog: {blog:null, error:null, loading: false}};

  //case DELETE_BLOG:
  // 	return {...state, deletedBlog: {...state.deletedBlog, loading: true}};
  //case DELETE_BLOG_SUCCESS:
  //	return {...state, deletedBlog: {blog:action.payload, error:null, loading: false}};
  //case DELETE_BLOG_FAILURE:
  //  error = action.payload || {message: action.payload.message};
  //	return {...state, deletedBlog: {blog:null, error:error, loading: false}};
  //case RESET_DELETED_BLOG:
  //	return {...state, deletedBlog: {blog:null, error:null, loading: false}};

  default:
    return state;
  }
}

