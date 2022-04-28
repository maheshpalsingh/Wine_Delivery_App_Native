export const GET_PRODUCTS = 'GET_PRODUCTS';
import axios from 'axios';
import {URL} from '../../constants/routeName';

export const A = () => {
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
        .get(`${URL}/products/all`, config)
        .then(response => {
          dispatch({
            type: GET_PRODUCTS,
            payload: response?.data,
          });
        })
        .catch(function (error) {
          alert(error);
        });
    } catch (e) {
      console.log('Error while fetching products', e);
    }
  };
};
