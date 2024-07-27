import React from 'react';
import styled from 'styled-components/native';
import auth from '@react-native-firebase/auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import RNRestart from 'react-native-restart';

const ButtonExit = styled.TouchableHighlight`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const Image = styled.Image`
  width: 45px;
  height: 45px;
`;

const LogoutButton = () => {
  const signOut = () => {
    async function removeUserSession() {
      try {
        await EncryptedStorage.removeItem('user_session');
      } catch (error) {
        console.log('LogoutButton: erro em removeUserSession: ' + error);
      }
    }
    auth()
      .signOut()
      .then(() => {
        removeUserSession();
        RNRestart.restart();
      });
  };

  return (
    <ButtonExit onPress={signOut} underlayColor="transparent">
      <Image
        source={require('../assets/images/logout.png')}
        accessibilityLabel="botao de sair"
      />
    </ButtonExit>
  );
};

export default LogoutButton;
