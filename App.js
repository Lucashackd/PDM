import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MyButton from './src/components/MyButton';

const PDM = () => {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    console.log('Montou o componente.');
  }, []);

  // useEffect(() => {
  //   console.log('Fez update no componente.');
  // });

  useEffect(() => {
    console.log('Fez update baseado em contador.');
  }, [contador]);

  const contar = () => {
    setContador(contador + 1);
  };

  const diminuir = () => {
    setContador(contador - 1);
  };

  const reset = () => {
    setContador(0);
  };

  return (
    <View>
      <Text style={styles.text}>Contador = {contador}</Text>
      <MyButton texto="Incrementar" onCLick={contar} />
      <MyButton texto="Decrementar" onCLick={diminuir} />
      <MyButton texto="Resetar" onCLick={reset} />
    </View>
  );
};

export default PDM;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: '#000066',
  },
});
