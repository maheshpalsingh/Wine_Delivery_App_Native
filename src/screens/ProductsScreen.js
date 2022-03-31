import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  Button,
  ActivityIndicator,
} from 'react-native';

import Colors from '../assets/theme/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import * as productsAction from '../store/actions/products';
import * as cartActions from '../store/actions/cart';

import {WineCard, WineImage} from '../components/WineComponent';
import axios from 'axios';
import {color} from 'react-native-reanimated';
import {ScrollView} from 'react-native-gesture-handler';

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
  const [visible, setVisible] = useState(false);
  const products = useSelector(state => state.wines.availableProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    const loadProducts = async () => {
      await dispatch(productsAction.GetProductsAction());
    };
    loadProducts();
  }, [dispatch]);
  const url =
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3001'
      : 'http://127.0.0.1:3000';
  const token = useSelector(state => state.cart.token);
  // return <WineComponent />;
  return (
    <ScrollView>
      <View>
        <ActivityIndicator
          animating={visible}
          // hidesWhenStopped={false}
          color={'purple'}
          size={'large'}
        />
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
                    setVisible(true);
                    setTimeout(() => {
                      setVisible(false);
                    }, 500);

                    const addProduct = itemData.item._id;
                    // console.log(addProduct, token);

                    const token =
                      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQ0MDUxNzNhMTNjMzIzOTQzMmM5NzciLCJpYXQiOjE2NDg2MzkxOTJ9.EgLhqXu-A2f66Y3XWbWMi11H79awGLbyjCWvQjUaGdU';
                    const pid = '623d8c8643f9129a7e934261';
                    console.log(pid, token);
                    const config = {
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                      },
                    };
                    axios
                      .post(`${url}/order/${pid}`, config)
                      .then(function (response) {
                        console.log('Success');
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  }}
                  // onPress={() => {
                  //   dispatch(cartActions.addtocart(itemData.item));
                  // }}
                  color={Colors.purple}
                />
              </WineCard>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default ProductsScreen;
