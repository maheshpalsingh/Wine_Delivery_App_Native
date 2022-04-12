import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  TouchableNativeFeedback,
  Button,
  Number,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import Colors from '../../assets/theme/Colors';

// const CartItem = props => {
//   return (
//     <View style={styles.cartItem}>
//       <View style={styles.itemData}>
//         <Image style={styles.pic} />
//         <Text style={styles.quantity}>{props.qty} </Text>
//         <Text style={styles.mainText}>{props.name}</Text>
//       </View>
//       <View style={styles.itemData}>
//         <Text style={styles.mainText}>
//           ${Math.round(props.amount.toFixed(2) * 100) / 100}
//         </Text>
//         {props.deletable && (
//           <TouchableOpacity
//             onPress={props.onRemove}
//             style={styles.deleteButton}>
//             <Icons
//               name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
//               size={23}
//               color="red"
//             />
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// };

const CartItem = props => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.cartItem}>
      <View style={{padding: 10}}>
        <Image
          source={{
            uri: props.image[0],
          }}
          style={styles.pic}
        />
      </View>
      <View style={{alignSelf: 'flex-start'}}>
        <Text style={styles.txt_name}>{props.name}</Text>
        <Text style={styles.txt_name}>$ {props.price}</Text>
        <Text style={styles.txt_name}>Qty:{props.qty}</Text>
        <Text style={styles.txt_name}>Total:{props.totalQty}</Text>
      </View>
      <View style={styles.add_to_cart}>
        {props.children}
        {/* <Button title="Confirm" color={Colors.purple} /> */}
        <Icons
          name="trash"
          size={24}
          color={Colors.purple}
          onPress={props.onRemove}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    margin: 8,
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    shadowColor: Colors.pink,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 8,
    elevation: 8,
    borderRadius: 10,
    //paddingBottom: 10,
  },
  pic: {
    width: 100,
    height: 100,
    transform: [{rotate: '45deg'}],
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'sans-serif-medium',
    color: '#888',
    fontSize: 16,
  },
  mainText: {
    fontFamily: 'sans-serif-medium',
    fontSize: 16,
  },
  add_to_cart: {
    marginLeft: 20,
    alignSelf: 'center',
  },
  txt_name: {
    fontSize: 15,

    margin: 4,
    fontFamily: 'sans-serif-medium',
  },
});

export default CartItem;
