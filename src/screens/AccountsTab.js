import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Button} from 'react-native';
import Colors from '../assets/theme/Colors';
import {MY_DETAILS} from '../constants/routeName';

const AccountsTab = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.screen}>
        <Text style={styles.text1}>MAHESH</Text>
        <Button title="EDIT" />
      </View>
      <View style={styles.text2}>
        <Text>21 - maheshpalsingh@gmail.com</Text>
      </View>
      <View style={{paddingTop: 10}}>
        <Text style={{fontWeight: '1000'}}>
          _________________________________________________________________
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    fontSize: 29,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  text1: {
    fontStyle: 'bold',
    fontWeight: '600',
    fontSize: 20,
  },
  text2: {
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default AccountsTab;
