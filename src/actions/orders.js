import fetch from 'cross-fetch';

//Order list
export const FETCH_ORDERS = 'FETCH_ORDERS';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';
export const RESET_ORDERS = 'RESET_ORDERS';

//Create new order
export const CREATE_ORDER = 'CREATE_ORDER';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';
export const RESET_NEW_ORDER = 'RESET_NEW_ORDER';

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
const ROOT_URL = require('../../config.json').encodedApiLink;
export function fetchOrders() {
  return dispatch => {
    return fetch(atob(ROOT_URL) + atob('L29yZGVycy8='))
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


export function createOrder(props, token) {
  return dispatch => {
    return fetch(atob(ROOT_URL) + atob('L29yZGVycy8='), {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({order: props})
      })
      .then(response => response.json(), error => console.log('An error occurred.', error))
      .then(json => dispatch(receiver(CREATE_ORDER, json)));
  };
}
export function createOrderSuccess(newOrder) {
  return {
    type: CREATE_ORDER_SUCCESS,
    payload: newOrder
  };
}
export function createOrderFailure(error) {
  return {
    type: CREATE_ORDER_FAILURE,
    payload: error
  };
}
export function resetNewOrder() {
  return {
    type: RESET_NEW_ORDER
  }
}


export function fetchOrder(invoiceId) {
  return dispatch => {
    return fetch(atob(ROOT_URL) + atob('L29yZGVycy8=') + invoiceId)
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
