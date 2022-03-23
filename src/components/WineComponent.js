import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';
import Colors from '../assets/theme/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

const WineList = [
  {
    name: 'AMARIS SYRAH',
    image_url:
      'https://iwsc.net/img/blog/medium-iwscawards114pre-dinner6184.jpg',
    categories: 'Wine',
    price: 5550,
    quantity: '750ML',
  },
  {
    name: 'BIB BANYAN',
    image_url:
      'https://lh3.googleusercontent.com/2-8WkwuUeFUPkk0mSGHcr9uIbsmFKVgmyYUcuEy0rmw3cxDT6XVeeEG6z2DnMiUW8kbKZ2-03eymFanVIKircsrHfg=w1000',
    categories: 'Bear',
    price: 2150,
    quantity: '500ML',
  },
  {
    name: 'CHAROSA VINEYARDS',
    image_url:
      'https://vinepair.com/wp-content/uploads/2019/12/Domaine-Matrot-Mersault-2017.png',
    categories: 'Ciders',
    price: 1750,
    quantity: '250ML',
  },
  {
    name: 'AMARIS SYRAH',
    image_url:
      'https://iwsc.net/img/blog/medium-iwscawards114pre-dinner6184.jpg',
    categories: 'Wine',
    price: 5550,
    quantity: '750ML',
  },
  {
    name: 'BIB BANYAN ',
    image_url:
      'https://lh3.googleusercontent.com/2-8WkwuUeFUPkk0mSGHcr9uIbsmFKVgmyYUcuEy0rmw3cxDT6XVeeEG6z2DnMiUW8kbKZ2-03eymFanVIKircsrHfg=w1000',
    categories: 'Bear',
    price: 2150,
    quantity: '500ML',
  },
  {
    name: 'CHAROSA VINEYARDS',
    image_url:
      'https://vinepair.com/wp-content/uploads/2019/12/Domaine-Matrot-Mersault-2017.png',
    categories: 'Ciders',
    price: 1750,
    quantity: '250ML',
  },
];

const axios = require('axios');
const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://127.0.0.1:3000';

const WineComponent = () => {
  const [products, setproducts] = useState([]);
  const fetchApi = () => {
    axios
      .get(`${url}/products/all`)
      .then(response => {
        setproducts(response.data ?? []);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  fetchApi();

  return (
    <View>
      <ScrollView>
        <WineImage />

        {products.map((product, index) => (
          <View key={index}>
            <WineCard
              image={product.image}
              winename={product.name}
              price={product.price}
              qtn={product.company}
            />
          </View>
        ))}

        {/* {WineList.map((wine, index) => (
          <View key={index}>
            <WineCard
              image={wine.image_url}
              winename={wine.name}
              price={wine.price}
              qtn={wine.quantity}
            />
          </View>
        ))} */}
      </ScrollView>
    </View>
  );
};

const WineImage = () => (
  <>
    <Image
      source={{
        uri: 'https://iwsc.net/img/blog/medium-iwscawards114pre-dinner6184.jpg',
        //  uri: 'http://localhost:3001/profile/profile_1648008686086profile-pic.jpg',
      }}
      style={styles.screenimage}
    />
    <TouchableOpacity style={{position: 'absolute', right: 20, top: 20}}>
      <Icon name="heart-outline" size={25} color={Colors.white} />
    </TouchableOpacity>
  </>
);

const WineCard = props => (
  <View style={styles.wine_card}>
    <View style={{padding: 10}}>
      <Image
        source={{
          uri: props.image,
        }}
        style={styles.wine_image}
      />
    </View>
    <View style={{padding: 10}}>
      <Text style={styles.txt_name}>{props.winename}</Text>
      <Text style={styles.txt_price}>{props.price}</Text>
      <Text style={styles.txt_qtn}>{props.qtn}</Text>
    </View>
    <View style={styles.add_to_cart}>
      <Button title="Add To Cart" color={Colors.purple} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  screenimage: {width: '100%', height: 150, paddingBottom: 20},
  wine_card: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 20,
    flexDirection: 'row',
  },
  wine_image: {width: 80, height: 100, borderRadius: 20},
  txt_name: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },
  txt_price: {
    paddingBottom: 10,
    fontSize: 15,
  },
  txt_qtn: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  add_to_cart: {
    paddingTop: 70,
    paddingLeft: 20,
    flex: 1,
    justifyContent: 'center',
    width: 200,
    height: 110,
    paddingRight: 10,
  },
});

export default WineComponent;
