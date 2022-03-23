import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Colors from '../assets/theme/Colors';

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
];

const ByCategory = ({navigation}) => {
  //const {navigate} = useNavigation();
  return (
    <View>
      <ScrollView>
        {WineByCategory.map((wine, index) => (
          <View key={index}>
            <WineImage
              image={wine.image_url}
              category={wine.category}
              onPress={() => navigation.navigate('HomeStackScreen')}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const WineImage = props => (
  <>
    <View style={styles.screen}>
      <View style={{borderRadius: 25}}>
        <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
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
    width: '100%',
    height: 170,
  },
});

export default ByCategory;
