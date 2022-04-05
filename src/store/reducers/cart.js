import {ADD_TO_CART, GET_ORDERS, SET_TOKEN} from '../actions/cart';
import CartItem from '../../modals/cart';
const initialState = {
  //items: {},
  totalAmount: 0,
  availableOrders: [],
  //token: null,
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjRhZDYxMzliNTJjN2I1ODFhMTAwZTYiLCJpYXQiOjE2NDkxNDA5NDZ9.F1wl-FtQ7vwJG7WtMBXgexK7NAgbrjI-qRf8JSqmy_I',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        availableOrders: action.payload,
      };
    case SET_TOKEN: {
      // console.log('red', action);
      return {
        ...state,
        token: action.payload,
      };
    }
  }
  return state;
};

// case ADD_TO_CART:
//   const addedProduct = action.product;
//   const prodPrice = addedProduct.price;
//   const prodTitle = addedProduct.name;
//   let addorupdate;
//   if (state.items[addedProduct.id]) {
//     addorupdate = new CartItem(
//       state.items[addedProduct.id].quantity + 1,
//       prodPrice,
//       prodTitle,
//       state.items[addedProduct.id].sum + prodPrice,
//     );
//   } else {
//     addorupdate = new CartItem(1, prodPrice, prodTitle, prodPrice);
//   }
//   return {
//     ...state,
//     items: {...state.items, [addedProduct.id]: addorupdate},
//     totalAmount: state.totalAmount + prodPrice,
//   };
