import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/ForgotPassword';

import {COLORS} from '../assets/colors';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignIn} options={signInStyle} />
      <Stack.Screen name="SignUp" component={SignUp} options={signUpStyle} />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={forgotPasswordStyle}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

const signInStyle = {
  // headerLeft: false,
  title: 'Bem vindo',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.black},
};

const signUpStyle = {
  // headerLeft: false,
  title: 'Cadastre-se',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.black},
  headerTintColor: COLORS.black,
};

const forgotPasswordStyle = {
  title: 'Recuperar senha',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.black},
  headerTintColor: COLORS.black,
};
