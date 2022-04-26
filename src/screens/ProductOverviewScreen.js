import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';

import Colors from '../assets/theme/Colors';

const ProductoverviewScreen = props => {
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
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
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
              <Text style={styles.text}>$ {productPrice}</Text>
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
    marginHorizontal: 10,
    flex: 3,
  },
  company: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.purple + 'BD',
    alignSelf: 'flex-start',
    borderColor: Colors.purple,
  },
  companytext: {
    color: 'white',
    fontSize: 12,
  },
  image: {
    position: 'relative',
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
    //color: '#F2C1D1',
    //color: '#7F7D9C',
    color: '#7C6E7F',
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
