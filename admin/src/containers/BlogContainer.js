import Blog from '../components/BlogComponent';
import { 
  fetchBlog,
  fetchBlogSuccess,
  fetchBlogFailure,
  resetActiveBlog,
  resetEditedBlog
} from '../actions/blogs';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    fetchBlog: (slug) => {
      dispatch(fetchBlog(slug)).then((response) => {
        console.log('activeBlog: ', response.payload);
        !response.error ? dispatch(fetchBlogSuccess(response.payload)) : dispatch(fetchBlogFailure(response.payload));
      });
    },
    resetActiveBlog: () => {
      dispatch(resetActiveBlog());
    },
    resetEditedBlog: () => {
      dispatch(resetEditedBlog());
    },
  };
};


function mapStateToProps(state, ownProps) {
  return {
    activeBlog: state.blogs.activeBlog,
    editBlog: state.blogs.editBlog,
    blogSlug: ownProps.slug
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);