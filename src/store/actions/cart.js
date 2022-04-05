export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const GET_ORDERS = 'GET_ORDERS';
export const SET_TOKEN = 'SET_TOKEN';
import axios from 'axios';
const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://127.0.0.1:3000';

export const setToken = token => {
  // console.log('store tokrn', token);
  return {type: SET_TOKEN, payload: token};
};

// export const addtocart = product => {
//   return {type: ADD_TO_CART, product: product};
// };

// export const removefromcart = product => {
//   return {type: REMOVE_FROM_CART};
// };
// you have to call this api calling without that how you get data ?it was working before mam
export const GetCartsAction = () => {
  //console.log('view cart1');
  return async (dispatch, getState) => {
    let token = getState().cart.token;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      await axios
        .get(`${url}/carts/me`, config)
        .then(response => {
          //console.log('response', response);
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
