import {GET_ORDERS, REMOVE_TOKEN, SET_TOKEN} from '../actions/cart';

const initialState = {
  totalAmount: 0,
  availableOrders: [],
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        availableOrders: action.payload,
      };
    case SET_TOKEN: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case REMOVE_TOKEN: {
      return {
        ...state,
        token: null,
      };
    }
  }
  return state;
};
