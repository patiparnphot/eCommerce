import Create from '../components/CreateComponent';
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
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);