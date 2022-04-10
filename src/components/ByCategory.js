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
import {PRODUCTS_LIST} from '../constants/routeName';
const WIDTH = Dimensions.get('window').width;
const WineByCategory = [
  {
    image_url: 'https://www.wine-searcher.com/images/labels/66/73/11126673.jpg',
    category: 'Chardonnay',
  },
  {
    image_url:
      'https://cdn.shopify.com/s/files/1/0491/6628/7016/products/Artboard1_600x.jpg?v=1634040955',
    category: 'Pinot noir',
  },
  {
    image_url:
      'https://cdn11.bigcommerce.com/s-hg93lnuu9r/images/stencil/1193x795/uploaded_images/red-white-wine.jpg?t=1570817547',
    category: 'Riesling',
  },
  {
    image_url:
      'https://bestofwines.com/media/images/large/517-Best%20of%20Wines%20-%20fine%20wine_.jpg',
    category: 'Syrah',
  },
  {
    image_url:
      'https://cdn11.bigcommerce.com/s-hg93lnuu9r/images/stencil/1193x795/uploaded_images/red-white-wine.jpg?t=1570817547',
    category: 'Riesling',
  },
  {
    image_url:
      'https://bestofwines.com/media/images/large/517-Best%20of%20Wines%20-%20fine%20wine_.jpg',
    category: 'Syrah',
  },
  {
    image_url:
      'https://cdn11.bigcommerce.com/s-hg93lnuu9r/images/stencil/1193x795/uploaded_images/red-white-wine.jpg?t=1570817547',
    category: 'Riesling',
  },
  {
    image_url:
      'https://bestofwines.com/media/images/large/517-Best%20of%20Wines%20-%20fine%20wine_.jpg',
    category: 'Syrah',
  },
];

const ByCategory = (props, {navigation}) => {
  //const {navigate} = useNavigation();
  return (
    <View>
      <FlatList
        numColumns={2}
        data={WineByCategory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={itemdata => (
          <WineImage
            image={itemdata.item.image_url}
            category={itemdata.item.category}
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

const WineImage = (props, {navigation}) => (
  <>
    <View style={styles.screen}>
      <View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            //  navigation.navigate(PRODUCTS_LIST);
          }}>
          <Text style={{fontSize: 30, color: Colors.black, fontFamily: 'bold'}}>
            {props.category}
          </Text>
          <Image
            source={{
              uri: props.image,
            }}
            style={styles.screenimage}
          />
        </TouchableOpacity>
      </View>
    </View>
  </>
);
const styles = StyleSheet.create({
  screen: {padding: 20},
  screenimage: {
    width: WIDTH / 3,
    height: 170,
  },
});

export default ByCategory;
