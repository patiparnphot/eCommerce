import { combineReducers } from 'redux';
import MemberReducer from './reducer_users';
import OrdersReducer from './reducer_orders';
import GoodsReducer from './reducer_goods';
import CommentsReducer from './reducer_comments';
import BlogsReducer from './reducer_blogs';
import ContentsReducer from './reducer_contents';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  member: MemberReducer, //<-- User
  orders: OrdersReducer, //<-- Orders
  goods: GoodsReducer, //<-- Goods
  comments: CommentsReducer, //<-- Comments
  blogs: BlogsReducer, //<-- Blogs
  contents: ContentsReducer, //<-- Contents
  form: formReducer // <-- redux-form
});

export default rootReducer;