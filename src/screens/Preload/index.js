import React, {useEffect} from 'react';
import {Container, Image} from './styles';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';

const Preload = ({navigation}) => {
  async function retrieveUserSession() {
    try {
      const session = await EncryptedStorage.getItem('user_session');
      if (session !== undefined) {
        return JSON.parse(session);
      } else {
        return null;
      }
    } catch (error) {
      console.log('Home: erro em retrieveUserSession: ' + error);
    }
  }

  const loginUser = async () => {
    const user = await retrieveUserSession();
    if (user) {
      auth()
        .signInWithEmailAndPassword(user.data.email, user.data.pass)
        .then(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
        })
        .catch(e => {
          console.log('SignIn: erro em entrar ' + e);
          switch (e.code) {
            case 'auth/invalid-credential':
              Alert.alert('ERRO', 'Credencial inválida.');
              break;
            case 'auth/user-not-found':
              Alert.alert('ERRO', 'Usuário não encontrado.');
              break;
            case 'auth/wrong-password':
              Alert.alert('ERRO', 'Senha inválida.');
              break;
            case 'auth/invalid-email':
              Alert.alert('ERRO', 'Email inválido.');
              break;
            case 'auth/user-disabled':
              Alert.alert('ERRO', 'Usuário desativado.');
              break;
            default:
              Alert.alert('ERRO AO LOGAR', `${e}`);
          }
        });
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'SignIn'}],
        }),
      );
    }
  };

  useEffect(() => {
    loginUser();
  }, []);

  return (
    <Container>
      <Image
        source={require('../../assets/images/logo-short.png')}
        accessibilityLabel="logo do app"
      />
    </Container>
  );
};

export default Preload;
