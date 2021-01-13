import Recent from '../components/RecentComponent';
import { connect } from 'react-redux';
import { fetchRecentGoods, fetchRecentGoodsSuccess, fetchRecentGoodsFailure } from '../actions/goods';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchGoods: (setAlreadyFetch) => {
      dispatch(fetchRecentGoods()).then((response) => {
        console.log('recentGoods: ', response.payload);
        !response.error ? dispatch(fetchRecentGoodsSuccess(response.payload)) : dispatch(fetchRecentGoodsFailure(response.payload));
        setAlreadyFetch(true);
      });
    }
  };
};


function mapStateToProps(state, ownProps) {
  return {
    recent: ownProps.recent,
    recentGoods: state.goods.recentGoods
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Recent);