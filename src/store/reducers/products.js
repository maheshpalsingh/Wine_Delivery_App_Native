import {GET_PRODUCTS} from '../actions/products';

const initialState = {
  availableProducts: [],
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        availableProducts: action.payload,
      };
  }
  return state;
};
