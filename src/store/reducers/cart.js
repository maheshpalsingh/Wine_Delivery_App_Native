import {ADD_TO_CART, GET_ORDERS} from '../actions/cart';
import CartItem from '../../modals/cart';
const initialState = {
  //items: {},
  totalAmount: 0,
  availableOrders: [],
  //token: null,
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQ0MDUxNzNhMTNjMzIzOTQzMmM5NzciLCJpYXQiOjE2NDg2MzkxOTJ9.EgLhqXu-A2f66Y3XWbWMi11H79awGLbyjCWvQjUaGdU',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        availableOrders: action.payload,
      };
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
