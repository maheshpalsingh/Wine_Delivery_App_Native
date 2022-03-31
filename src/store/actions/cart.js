export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const GET_ORDERS = 'GET_ORDERS';
import axios from 'axios';
import {useSelector} from 'react-redux';
const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://127.0.0.1:3000';

export const addtocart = product => {
  return {type: ADD_TO_CART, product: product};
};

export const removefromcart = product => {
  return {type: REMOVE_FROM_CART};
};
export const GetOrdersAction = () => {
  // let token = useSelector(state => state.cart.token);
  // console.log('token', token);
  // const token =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQ0MDUxNzNhMTNjMzIzOTQzMmM5NzciLCJpYXQiOjE2NDg2MzkxOTJ9.EgLhqXu-A2f66Y3XWbWMi11H79awGLbyjCWvQjUaGdU';
  return async (dispatch, getState) => {
    let token = getState().cart.token;
    //console.log('token', token);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      await axios
        .get(`${url}/orders/me`, config)
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
