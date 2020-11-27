import { combineReducers } from 'redux';
import BlogsReducer from './reducer_blogs';
import PreloadedDataReducer from './reducer_preloadedData';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  blogs: BlogsReducer, //<-- Blogs
  preloadedData: PreloadedDataReducer, //<-- PreloadedData
  form: formReducer // <-- redux-form
});

export default rootReducer;