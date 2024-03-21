import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MyButton from './src/components/MyButton';

const PDM = () => {
  const [contador, setContador] = useState(0);

  const contar = () => {
    setContador(contador + 1);
  };

  const reset = () => {
    setContador(0);
  };

  return (
    <View>
      <Text style={styles.text}>Contador = {contador}</Text>
      <MyButton texto="Incrementar" onCLick={contar} />
      <MyButton texto="Resetar" onCLick={reset} />
    </View>
  );
};

export default PDM;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: 'black',
  },
});
