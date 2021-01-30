import {
  FETCH_GOODCATEGORIES, FETCH_GOODCATEGORIES_SUCCESS, FETCH_GOODCATEGORIES_FAILURE, RESET_GOODCATEGORIES,
  FETCH_GOODCATEGORY, FETCH_GOODCATEGORY_SUCCESS, FETCH_GOODCATEGORY_FAILURE, RESET_ACTIVE_GOODCATEGORY,
  EDIT_GOODCATEGORY, EDIT_GOODCATEGORY_SUCCESS, EDIT_GOODCATEGORY_FAILURE, RESET_EDIT_GOODCATEGORY,
  CREATE_GOODCATEGORY, CREATE_GOODCATEGORY_SUCCESS, CREATE_GOODCATEGORY_FAILURE, RESET_NEW_GOODCATEGORY,
  DELETE_GOODCATEGORY, DELETE_GOODCATEGORY_SUCCESS, DELETE_GOODCATEGORY_FAILURE, RESET_DELETED_GOODCATEGORY
} from '../actions/categories';


	const INITIAL_STATE = {
	    categoriesList:  {good:null, blog:null, error:null, loading: false},  
      newCategory:     {good:null, blog:null, error:null, loading: false}, 
	    activeCategory:  {good:null, blog:null, error:null, loading: false},
      editCategory:    {good:null, blog:null, error:null, loading: false}, 
      deletedCategory: {good:null, blog:null, error:null, loading: false}
  };

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_GOODCATEGORIES:
    return { ...state, categoriesList: {good: [], error: null, loading: true} }; 
  case FETCH_GOODCATEGORIES_SUCCESS:
    return { ...state, categoriesList: {good: action.payload, error: null, loading: false} };
  case FETCH_GOODCATEGORIES_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, categoriesList: {good: [], error: error, loading: false} };
  case RESET_GOODCATEGORIES:
    return { ...state, categoriesList: {good: [], error: null, loading: false} };

  case FETCH_GOODCATEGORY:
    return { ...state, activeCategory: {...state.activeCategory, loading: true}};
  case FETCH_GOODCATEGORY_SUCCESS:
    return { ...state, activeCategory: {good: action.payload, error: null, loading: false}};
  case FETCH_GOODCATEGORY_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, activeCategory: {good: null, error: error, loading: false}};
  case RESET_ACTIVE_GOODCATEGORY:
    return { ...state, activeCategory: {good: null, error: null, loading: false}};

  case EDIT_GOODCATEGORY:
    return { ...state, editCategory: {good: null, error: null, loading: true}};
  case EDIT_GOODCATEGORY_SUCCESS:
    return { ...state, editCategory: {good: action.payload, error: null, loading: false}};
  case EDIT_GOODCATEGORY_FAILURE:
    error = action.payload || {message: action.payload.message};
    return { ...state, editCategory: {good: null, error: error, loading: false}};
  case RESET_EDIT_GOODCATEGORY:
    return { ...state, editCategory: {good: null, error: null, loading: false}};

  case CREATE_GOODCATEGORY:
    return {...state, newCategory: {...state.newCategory, loading: true}};
  case CREATE_GOODCATEGORY_SUCCESS:
    return {...state, newCategory: {good: action.payload, error: null, loading: false}};
  case CREATE_GOODCATEGORY_FAILURE:
    error = action.payload || {message: action.payload.message};
    return {...state, newCategory: {good: null, error: error, loading: false}};
  case RESET_NEW_GOODCATEGORY:
    return {...state, newCategory: {good: null, error: null, loading: false}};

  case DELETE_GOODCATEGORY:
  	return {...state, deletedCategory: {...state.deletedCategory, loading: true}};
  case DELETE_GOODCATEGORY_SUCCESS:
  	return {...state, deletedCategory: {good: action.payload, error: null, loading: false}};
  case DELETE_GOODCATEGORY_FAILURE:
   error = action.payload || {message: action.payload.message};
  	return {...state, deletedCategory: {good: null, error: error, loading: false}};
  case RESET_DELETED_GOODCATEGORY:
  	return {...state, deletedCategory: {good: null, error: null, loading: false}};

  default:
    return state;
  }
}

