import { connect } from 'react-redux';
import {
  fetchGoods,
  fetchGoodsSuccess,
  fetchGoodsFailure,
  deleteGood,
  deleteGoodSuccess,
  deleteGoodFailure,
  resetDeletedGood
} from '../actions/goods';
import Goods from '../components/GoodsComponent';

function mapStateToProps(state, ownProps) {
  return {
    goodAmount: ownProps.goodAmount,
    goodsList: state.goods.goodsList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGoods: (start, end) => {
      console.log('start ', start, ' and end ', end);
      dispatch(fetchGoods(start, end)).then((response) => {
        console.log('allGoods: ', response.payload);
        !response.error ? dispatch(fetchGoodsSuccess(response.payload)) : dispatch(fetchGoodsFailure(response.payload));
      });
    },
    deleteGood: (deleteGoodSlug, token, start, end) => {
      dispatch(deleteGood(deleteGoodSlug, token)).then((response) => {
        if(response.payload.slug && (response.payload.slug == deleteGoodSlug)) {
          console.log('deletedGood: ', response.payload);
          dispatch(deleteGoodSuccess(response.payload));
          alert("delete good successful");
          dispatch(fetchGoods(start, end)).then((response) => {
            console.log('allGoods: ', response.payload);
            !response.error ? dispatch(fetchGoodsSuccess(response.payload)) : dispatch(fetchGoodsFailure(response.payload));
          });
        } else if(response.error) {
          dispatch(deleteGoodFailure(response.payload));
          alert(response.error);
        } else {
          console.log(response.payload);
          alert(response.payload);
        }
      });
    },
    resetDeletedGood: () => {
      dispatch(resetDeletedGood());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Goods);