import React from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';

import {useSelector} from 'react-redux';
import Colors from '../assets/theme/Colors';

const ProductoverviewScreen = props => {
  // console.log(props.route);
  const {
    productimage,
    productDescription,
    productCategory,
    productName,
    productPrice,
    productCompany,
  } = props.route.params;
  return (
    <>
      <SafeAreaView style={styles.screen}>
        <View style={styles.view1}>
          <Image source={{uri: productimage}} style={styles.image} />
          <Image source={{uri: productimage}} style={styles.image1} />
        </View>

        <View style={styles.view2}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.company}>
              <Text style={styles.companytext}>
                {productCompany.toUpperCase()}
              </Text>
            </View>

            <View style={styles.name}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.text1}>{productName.toUpperCase()}</Text>
                <Text style={styles.qty}>{productCategory.toUpperCase()}</Text>
              </View>
              <Text style={styles.text}>${productPrice}</Text>
            </View>

            <View>
              <Text style={styles.text2}>{productDescription}</Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  view1: {
    flexDirection: 'row',
    flex: 2,
    padding: 10,
  },
  view2: {
    paddingTop: 20,

    marginLeft: 10,
    marginRight: 10,
    //backgroundColor: Colors.thistle,
    flex: 3,
  },
  image: {
    flex: 1,
    //marginLeft: 90,
    height: '100%',
    width: 200,
    transform: [{rotate: '30deg'}],
  },
  image1: {
    flex: 1,
    //marginLeft: 90,
    height: '100%',
    width: 200,
    transform: [{rotate: '332deg'}],
  },
  text: {
    color: Colors.purple,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-condensed',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  text1: {
    color: Colors.black,
    fontSize: 29,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-condensed',
    paddingTop: 10,
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text2: {
    color: Colors.purple,
    fontFamily: 'sans-serif-medium',
    fontSize: 18,
  },
  heading: {
    padding: 16,
    color: 'black',
    fontFamily: 'sans-serif-condensed',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  company: {
    flex: 1,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    width: '40%',
    backgroundColor: Colors.purple,
  },
  companytext: {
    flex: 1,
    color: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    marginLeft: 10,
    width: 150,
  },
  name: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.9,
    borderColor: Colors.purple,
  },
  qty: {
    color: Colors.black,
    fontSize: 15,
    paddingLeft: 50,
    paddingTop: 28,
    justifyContent: 'center',
    alignItems: 'baseline',
    fontWeight: 'bold',
  },
});

export default ProductoverviewScreen;

//   return (
//     <>
//       <View style={styles.screen}>
//         <Image source={{uri: productimage}} style={styles.image} />
//         <ScrollView showsVerticalScrollIndicator={false}>
//           <View
//             style={{
//               flex: 1,
//             }}>
//             <Text style={styles.heading}>Name:</Text>
//             <Text style={styles.text}>{productName}</Text>
//             <Text style={styles.heading}>Company:</Text>
//             <Text style={styles.text}>{productCompany}</Text>
//             <Text style={styles.heading}>About me:</Text>
//             <Text style={styles.text}>{productDescription}</Text>
//             <Text style={styles.heading}>Quantity:</Text>
//             <Text style={styles.text}>{productCategory}</Text>
//             <Text style={styles.heading}>Price:</Text>
//             <Text style={styles.text}>${productPrice}</Text>
//           </View>
//         </ScrollView>
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   image: {
//     height: '100%',
//     width: '30%',
//   },
//   text: {
//     color: Colors.purple,
//     fontSize: 16,
//     fontWeight: 'bold',
//     fontFamily: 'sans-serif-condensed',
//     textAlign: 'center',
//     backgroundColor: Colors.thistle,
//   },
//   heading: {
//     padding: 16,
//     color: 'black',
//     fontFamily: 'sans-serif-condensed',
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     backgroundColor: Colors.thistle,
//   },
// });
