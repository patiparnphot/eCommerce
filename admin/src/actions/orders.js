import fetch from 'cross-fetch';

//Order pagination
export const FETCH_ORDERS = 'FETCH_ORDERS';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';
export const RESET_ORDERS = 'RESET_ORDERS';

//Approve order
export const APPROVE_ORDER = 'APPROVE_ORDER';
export const APPROVE_ORDER_SUCCESS = 'APPROVE_ORDER_SUCCESS';
export const APPROVE_ORDER_FAILURE = 'APPROVE_ORDER_FAILURE';
export const RESET_APPROVED_ORDER = 'RESET_APPROVED_ORDER';

//Fetch order
export const FETCH_ORDER = 'FETCH_ORDER';
export const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS';
export const FETCH_ORDER_FAILURE = 'FETCH_ORDER_FAILURE';
export const RESET_ACTIVE_ORDER = 'RESET_ACTIVE_ORDER';


function receiver(type, json) {
  return {
    type: type,
    payload: json,
    receivedAt: Date.now()
  }
}

//const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost/api' : '/api';
const ROOT_URL = require('../../../config.json').apiLink;
export function fetchOrders(start, end) {
  return dispatch => {
    return fetch(`${ROOT_URL}/orders/${start}/${end}/`)
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(FETCH_ORDERS, json)));
  };
}
export function fetchOrdersSuccess(orders) {
  return {
    type: FETCH_ORDERS_SUCCESS,
    payload: orders
  };
}
export function fetchOrdersFailure(error) {
  return {
    type: FETCH_ORDERS_FAILURE,
    payload: error
  };
}


export function approveOrder(invoiceId, approveOrder, token) {
  return dispatch => {
    return fetch(`${ROOT_URL}/orders/${invoiceId}/`, {
        method: "put",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({approvedOrder: approveOrder})
      })
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(APPROVE_ORDER, json)));
  };
}
export function approveOrderSuccess(approvedOrder) {
  return {
    type: APPROVE_ORDER_SUCCESS,
    payload: approvedOrder
  };
}
export function approveOrderFailure(error) {
  return {
    type: APPROVE_ORDER_FAILURE,
    payload: error
  };
}
export function resetApprovedOrder() {
  return {
    type: RESET_APPROVED_ORDER
  }
}


export function fetchOrder(invoiceId) {
  return dispatch => {
    return fetch(`${ROOT_URL}/orders/${invoiceId}/`)
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(FETCH_ORDER, json)));
  };
}
export function fetchOrderSuccess(activeOrder) {
  return {
    type: FETCH_ORDER_SUCCESS,
    payload: activeOrder
  };
}
export function fetchOrderFailure(error) {
  return {
    type: FETCH_ORDER_FAILURE,
    payload: error
  };
}
export function resetActiveOrder() {
  return {
    type: RESET_ACTIVE_ORDER
  }
}
