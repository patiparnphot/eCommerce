import Create from '../components/CreateGoodComponent';
import { resetNewGood } from '../actions/goods';
import {
  fetchGoodcategorytitles,
  fetchGoodcategorytitlesSuccess,
  fetchGoodcategorytitlesFailure
} from '../actions/preloadedData';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    fetchGoodCategoryTitles: () => {
      dispatch(fetchGoodcategorytitles()).then((response) => {
        console.log('GoodCategoryTitles: ', response.payload);
        !response.error ? dispatch(fetchGoodcategorytitlesSuccess(response.payload)) : dispatch(fetchGoodcategorytitlesFailure(response.payload));
      });
    },
    resetNewGood: () => {
      dispatch(resetNewGood());
    }
  };
};


function mapStateToProps(state, ownProps) {
  return {
    allCat: state.preloadedData.goodCategoryTitle,
    member: state.member
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);