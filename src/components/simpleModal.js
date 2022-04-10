import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import Colors from '../assets/theme/Colors';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = 150;

const SimpleModal = () => {
  const [isModalVisible, setisModalVisible] = useState(false);
  const changeModalVisible = bool => {
    setisModalVisible(bool);
  };
  return (
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
          <Text style={styles.updatetext}>Update</Text>
          <TextInput style={styles.modalinput} />
          <View style={styles.modalbutton}>
            <Button title="Update" />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
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

export default SimpleModal;
