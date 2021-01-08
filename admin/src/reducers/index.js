import { combineReducers } from 'redux';
import GoodsReducer from './reducer_goods';
import BlogsReducer from './reducer_blogs';
import PreloadedDataReducer from './reducer_preloadedData';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  goods: GoodsReducer, //<-- Goods
  blogs: BlogsReducer, //<-- Blogs
  preloadedData: PreloadedDataReducer, //<-- PreloadedData
  form: formReducer // <-- redux-form
});

export default rootReducer;