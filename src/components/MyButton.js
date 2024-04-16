import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import {COLORS} from '../assets/colors';

const MyButton = props => {
  // console.log(props);
  return (
    <TouchableHighlight style={styles.button} onPress={props.onClick}>
      <Text style={styles.text}>{props.texto}</Text>
    </TouchableHighlight>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: COLORS.white,
  },
  button: {
    width: '95%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});
