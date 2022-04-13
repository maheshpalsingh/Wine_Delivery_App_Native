import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://127.0.0.1:3000';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Colors from '../assets/theme/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
const WIDTH = Dimensions.get('window').width;

const MyDetailsScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userContact, setUserContact] = useState('');
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isModalVisible1, setisModalVisible1] = useState(false);
  const [isModalVisible2, setisModalVisible2] = useState(false);
  const [data, setdata] = useState('');

  let token = useSelector(state => state.cart.token);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchMyProfile();
    return () => {};
  }, [data]);

  const fetchMyProfile = () => {
    axios
      .get(`${url}/users/get/me`, config)
      .then(response => {
        setdata(response.data);
      })
      .catch(function (error) {
        alert(error);
      });
  };
  const changeModalVisible = bool => {
    setisModalVisible(bool);
  };
  const changeModalVisible1 = bool => {
    setisModalVisible1(bool);
  };
  const changeModalVisible2 = bool => {
    setisModalVisible2(bool);
  };
  const updateEmail = () => {
    console.log(userEmail);
    var dataToSend = {
      email: userEmail,
    };
    console.log(dataToSend);
    axios
      .patch(`${url}/users/update/me`, dataToSend, config)
      .then(() => console.log('Successfully Updates'))
      .then(() => {
        changeModalVisible1(false);
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
  const updateContact = () => {
    console.log(userEmail);
    var dataToSend = {
      contactno: userContact,
    };
    console.log(dataToSend);
    axios
      .patch(`${url}/users/update/me`, dataToSend, config)
      .then(() => console.log('Successfully Updates'))
      .then(() => {
        changeModalVisible2(false);
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
  const updateName = () => {
    console.log(userName);
    var dataToSend = {
      name: userName,
    };
    console.log(dataToSend);
    axios
      .patch(`${url}/users/update/me`, dataToSend, config)
      .then(() => console.log('Successfully Updates'))
      .then(() => {
        changeModalVisible(false);
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
  return (
    <SafeAreaView style={styles.screen}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setisModalVisible(!isModalVisible);
        }}>
        <TouchableOpacity disabled={true} style={styles.container}>
          <View style={styles.modal}>
            <Icon
              name="close"
              onPress={() => {
                changeModalVisible(false);
              }}
              size={15}
              style={{alignSelf: 'flex-end'}}
            />
            <Text style={styles.updatetext}>Update Name</Text>
            <TextInput
              defaultValue={data.name}
              style={styles.modalinput}
              onChangeText={UserEmail => setUserName(UserEmail)}
            />
            <View style={styles.modalbutton}>
              <Button
                color={Colors.purple}
                title="Update "
                onPress={() => {
                  updateName();
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible1}
        onRequestClose={() => {
          setisModalVisible1(!isModalVisible1);
        }}>
        <TouchableOpacity disabled={true} style={styles.container}>
          <View style={styles.modal}>
            <Icon
              name="close"
              onPress={() => {
                changeModalVisible1(false);
              }}
              size={15}
              style={{alignSelf: 'flex-end'}}
            />
            <Text style={styles.updatetext}>Update Email</Text>
            <TextInput
              defaultValue={data.email}
              style={styles.modalinput}
              //value={data.email}
              onChangeText={UserEmail => setUserEmail(UserEmail)}
            />
            {/* <View>
              <Commanbutton title="update" style={styles.cb} />
            </View> */}

            <View style={styles.modalbutton}>
              <Button
                color={Colors.purple}
                title="Update"
                onPress={() => {
                  updateEmail();
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible2}
        onRequestClose={() => {
          setisModalVisible2(!isModalVisible2);
        }}>
        <TouchableOpacity disabled={true} style={styles.container}>
          <View style={styles.modal}>
            <Icon
              name="close"
              onPress={() => {
                changeModalVisible2(false);
              }}
              size={15}
              style={{alignSelf: 'flex-end'}}
            />
            <Text style={styles.updatetext}>Update Contact No.</Text>
            <TextInput
              defaultValue={data.contactno}
              style={styles.modalinput}
              onChangeText={UserEmail => setUserContact(UserEmail)}
            />
            <View style={styles.modalbutton}>
              <Button
                color={Colors.purple}
                title="Update "
                onPress={() => {
                  updateContact();
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <Text style={styles.heading}>Update Details</Text>
      <View style={styles.text1}>
        <Text style={styles.heading}>Name</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.data}>
            <Text style={styles.text2}>{data.name}</Text>
          </View>
          <View style={{width: 80, alignSelf: 'flex-end', padding: 10}}>
            <Button
              onPress={() => {
                changeModalVisible(true);
              }}
              title="Edit"
              color={Colors.purple}
            />
          </View>
        </View>

        <Text style={styles.heading}>Email</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.data}>
            <Text style={styles.text2}>{data.email}</Text>
          </View>

          <View style={{width: 80, alignSelf: 'flex-end', padding: 10}}>
            <Button
              onPress={() => {
                changeModalVisible1(true);
              }}
              title="Edit"
              color={Colors.purple}
            />
          </View>
        </View>

        <Text style={styles.heading}>Contactno</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.data}>
            <Text style={styles.text2}>{data.contactno}</Text>
          </View>

          <View style={{width: 80, alignSelf: 'flex-end', padding: 10}}>
            <Button
              onPress={() => {
                changeModalVisible2(true);
              }}
              title="Edit"
              color={Colors.purple}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cb: {
    height: 48,
    width: 350,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  modal: {
    padding: 20,
    height: 200,
    width: WIDTH - 60,
    paddingTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  screen: {
    padding: 10,
    backgroundColor: Colors.thistle,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'flex-start',
    margingBottom: 10,
  },
  heading: {
    padding: 10,
    fontSize: 18,
  },
  text1: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  text2: {
    marginLeft: 10,
    marginTop: 14,
    flex: 1,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  data: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    // alignSelf: 'center',
  },

  updatetext: {
    fontStyle: 'normal',
    fontSize: 20,
    alignItems: 'center',
    paddingLeft: 10,
  },
  modalbutton: {
    color: Colors.purple,
    width: WIDTH / 2,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  modalinput: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default MyDetailsScreen;
