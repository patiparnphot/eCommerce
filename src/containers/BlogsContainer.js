import { connect } from 'react-redux';
import { fetchBlogs, fetchBlogsSuccess, fetchBlogsFailure } from '../actions/blogs';
import Blogs from '../components/BlogsComponent';

function mapStateToProps(state, ownProps) {
  return {
    content: ownProps.blogs,
    blogsList: state.blogs.blogsList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBlogs: () => {
      dispatch(fetchBlogs()).then((response) => {
        !response.error ? dispatch(fetchBlogsSuccess(response.payload)) : dispatch(fetchBlogsFailure(response.payload));
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);