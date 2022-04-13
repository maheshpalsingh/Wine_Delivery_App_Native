import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../assets/theme/Colors';

const Address = props => {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.heading1}>{props.name}</Text>

        <Text style={styles.heading2}>
          {props.address},{props.city},{props.state}-{props.pincode}
        </Text>
        <Text style={styles.heading3}>{props.number}</Text>
      </View>
      <View style={{flex: 1}}>
        <Icon
          name="trash"
          size={24}
          style={styles.bin}
          onPress={props.onRemove}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: Colors.thistle,
    padding: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  heading1: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  heading2: {
    fontSize: 16,
  },
  heading3: {
    paddingTop: 10,
    fontSize: 16,
  },
  bin: {
    alignSelf: 'flex-end',
    color: Colors.purple,
  },
});

export default Address;
