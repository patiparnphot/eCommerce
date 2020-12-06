import PopularOnShop from '../components/PopularOnShopComponent';
import { connect } from 'react-redux';
import { 
  fetchPopularGoods, 
  fetchPopularGoodsSuccess, 
  fetchPopularGoodsFailure, 
  fetchFilterGoods,
  fetchFilterGoodsSuccess,
  fetchFilterGoodsFailure
} from '../actions/goods';


const mapDispatchToProps = (dispatch, state, ownProps) => {
  return {
    fetchGoods: () => {
      dispatch(fetchPopularGoods()).then((response) => {
        console.log('popularGoods: ', response.payload);
        !response.error ? dispatch(fetchPopularGoodsSuccess(response.payload)) : dispatch(fetchPopularGoodsFailure(response.payload));
      });
    },
    filteringGoods: (initial, filter) => {
      dispatch(fetchFilterGoods(initial, filter)).then((response) => {
        console.log('filterGoods: ', response.payload);
        !response.error ? dispatch(fetchFilterGoodsSuccess(response.payload)) : dispatch(fetchFilterGoodsFailure(response.payload));
      });
    },
    resetGoods: (initial) => {
      let resetedGoods = initial.slice(0, 10);
      console.log('resetedGoods: ', resetedGoods);
      dispatch(fetchFilterGoodsSuccess(resetedGoods))
    }
  };
};


function mapStateToProps(state, ownProps) {
  return {
    popularOnShop: ownProps.popularOnShop,
    popularGoods: state.goods.popularGoods,
    filterGoods: state.goods.filterGoods
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularOnShop);