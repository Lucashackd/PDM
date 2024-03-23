import React from 'react';
import {Text, View} from 'react-native';

const SignIn = props => {
  return (
    <View>
      <Text onPress={() => props.navigation.navigate('Home')}>Logar</Text>
      <Text onPress={() => props.navigation.navigate('SignUp')}>
        Cadastre-se
      </Text>
    </View>
  );
};

export default SignIn;
