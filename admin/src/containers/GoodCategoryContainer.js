import GoodCategory from '../components/GoodCategoryComponent';
import { 
  fetchGoodCategory,
  fetchGoodCategorySuccess,
  fetchGoodCategoryFailure,
  resetActiveGoodCategory,
  resetEditedGoodCategory
} from '../actions/categories';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    fetchGoodCategory: (title) => {
      dispatch(fetchGoodCategory(title)).then((response) => {
        console.log('activeGoodCategory: ', response.payload);
        !response.error ? dispatch(fetchGoodCategorySuccess(response.payload)) : dispatch(fetchGoodCategoryFailure(response.payload));
      });
    },
    resetActiveGoodCategory: () => {
      dispatch(resetActiveGoodCategory());
    },
    resetEditedGoodCategory: () => {
      dispatch(resetEditedGoodCategory());
    }
  };
};


function mapStateToProps(state, ownProps) {
  return {
    activeCategory: state.categories.activeCategory,
    editCategory: state.categories.editCategory,
    member: state.member,
    goodCategoryTitle: ownProps.categoryTitle
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodCategory);