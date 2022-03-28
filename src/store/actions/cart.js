export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const GET_ORDERS = 'GET_ORDERS';
import axios from 'axios';
const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://127.0.0.1:3000';

export const addtocart = product => {
  return {type: ADD_TO_CART, product: product};
};

export const removefromcart = product => {
  return {type: REMOVE_FROM_CART};
};

export const GetOrdersAction = () => {
  return async dispatch => {
    try {
      await axios
        .get(`${url}/orders/me`)
        .then(response => {
          dispatch({
            type: GET_ORDERS,
            payload: response.data,
          });
        })
        .catch(function (error) {
          alert(error);
        });
    } catch (e) {
      console.log('Error while fetching orders', e);
    }
  };
};
