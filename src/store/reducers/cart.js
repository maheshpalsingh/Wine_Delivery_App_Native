import {ADD_TO_CART} from '../actions/cart';
import CartItem from '../../modals/cart';
const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.name;
      let addorupdate;
      if (state.items[addedProduct.id]) {
        addorupdate = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice,
        );
      } else {
        addorupdate = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: {...state.items, [addedProduct.id]: addorupdate},
        totalAmount: state.totalAmount + prodPrice,
      };
  }
  return state;
};
