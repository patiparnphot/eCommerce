import Good from '../components/GoodComponent';
import {
  fetchGood,
  fetchGoodSuccess,
  fetchGoodFailure,
  resetActiveGood,
  resetEditedGood
} from '../actions/goods';
import {
  fetchGoodcategorytitles,
  fetchGoodcategorytitlesSuccess,
  fetchGoodcategorytitlesFailure
} from '../actions/preloadedData';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    fetchGood: (slug) => {
      dispatch(fetchGood(slug)).then((response) => {
        console.log('activeGood: ', response.payload);
        !response.error ? dispatch(fetchGoodSuccess(response.payload)) : dispatch(fetchGoodFailure(response.payload));
      });
    },
    fetchGoodCategoryTitles: () => {
      dispatch(fetchGoodcategorytitles()).then((response) => {
        console.log('GoodCategoryTitles: ', response.payload);
        !response.error ? dispatch(fetchGoodcategorytitlesSuccess(response.payload)) : dispatch(fetchGoodcategorytitlesFailure(response.payload));
      });
    },
    resetActiveGood: () => {
      dispatch(resetActiveGood());
    },
    resetEditedGood: () => {
      dispatch(resetEditedGood());
    }
  };
};


function mapStateToProps(state, ownProps) {
  return {
    activeGood: state.goods.activeGood,
    editGood: state.goods.editGood,
    member: state.member,
    goodSlug: ownProps.slug,
    allCat: state.preloadedData.goodCategoryTitle
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Good);