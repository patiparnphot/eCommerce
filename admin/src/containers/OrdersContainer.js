import { connect } from 'react-redux';
import {
  fetchOrders,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  approveOrder,
  approveOrderSuccess,
  approveOrderFailure,
  resetApprovedOrder
} from '../actions/orders';
import {
  fetchOrderamount,
  fetchOrderamountSuccess,
  fetchOrderamountFailure
} from '../actions/preloadedData'
import Orders from '../components/OrdersComponent ';

function mapStateToProps(state, ownProps) {
  return {
    orderAmount: state.preloadedData.orderAmount,
    ordersList: state.orders.ordersList,
    member: state.member
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (start, end) => {
      console.log('start ', start, ' and end ', end);
      dispatch(fetchOrders(start, end)).then((response) => {
        console.log('allOrders: ', response.payload);
        !response.error ? dispatch(fetchOrdersSuccess(response.payload)) : dispatch(fetchOrdersFailure(response.payload));
      });
    },
    fetchOrderAmount: () => {
      dispatch(fetchOrderamount()).then((response) => {
        console.log('orderAmount: ', response.payload);
        !response.error ? dispatch(fetchOrderamountSuccess(response.payload)) : dispatch(fetchOrderamountFailure(response.payload));
      });
    },
    approveOrder: (invoiceId, token, start, end) => {
      dispatch(approveOrder(invoiceId, {approve: true}, token)).then((response) => {
        if(response.payload.invoiceId && (response.payload.invoiceId == invoiceId)) {
          console.log('approvedOrder: ', response.payload);
          dispatch(approveOrderSuccess(response.payload));
          alert("approve order successful");
          dispatch(fetchOrders(start, end)).then((response) => {
            console.log('allOrders: ', response.payload);
            !response.error ? dispatch(fetchOrdersSuccess(response.payload)) : dispatch(fetchOrdersFailure(response.payload));
          });
        } else if(response.error) {
          dispatch(approveOrderFailure(response.payload));
          alert(response.error);
        } else {
          console.log(response.payload);
          alert(response.payload);
        }
      });
    },
    resetApprovedOrder: () => {
      dispatch(resetApprovedOrder());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);