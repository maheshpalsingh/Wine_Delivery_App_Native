export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const GET_ORDERS = 'GET_ORDERS';
export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
import axios from 'axios';
import {URL} from '../../constants/routeName';

export const setToken = token => {
  return {type: SET_TOKEN, payload: token};
};
export const removeToken = () => {
  return {type: REMOVE_TOKEN};
};
export const GetCartsAction = () => {
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
        .get(`${URL}/carts/me`, config)
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
