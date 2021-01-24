import Create from '../components/CreateBlogComponent';
import { resetNewBlog } from '../actions/blogs';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    resetNewBlog: () => {
      dispatch(resetNewBlog());
    },
  };
};


function mapStateToProps(state, ownProps) {
  return {
    member: state.member
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);