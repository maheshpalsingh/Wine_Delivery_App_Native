export const GET_PRODUCTS = 'SET_PRODUCTS';
// export const CREATE_PRODUCT = 'CREATE_PRODUCT';
// export const DELETE_PRODUCT = 'DELETE_PRODUCT';
// export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
import axios from 'axios';
const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://127.0.0.1:3000';
export const GetProductsAction = () => {
  return async dispatch => {
    try {
      await axios
        .get(`${url}/products/all`)
        .then(response => {
          dispatch({
            type: GET_PRODUCTS,
            payload: response.data,
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

//-----------Action--------------
// import { makeRequest } from '../../api/callApi';
// import { Entries_url } from '../../api/http';
// import { ENTRIES } from '../type';

// export const EntriesActions = (
//   token: string,
//   ContentType: string,
//   api_key: any
// ) => {
//   return async (dispatch: any) => {
//     try {
//       return makeRequest(
//         `${Entries_url(ContentType)}`,
//         'get',
//         {},
//         {
//           authtoken: token,
//           api_key: api_key,
//         }
//       )
//         ?.then((response) => {
//           dispatch({
//             type: ENTRIES,
//             payload: response?.entries,
//           });
//           return Promise.resolve({
//             data: response,
//           });
//         })
//         .catch((error) => {
//           return Promise.reject(error.data);
//         });
//     } catch (e) {
//       console.log('Error -> EntriesActions', e);
//     }
//   };
// };

//----------------Reducer--------------
// import { ENTRIES } from '../type';

// const initialState = {
//   Entries: {},
// };

// export const EntriesReducer = (state = initialState, action: any) => {
//   switch (action.type) {
//     case ENTRIES:
//       return {
//         ...state,
//         Entries: action.payload,
//       };
//     default:
//       return state;
//   }
// };