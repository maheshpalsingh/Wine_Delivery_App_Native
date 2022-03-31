import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../assets/theme/Colors';
import CartItem from '../components/shop/CartItem';
import Card from '../components/UI/Card';
import * as cartActions from '../store/actions/cart';
const MycartScreen = props => {
  let cartisemp = false;
  return <View>{cartisemp ? <CartisEmpty {...props} /> : <CartItems />}</View>;
};

const CartItems = (props, getState) => {
  const [visible, setVisible] = useState(false);
  const [total, setTotal] = useState(0);
  const cartItems = useSelector(state => state.cart.availableOrders);

  const dispatch = useDispatch();
  useEffect(() => {
    const loadProducts = async () => {
      await dispatch(cartActions.GetOrdersAction());
    };
    loadProducts();
  }, [dispatch, cartItems]);

  const cartTotalAmount = useSelector(state => state.cart.totalAmount);

  // const cartItems = useSelector(state => {
  //   const transformedCartItems = [];
  //   for (const key in state.cart.items) {
  //     transformedCartItems.push({
  //       productId: key,
  //       productTitle: state.cart.items[key].productTitle,
  //       productPrice: state.cart.items[key].productPrice,
  //       quantity: state.cart.items[key].quantity,
  //       sum: state.cart.items[key].sum,
  //     });
  //   }

  //  return transformedCartItems;
  //}
  //)

  useEffect(() => {
    if (cartItems) {
      let total = 0;
      cartItems.forEach(item => {
        total = total + item.qty * item.productPrice;
      });
      setTotal(total);
    }
  }, [cartItems]);

  const url =
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3001'
      : 'http://127.0.0.1:3000';

  const token = useSelector(state => state.cart.token);

  return (
    <View style={styles.screen}>
      <ActivityIndicator
        animating={visible}
        // hidesWhenStopped={false}
        color={'purple'}
        size={'large'}
      />
      <View>
        <Card style={styles.summary}>
          <Text style={styles.summaryText}>
            Total:
            <Text style={styles.amount}>
              ${Math.round(total.toFixed(2) * 100) / 100}
            </Text>
          </Text>
          <Button
            color={Colors.purple}
            title="Order Now"
            disabled={cartItems.length === 0}
          />
        </Card>
      </View>
      <Text style={styles.ordertext}>Products</Text>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        {...props}
        renderItem={itemData => (
          <ScrollView>
            {/* {console.log(itemData.item.productImage[0])} */}
            <CartItem
              image={itemData.item.productImage}
              qty={itemData.item.qty}
              name={itemData.item.productName}
              price={itemData.item.productPrice}
              totalQty={
                parseInt(itemData.item.qty) *
                parseInt(itemData.item.productPrice)
              }
              onRemove={() => {
                setVisible(true);
                setTimeout(() => {
                  setVisible(false);
                }, 500);
                const idToRemove = itemData.item._id;
                console.log(idToRemove);
                const config = {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                };
                axios
                  .delete(`${url}/orders/me/${idToRemove}`, config)
                  .then(() => console.log('Delete successful'))
                  .catch(e => {
                    console.log(e);
                  });
              }}
              // deletable
              // onRemove={() => {
              //   // dispatch(cartActions.removeFromCart(itemData.item.productId));
              // }}
            />
          </ScrollView>
        )}
      />
    </View>
  );
};
const CartisEmpty = ({navigation}) => {
  return (
    <View>
      <View>
        <Text style={styles.cartEmpty}>CART IS EMPTY!</Text>
        <Image
          style={styles.cartImage}
          source={{
            uri: 'data:image/png;base64,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',
          }}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="START SHOPPING"
          color={Colors.purple}
          onPress={() => {
            navigation.navigate('Products');
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  cartEmpty: {
    flex: 1,
    paddingTop: 30,
    fontSize: 25,
    alignSelf: 'center',
    color: Colors.purple,
    fontStyle: 'italic',
  },
  cartImage: {width: '60%', height: '60%', alignSelf: 'center', marginTop: 40},
  button: {
    paddingTop: 20,
    width: '50%',
    alignSelf: 'center',
    borderRadius: 20,
  },

  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: 'sans-serif-medium',
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
  confirm: {
    width: '40%',
  },

  ordertext: {
    fontSize: 15,
    alignSelf: 'center',
  },
});

export default MycartScreen;
