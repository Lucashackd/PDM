import React from 'react';
import {View} from 'react-native';
import MyButton from '../components/MyButton';
import {CommonActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Home = ({navigation}) => {
  const sair = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'SignIn'}],
          }),
        );
      });
  };

  return (
    <View>
      <MyButton texto="SAIR" onClick={sair} />
    </View>
  );
};

export default Home;
