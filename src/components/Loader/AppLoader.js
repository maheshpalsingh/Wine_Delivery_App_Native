import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const Apploader = () => {
  return (
    <View style={[styles.container]}>
      <LottieView
        source={require('./../../assets/loader/lf30_editor_urmhvg57.json')}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'rgba(0,0,0,0)',
  },
});

export default Apploader;
