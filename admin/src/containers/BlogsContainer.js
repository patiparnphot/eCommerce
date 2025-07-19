import { connect } from 'react-redux';
import {
  fetchBlogs,
  fetchBlogsSuccess,
  fetchBlogsFailure,
  deleteBlog,
  deleteBlogSuccess,
  deleteBlogFailure,
  resetDeletedBlog
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
    blogsList: state.blogs.blogsList,
    member: state.member
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
    },
    deleteBlog: (deleteBlogId, token, start, end) => {
      dispatch(deleteBlog(deleteBlogId, token)).then((response) => {
        if(response.payload.id && (response.payload.id == deleteBlogId)) {
          console.log('deletedBlog: ', response.payload);
          dispatch(deleteBlogSuccess(response.payload));
          alert("delete blog successful");
          dispatch(fetchBlogs(start, end)).then((response) => {
            console.log('allBlogs: ', response.payload);
            !response.error ? dispatch(fetchBlogsSuccess(response.payload)) : dispatch(fetchBlogsFailure(response.payload));
          });
        } else if(response.error) {
          dispatch(deleteBlogFailure(response.payload));
          alert(response.error);
        } else {
          console.log(response.payload);
          alert(response.payload);
        }
      });
    },
    resetDeletedBlog: () => {
      dispatch(resetDeletedBlog());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);