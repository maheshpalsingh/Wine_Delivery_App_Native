export const GET_DETAILS = 'GET_DETAILS';

import axios from 'axios';
const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://127.0.0.1:3000';

export const GetUsersAction = () => {
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
        .get(`${url}/users/get/me`, config)
        .then(response => {
          // console.log('response', response);
          dispatch({
            type: GET_DETAILS,
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
