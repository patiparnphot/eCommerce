import { combineReducers } from 'redux';
import GoodsReducer from './reducer_goods';
import BlogsReducer from './reducer_blogs';
import ContentsReducer from './reducer_contents';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  goods: GoodsReducer, //<-- Goods
  blogs: BlogsReducer, //<-- Blogs
  contents: ContentsReducer, //<-- Contents
  form: formReducer // <-- redux-form
});

export default rootReducer;