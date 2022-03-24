import {CREATE_PRODUCT, GET_PRODUCTS} from '../actions/product';

// axios
//   .get(`${url}/products/all`)
//   .then(response => {
//     setproducts(response.data ?? []);
//   })
//   .catch(function (error) {
//     alert(error);
//   });

const initialState = {
  // wines: products,
  availableProducts: [],
};

export const wineReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      // axios
      //   .get(`${url}/products/all`)
      //   .then(response => {
      //     setproducts(response.data ?? []);
      //   })
      //   .catch(function (error) {
      //     alert(error);
      //   });

      return;
    case CREATE_PRODUCT:
      return;
  }
  return action;
};
