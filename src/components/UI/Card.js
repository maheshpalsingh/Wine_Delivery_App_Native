import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card = props => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'red',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    marginRight: 10,
    marginLeft: 10,
  },
});

export default Card;
