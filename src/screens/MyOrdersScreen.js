import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TextInput,
  Button,
  FlatList,
  SectionList,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import Colors from '../assets/theme/Colors';

const axios = require('axios');
const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://127.0.0.1:3000';

//let token =
//'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQ5MzIyMGUwM2UyZDcyNjY5OGIzM2IiLCJpYXQiOjE2NDkwNjMxMDh9.YjatjbKxIhBggJh_d7Erw8vjv_IiARbS5-zgMDoiG50';

const MyordersScreen = props => {
  const [masterdata, setmasterdata] = useState([]);
  let token = useSelector(state => state.cart.token);
  useEffect(() => {
    fetchProducts();
    return () => {};
  }, []);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const fetchProducts = () => {
    axios
      .get(`${url}/orders/my`, config)
      .then(response => {
        setmasterdata(response.data ?? []);
        // console.log(masterdata);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  // const orders = itemdata => {
  //   <Card
  //     Total={itemdata.total}
  //     totqtn={itemdata.products.length}
  //     winename={itemdata.name[0]}
  //     wineprice={itemdata.price[0]}
  //     wineqty={itemdata.qty[0]}
  //   />;
  // };

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
    <ScrollView>
      <View>
        <SectionList
          sections={[{title: 'My Orders', data: masterdata}]}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <Card
              Total={item.total}
              totqtn={item.products.length}
              winename={item.name}
              wineprice={item.price}
              wineqty={item.qty}
            />
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}></Text>
          )}
        />
        {/* <FlatList
          data={masterdata}
          keyExtractor={item => item._id}
          {...props}
          //renderItem={({itemdata}) => orderdata}
          renderItem={(
            itemdata, // {ItemView}
          ) => (
            <Card
              Total={itemdata.item.total}
              totqtn={itemdata.item.products.length}
              winename={itemdata.item.name[0]}
              wineprice={itemdata.item.price[0]}
              wineqty={itemdata.item.qty[0]}
            />
          )}
        /> */}
      </View>
    </ScrollView>
  );
};

const Card = props => (
  <View style={styles.wine_card}>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.txt_qtn}>Final Amount: $ {props.Total}</Text>
      <Text style={styles.txt_qtn}>Total Products: {props.totqtn}</Text>
    </View>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text style={styles.txt_name}>{props.winename}</Text>
      <Text style={styles.txt_name}>Qty:{props.wineqty}</Text>
      <Text style={styles.txt_name}>Price:{props.wineprice}</Text>
    </View>
  </View>
);
const styles = StyleSheet.create({
  screenimage: {width: '100%', height: 150, paddingBottom: 20},
  wine_card: {
    padding: 10,
    flex: 1,
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 20,
    //flexDirection: 'column',
  },
  wine_image: {width: 80, height: 100, borderRadius: 20},
  // txt_name: {
  //   fontSize: 15,
  //   fontWeight: 'bold',
  //   paddingTop: 10,
  //   paddingBottom: 10,
  // },
  txt_price: {
    paddingBottom: 10,
    fontSize: 15,
    textAlign: 'center',
  },
  txt_qtn: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
});

export default MyordersScreen;
