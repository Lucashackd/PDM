import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';

const MyButton = props => {
  console.log(props);
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
    color: 'black',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ffe51f',
    padding: 10,
    margin: 10,
  },
});
