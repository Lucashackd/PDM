import React, {useState} from 'react';
import {Alert, StyleSheet, TextInput, View} from 'react-native';
import {COLORS} from '../assets/colors';
import MyButton from '../components/MyButton';
import auth from '@react-native-firebase/auth';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const recover = () => {
    if (email !== '') {
      console.log(email);
      auth()
        .sendPasswordResetEmail(email)
        .then(r => {
          Alert.alert(
            'Atenção',
            'Enviamos um email de recuperação de senha para o seguinte endereço: ' +
              email,
            [{text: 'OK', onPress: () => navigation.goBack()}],
          );
        })
        .catch(e => {
          console.log('ForgotPassword: erro em recover ' + e);
          switch (e.code) {
            case 'auth/invalid-credential':
              Alert.alert('ERRO', 'Credencial inválida.');
              break;
            case 'auth/user-not-found':
              Alert.alert('ERRO', 'Usuário não encontrado.');
              break;
            case 'auth/invalid-email':
              Alert.alert('ERRO', 'Email inválido.');
              break;
            case 'auth/user-disabled':
              Alert.alert('ERRO', 'Usuário desativado.');
              break;
            default:
              Alert.alert('ERRO AO RECUPERAR', `${e}`);
          }
        });
    } else {
      Alert.alert('ATENÇÃO', 'Preencha o campo com o email cadastrado.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={COLORS.grey}
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="go"
        onChangeText={t => setEmail(t)}
        autoFocus={true}
      />
      <MyButton texto="Recuperar" onClick={recover} />
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '95%',
    height: 50,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
    color: COLORS.black,
    marginTop: 40,
  },
});
