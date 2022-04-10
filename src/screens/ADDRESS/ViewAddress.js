import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Colors from '../../assets/theme/Colors';
import Address from '../../components/UI/Address';
import {ADD_ADDRESS} from '../../constants/routeName';
const axios = require('axios');
const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://127.0.0.1:3000';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = 150;
const ViewAddress = ({navigation}, props) => {
  const [masterdata, setmasterdata] = useState([]);
  const [isModalVisible, setisModalVisible] = useState(false);
  let token = useSelector(state => state.cart.token);
  console.log('main token', token);
  //let token =
  //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQ5MzIyMGUwM2UyZDcyNjY5OGIzM2IiLCJpYXQiOjE2NDkwNjMxMDh9.YjatjbKxIhBggJh_d7Erw8vjv_IiARbS5-zgMDoiG50';
  useEffect(() => {
    fetchAddress();
    ADD_ADDRESS;
    return () => {};
  }, []);
  const changeModalVisible = bool => {
    setisModalVisible(bool);
  };
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      // Authorization: `Bearer ${token2}`,
    },
  };

  const fetchAddress = () => {
    axios
      .get(`${url}/user/getmy/addresses`, config)
      .then(response => {
        setmasterdata(response.data ?? []);
        // console.log(masterdata);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  //   const handleRemove = props => {
  //     axios
  //       .get(`${url}/user/delete/myaddress/${props.id}`, config)
  //       .then(response => {
  //         console.log('Deleted');
  //       })
  //       .catch(function (error) {
  //         alert(error);
  //       });
  //   };
  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setisModalVisible(!isModalVisible);
        }}>
        <TouchableOpacity disabled={true} style={styles.container}>
          <View style={styles.modal}>
            <Icon
              name="checkmark-circle-outline"
              size={90}
              color={Colors.white}
            />

            <View style={styles.modaltext}>
              <Text style={{fontSize: 26}}>Address Deleted</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <ScrollView>
        <Button
          onPress={() => {
            navigation.navigate(ADD_ADDRESS);
          }}>
          Add One
        </Button>

        <FlatList
          data={masterdata}
          keyExtractor={item => item._id}
          {...props}
          renderItem={itemData => (
            <Address
              name={itemData.item.fullname}
              address={itemData.item.address}
              city={itemData.item.city}
              state={itemData.item.state}
              pincode={itemData.item.pincode}
              number={itemData.item.phoneno}
              //onRemove={handleRemove}
              onRemove={() => {
                axios
                  .delete(
                    `${url}/user/delete/myaddress/${itemData.item._id}`,
                    config,
                  )
                  .then(
                    changeModalVisible(true),
                    setTimeout(() => {
                      changeModalVisible(false);
                    }, 2000),
                  )
                  .then(response => {
                    fetchAddress();
                  })
                  .catch(function (error) {
                    alert(error);
                  });
              }}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    height: 200,
    width: WIDTH - 60,
    paddingTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.thistle,
  },

  modaltext: {
    flex: 1,
    fontSize: '30',
  },
});

export default ViewAddress;
