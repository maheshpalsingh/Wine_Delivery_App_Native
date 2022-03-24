import {CREATE_PRODUCT, GET_PRODUCTS} from '../actions/product';
import React, {useState} from 'react';
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
      const [products, setproducts] = useState([]);
      axios
        .get(`${url}/products/all`)
        .then(response => {
          setproducts(response.data ?? []);
        })
        .catch(function (error) {
          alert(error);
        });

      return {...state, availableProducts: {...state.products}};
    case CREATE_PRODUCT:
      return;
  }
  return action;
};
