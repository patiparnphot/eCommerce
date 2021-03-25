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
    fetchGoods: (setAlreadyFetch) => {
      dispatch(fetchPopularGoods()).then((response) => {
        console.log('popularGoods: ', response.payload);
        !response.error ? dispatch(fetchPopularGoodsSuccess(response.payload)) : dispatch(fetchPopularGoodsFailure(response.payload));
        setAlreadyFetch(true);
      });
    },
    filteringGoods: (initial, filter) => {
      let keys = Object.keys(filter);
      let filteredGood = initial;
      keys.forEach((key) => {
        filteredGood = filteredGood.filter(good => good[key] == filter[key]);
      });
      console.log('filterGoods: ', filteredGood);
      dispatch(fetchFilterGoodsSuccess(filteredGood));
    },
    resetGoods: (initial) => {
      let resetedGoods = initial.slice(0, 20);
      console.log('resetedGoods: ', resetedGoods);
      dispatch(fetchFilterGoodsSuccess(resetedGoods))
    }
  };
};


function mapStateToProps(state, ownProps) {
  return {
    popularOnShop: ownProps.popularOnShop,
    popularGoods: state.goods.popularGoods,
    filterGoods: state.goods.filterGoods,
    memberRate: ownProps.memberRate,
    memberLike: ownProps.memberLike
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularOnShop);