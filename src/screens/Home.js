import React from 'react';
import {View} from 'react-native';
import MyButton from '../components/MyButton';
import {CommonActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import EncryptedStorage from 'react-native-encrypted-storage';

const Home = ({navigation}) => {
  async function removeUserSession() {
    try {
      await EncryptedStorage.removeItem('user_session');
    } catch (error) {
      console.log('Home: erro em removeUserSession: ' + error);
    }
  }

  const sair = () => {
    auth()
      .signOut()
      .then(() => {
        removeUserSession();
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
