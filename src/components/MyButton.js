import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';

const MyButton = props => {
  // console.log(props);
  return (
    <TouchableHighlight style={styles.button} onPress={props.onCLick}>
      <Text>{props.texto}</Text>
    </TouchableHighlight>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: 'white',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#bbbbbb',
    padding: 10,
    margin: 10,
  },
});
