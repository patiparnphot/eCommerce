import Blog from '../components/BlogComponent';
import { fetchBlog, fetchBlogSuccess, fetchBlogFailure} from '../actions/blogs';
import {
  fetchBlogdetailcontent,
  fetchBlogdetailcontentSuccess,
  fetchBlogdetailcontentFailure
} from '../actions/contents';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    fetchBlog: (title) => {
      dispatch(fetchBlog(title)).then((response) => {
        console.log('blog: ', response.payload);
        !response.error ? dispatch(fetchBlogSuccess(response.payload)) : dispatch(fetchBlogFailure(response.payload));
      });
    },
    fetchBlogdetailcontent: () => {
      dispatch(fetchBlogdetailcontent()).then((response) => {
        console.log('blogdetailContent: ', response.payload);
        !response.error ? dispatch(fetchBlogdetailcontentSuccess(response.payload)) : dispatch(fetchBlogdetailcontentFailure(response.payload));
      });
    }
    // deleteBlog: (id) => {
    //   dispatch(deleteBlog(id)).then((response) => {
    //     !response.error ? dispatch(deleteBlogSuccess(response.payload)) : dispatch(deleteBlogFailure(response.payload));
    //   });
    // }
  };
};


function mapStateToProps(state, ownProps) {
  return {
    activeBlog: state.blogs.activeBlog,
    // deletedBlog: state.blogs.deletedBlog,
    blogTitle: ownProps.title,
    blogdetailContent: state.contents.blogDetail
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);