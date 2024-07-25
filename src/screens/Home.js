import React from 'react';
import {View} from 'react-native';
import MyButton from '../components/MyButton';
import {CommonActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import EncryptedStorage from 'react-native-encrypted-storage';

const Home = ({navigation}) => {
  async function retrieveUserSession() {
    try {
      const session = await EncryptedStorage.getItem('user_session');
      console.log('retrieveUserSession');
      console.log(session);

      if (session !== undefined) {
        // Congrats! You've just retrieved your first value!
        return JSON.parse(session);
      }
    } catch (error) {
      console.log('Home: erro em retrieveUserSession: ' + error);
    }
  }

  retrieveUserSession();

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
