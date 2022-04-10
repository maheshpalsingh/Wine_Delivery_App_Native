import {GET_DETAILS} from '../actions/user';

const initialState = {
  mydetails: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DETAILS:
      return {
        ...state,
        mydetails: action.payload,
      };
  }
  return state;
};
