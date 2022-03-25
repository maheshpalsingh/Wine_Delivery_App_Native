import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Platform, Button} from 'react-native';

import Colors from '../assets/theme/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import * as productsAction from '../store/actions/products';
import * as cartActions from '../store/actions/cart';

import {WineCard, WineImage} from '../components/WineComponent';

// const WineComponent = props => {
//   const products = useSelector(state => state.wines.availableProducts);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const loadProducts = async () => {
//       await dispatch(productsAction.GetProductsAction());
//     };
//     loadProducts();
//   }, [dispatch]);

//   return (
//     <View>
//       <WineImage />
//       <FlatList
//         data={products}
//         keyExtractor={item => item.id}
//         {...props}
//         renderItem={itemData => (
//           <WineCard
//             image={itemData.item.image}
//             winename={itemData.item.name}
//             price={itemData.item.price}
//             category={itemData.item.category}
//           />
//         )}
//       />
//     </View>
//   );
// };

const ProductsScreen = props => {
  const products = useSelector(state => state.wines.availableProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    const loadProducts = async () => {
      await dispatch(productsAction.GetProductsAction());
    };
    loadProducts();
  }, [dispatch]);
  // return <WineComponent />;
  return (
    <View>
      <WineImage />

      <FlatList
        data={products}
        keyExtractor={item => item.id}
        {...props}
        renderItem={itemData => (
          <WineCard
            image={itemData.item.image}
            winename={itemData.item.name}
            price={itemData.item.price}
            category={itemData.item.category}>
            <Button
              title="Add To Cart"
              onPress={() => {
                dispatch(cartActions.addtocart(itemData.item));
              }}
              color={Colors.purple}
            />
          </WineCard>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProductsScreen;
