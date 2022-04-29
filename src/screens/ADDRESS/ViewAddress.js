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
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Colors from '../../assets/theme/Colors';
import Address from '../../components/UI/Address';
import {ADD_ADDRESS, URL} from '../../constants/routeName';
const axios = require('axios');
const WIDTH = Dimensions.get('window').width;
const HEIGHT = 150;

const ViewAddress = ({navigation}, props) => {
  const [masterdata, setmasterdata] = useState([]);
  const [isModalVisible, setisModalVisible] = useState(false);
  let token = useSelector(state => state.cart.token);

  useEffect(() => {
    fetchAddress();

    return () => {};
  }, [masterdata]);
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
      .get(`${URL}/user/getmy/addresses`, config)
      .then(response => {
        setmasterdata(response.data ?? []);
        // console.log(masterdata);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  const removeaddress = id => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this address?',
      [
        {
          text: 'Cancel',
          style: styles.alert,
        },
        {
          text: 'OK',
          onPress: () => {
            axios
              .delete(`${URL}/user/delete/myaddress/${id}`, config)
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
          },
        },
      ],
    );
  };

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
      <>
        <Button
          style={{paddingTop: 10}}
          color={Colors.purple}
          onPress={() => {
            navigation.navigate(ADD_ADDRESS);
          }}>
          Add One
        </Button>

        <FlatList
          showsVerticalScrollIndicator={false}
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
              onRemove={() => {
                removeaddress(itemData.item._id);
              }}
            />
          )}
        />
      </>
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
  alert: {
    color: 'red',
  },
});

export default ViewAddress;
