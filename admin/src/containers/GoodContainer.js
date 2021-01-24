import Good from '../components/GoodComponent';
import { 
  fetchGood,
  fetchGoodSuccess,
  fetchGoodFailure,
  resetActiveGood,
  resetEditedGood
} from '../actions/goods';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    fetchGood: (slug) => {
      dispatch(fetchGood(slug)).then((response) => {
        console.log('activeGood: ', response.payload);
        !response.error ? dispatch(fetchGoodSuccess(response.payload)) : dispatch(fetchGoodFailure(response.payload));
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
    goodSlug: ownProps.slug
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Good);