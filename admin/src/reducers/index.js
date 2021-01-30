import { combineReducers } from 'redux';
import ContentsReducer from './reducer_contents';
import CategoriesReducer from './reducer_categories';
import GoodsReducer from './reducer_goods';
import BlogsReducer from './reducer_blogs';
import OrdersReducer from './reducer_orders';
import memberReducer from './reducer_users';
import PreloadedDataReducer from './reducer_preloadedData';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  contents: ContentsReducer, //<-- Contents
  categories: CategoriesReducer, //<-- Categories
  goods: GoodsReducer, //<-- Goods
  blogs: BlogsReducer, //<-- Blogs
  orders: OrdersReducer, //<-- Orders
  member: memberReducer, //<-- Users
  preloadedData: PreloadedDataReducer, //<-- PreloadedData
  form: formReducer // <-- redux-form
});

export default rootReducer;