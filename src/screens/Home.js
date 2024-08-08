import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../assets/colors';
import LogoutButton from '../components/LogoutButton';

const Home = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      // headerLeft: false,
      title: 'Home',
      headerStyle: {backgroundColor: COLORS.primary},
      headerTitleStyle: {color: COLORS.black},
      headerRight: () => <LogoutButton />,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontSize: 24,
  },
});
