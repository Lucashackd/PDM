import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import ForgotPassword from './src/screens/ForgotPassword';
import {StatusBar} from 'react-native';
import {COLORS} from './src/assets/colors';
import Preload from './src/screens/Preload';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primaryDark} />
      <Stack.Navigator initialRouteName="Preload">
        <Stack.Screen
          name="Preload"
          component={Preload}
          options={preloadStyle}
        />
        <Stack.Screen name="SignIn" component={SignIn} options={signInStyle} />
        <Stack.Screen name="SignUp" component={SignUp} options={signUpStyle} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={forgotPasswordStyle}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const preloadStyle = {
  headerShown: false,
};

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
