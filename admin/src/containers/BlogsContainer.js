import { connect } from 'react-redux';
import {
  fetchBlogs,
  fetchBlogsSuccess,
  fetchBlogsFailure
} from '../actions/blogs';
import {
  fetchBlogamount,
  fetchBlogamountSuccess,
  fetchBlogamountFailure
} from '../actions/preloadedData';
import Blogs from '../components/BlogsComponent';

function mapStateToProps(state, ownProps) {
  return {
    blogAmount: state.preloadedData.blogAmount,
    blogsList: state.blogs.blogsList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBlogs: (start, end) => {
      console.log('start ', start, ' and end ', end);
      dispatch(fetchBlogs(start, end)).then((response) => {
        console.log('allBlogs: ', response.payload);
        !response.error ? dispatch(fetchBlogsSuccess(response.payload)) : dispatch(fetchBlogsFailure(response.payload));
      });
    },
    fetchBlogAmount: () => {
      dispatch(fetchBlogamount()).then((response) => {
        console.log('blogAmount: ', response.payload);
        !response.error ? dispatch(fetchBlogamountSuccess(response.payload)) : dispatch(fetchBlogamountFailure(response.payload));
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);