import { connect } from 'react-redux';
import { fetchBlogs, fetchBlogsSuccess, fetchBlogsFailure } from '../actions/blogs';
import Blogs from '../components/BlogsComponent';

function mapStateToProps(state, ownProps) {
  return {
    blogAmount: ownProps.blogAmount,
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);