import Create from '../components/CreateGoodComponent';
import { resetNewGood } from '../actions/goods';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    resetNewGood: () => {
      dispatch(resetNewGood());
    },
  };
};


function mapStateToProps(state, ownProps) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);