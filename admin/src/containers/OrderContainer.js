import Order from '../components/OrderComponent';
import { 
  fetchOrder,
  fetchOrderSuccess,
  fetchOrderFailure,
  resetActiveOrder
} from '../actions/orders';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrder: (invoiceId) => {
      dispatch(fetchOrder(invoiceId)).then((response) => {
        console.log('activeOrder: ', response.payload);
        !response.error ? dispatch(fetchOrderSuccess(response.payload)) : dispatch(fetchOrderFailure(response.payload));
      });
    },
    resetActiveOrder: () => {
      dispatch(resetActiveOrder());
    }
  };
};


function mapStateToProps(state, ownProps) {
  return {
    activeOrder: state.orders.activeOrder,
    invoiceId: ownProps.invoiceId
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);