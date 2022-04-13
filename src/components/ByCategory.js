import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Colors from '../assets/theme/Colors';

import {useNavigation} from '@react-navigation/native';
import {PRODUCTSBYCATEGORY, PRODUCTS_LIST} from '../constants/routeName';
const WIDTH = Dimensions.get('window').width;
const WineByCategory = [
  {
    image_url:
      'https://www.artisanwine.asia/image/artisanwine/image/data/category/red.png',
    category: 'Red Wines',
  },
  {
    image_url:
      'http://kazzit.com/custom/domain_1/image_files/sitemgr_whites.jpg',
    category: 'White Wines',
  },
  {
    image_url:
      'https://i1.wp.com/luxebeatmag.com/wp-content/uploads/2015/10/Domaine-Carneros-Sparkling.jpg',
    category: 'Sparkling Wines',
  },
  {
    image_url:
      'https://ilovewine.com/wp-content/uploads/2018/06/desert-wine-1024x478.jpg',
    category: 'Dessert Wines',
  },
  {
    image_url:
      'https://cdn11.bigcommerce.com/s-hg93lnuu9r/images/stencil/1193x795/uploaded_images/red-white-wine.jpg?t=1570817547',
    category: 'Indian',
  },
  {
    image_url:
      'https://bestofwines.com/media/images/large/517-Best%20of%20Wines%20-%20fine%20wine_.jpg',
    category: 'Napa Valley Cabernet',
  },
  {
    image_url:
      'https://cdn.oliverbonacininetwork.com/uploads/sites/27/2020/01/The-Guild-Wine-Features-2628.jpg',
    category: 'Penfolds',
  },
  {
    image_url:
      'https://cdn.shopify.com/s/files/1/0001/8264/8896/products/thelma-louise-wine-glass-set_1024x1024.jpg?v=1520947862',
    category: 'Louis Roederer',
  },
];

const ByCategory = (props, {navigation}) => {
  const {navigate} = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        {...props}
        numColumns={2}
        data={WineByCategory}
        keyExtractor={(_, index) => index.toString()}
        renderItem={itemdata => (
          <WineImage
            image={itemdata.item.image_url}
            category={itemdata.item.category}
            onClick={() =>
              navigate(PRODUCTSBYCATEGORY, {
                winecategory: itemdata.item.category,
              })
            }
          />
        )}
      />
      {/* <ScrollView>
        {WineByCategory.map((wine, index) => (
          <View key={index}>
            <WineImage
              image={wine.image_url}
              category={wine.category}
              {...props}
            />
          </View>
        ))}
      </ScrollView> */}
    </View>
  );
};

const WineImage = props => (
  <>
    <View style={styles.screen}>
      <View style={styles.main}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={
            //() =>
            props.onClick
            //console.log(props.category);
            //navigate(PRODUCTSBYCATEGORY)
          }>
          <Image
            source={{
              uri: props.image,
            }}
            style={styles.screenimage}
          />
          <Text
            style={{
              flex: 1,
              backgroundColor: Colors.purple,
              fontSize: 20,
              alignSelf: 'center',
              color: Colors.white,
              fontFamily: 'bold',
              padding: 10,
            }}>
            {props.category.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.thistle,
    padding: 10,
  },
  screen: {
    flex: 1,
    padding: 10,
    // paddingTop: 20,
    // paddingLeft: 20,
    // paddingRight: 20,
  },
  main: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 0.1,
    backgroundColor: Colors.purple,
    shadowColor: Colors.pink,
    shadowOpacity: 1.5,
    shadowOffset: {width: 2, height: 5},
    shadowRadius: 8,
    elevation: 8,
  },
  screenimage: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    height: 150,
  },
});

export default ByCategory;
