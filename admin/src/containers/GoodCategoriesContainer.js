import { connect } from 'react-redux';
import {
  fetchGoodCategories,
  fetchGoodCategoriesSuccess,
  fetchGoodCategoriesFailure,
  deleteGoodCategory,
  deleteGoodCategorySuccess,
  deleteGoodCategoryFailure,
  resetDeletedGoodCategory
} from '../actions/categories';
import {
  fetchGoodcategoryamount,
  fetchGoodcategoryamountSuccess,
  fetchGoodcategoryamountFailure
} from '../actions/preloadedData'
import GoodCategories from '../components/GoodCategoriesComponent';

function mapStateToProps(state, ownProps) {
  return {
    goodCategoryAmount: state.preloadedData.goodCategoryAmount,
    categoriesList: state.categories.categoriesList,
    member: state.member
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGoodCategories: (start, end) => {
      console.log('start ', start, ' and end ', end);
      dispatch(fetchGoodCategories(start, end)).then((response) => {
        console.log('allGoodCategories: ', response.payload);
        !response.error ? dispatch(fetchGoodCategoriesSuccess(response.payload)) : dispatch(fetchGoodCategoriesFailure(response.payload));
      });
    },
    fetchGoodCategoryAmount: () => {
      dispatch(fetchGoodcategoryamount()).then((response) => {
        console.log('goodCategoryAmount: ', response.payload);
        !response.error ? dispatch(fetchGoodcategoryamountSuccess(response.payload)) : dispatch(fetchGoodcategoryamountFailure(response.payload));
      });
    },
    deleteGoodCategory: (deleteGoodCategoryTitle, token, start, end) => {
      dispatch(deleteGoodCategory(deleteGoodCategoryTitle, token)).then((response) => {
        if(response.payload.title && (response.payload.title == deleteGoodCategoryTitle)) {
          console.log('deletedGoodCategory: ', response.payload);
          dispatch(deleteGoodCategorySuccess(response.payload));
          alert("delete good category successful");
          dispatch(fetchGoodCategories(start, end)).then((response) => {
            console.log('allGoodCategories: ', response.payload);
            !response.error ? dispatch(fetchGoodCategoriesSuccess(response.payload)) : dispatch(fetchGoodCategoriesFailure(response.payload));
          });
        } else if(response.error) {
          dispatch(deleteGoodCategoryFailure(response.payload));
          alert(response.error);
        } else if(response.payload.message) {
          console.log(response.payload);
          alert(response.payload.message);
        } else {
          console.log(response.payload);
          alert(response.payload);
        }
      });
    },
    resetDeletedGoodCategory: () => {
      dispatch(resetDeletedGoodCategory());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoodCategories);