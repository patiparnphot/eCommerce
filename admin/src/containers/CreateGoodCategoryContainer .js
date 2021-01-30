import CreateCategory from '../components/CreateGoodCategoryComponent';
import { resetNewGoodCategory } from '../actions/categories';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    resetNewGoodCategory: () => {
      dispatch(resetNewGoodCategory());
    }
  };
};


function mapStateToProps(state, ownProps) {
  return {
    member: state.member
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategory);