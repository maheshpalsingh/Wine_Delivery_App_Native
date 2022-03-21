import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import Colors from '../assets/theme/Colors';
import {REGISTER} from '../constants/routeName';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const {navigate} = useNavigation();
  return (
    <View style={styles.screen}>
      <View>
        <Image
          style={styles.image}
          source={require('../assets/my-app/download.jpg')}
        />
      </View>
      <View>
        <Text style={styles.welcome}>Welcome</Text>
      </View>
      <View style={{paddingBottom: 10}}>
        <TextInput style={styles.input} placeholder="Username" />
      </View>
      <View style={{paddingBottom: 10}}>
        <TextInput style={styles.input} placeholder="Password" />
      </View>
      <View style={styles.buttonView}>
        <Button style={styles.button} title="Sign in" color={Colors.purple} />
      </View>
      <View>
        <Text style={styles.info}>Dont't have an Account</Text>
        <TouchableOpacity
          onPress={() => {
            navigate(REGISTER);
          }}>
          <Text style={styles.link}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.thistle,
  },
  image: {
    marginTop: 50,
    marginLeft: 70,
    borderRadius: 25,
  },
  welcome: {
    padding: 10,
    marginLeft: 150,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    paddingBottom: 10,
  },
  input: {
    borderBottomColor: Colors.purple,
    borderWidth: 1,
    marginLeft: '10%',
    marginRight: '20%',
    borderRadius: 12,
  },
  button: {
    borderRadius: 10,
  },
  buttonView: {
    paddingTop: 15,
    paddingLeft: 50,
    paddingRight: 50,
    fontSize: 22,
  },
  info: {
    fontSize: 18,
    padding: 25,
    flexDirection: 'row',
  },
  link: {
    paddingLeft: 25,
    color: Colors.primary,
    fontSize: 18,
  },
});

export default Login;
