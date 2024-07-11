import React, {useState} from 'react';
import {Body, TextInput} from './styles';
import MyButton from '../../components/MyButton';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import {CommonActions} from '@react-navigation/native';

const SignUp = ({navigation}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const cadastrar = () => {
    if (nome !== '' && email !== '' && pass !== '' && confirmPass !== '') {
      auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(() => {
          Alert.alert('Informação', 'Usuário cadastrado com sucesso.');
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Home'}],
            }),
          );
        })
        .catch(e => {
          console.log('SignIn: erro em entrar ' + e);
          switch (e.code) {
            // case 'auth/invalid-credential':
            //   Alert.alert('ERRO', 'Credencial inválida.');
            //   break;
            case 'auth/email-already-in-use':
              Alert.alert('ERRO', 'Email já está em uso.');
              break;
            case 'auth/invalid-email':
              Alert.alert('ERRO', 'Email inválido.');
              break;
            case 'auth/operation-not-allowed':
              Alert.alert('ERRO', 'Problemas ao cadastrar o usuário.');
              break;
            case 'auth/weak-password':
              Alert.alert(
                'ERRO',
                'Senha fraca, por favor, digite uma senha forte.',
              );
              break;
            default:
              Alert.alert('ERRO AO LOGAR', `${e}`);
          }
        });
    } else {
      Alert.alert(
        'ATENÇÃO',
        'Por favor, preencha os campos EMAIL e SENHA para entrar.',
      );
    }
  };
  return (
    <Body>
      <TextInput
        placeholder="Nome Completo"
        keyboardType="default"
        autoCapitalize="words"
        returnKeyType="next"
        onChangeText={t => setNome(t)}
        onEndEditing={() => this.emailTextInput.focus()}
      />
      <TextInput
        ref={ref => {
          this.emailTextInput = ref;
        }}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="next"
        onChangeText={t => setEmail(t)}
        onEndEditing={() => this.passTextInput.focus()}
      />
      <TextInput
        ref={ref => {
          this.passTextInput = ref;
        }}
        secureTextEntry={true}
        placeholder="Senha"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setPass(t)}
        onEndEditing={() => this.confirmPassTextInput.focus()}
      />
      <TextInput
        ref={ref => {
          this.confirmPassTextInput = ref;
        }}
        secureTextEntry={true}
        placeholder="Confirmar Senha"
        keyboardType="default"
        returnKeyType="send"
        onChangeText={t => setConfirmPass(t)}
        onEndEditing={() => cadastrar()}
      />
      <MyButton texto="Cadastrar" onClick={cadastrar} />
    </Body>
  );
};

export default SignUp;
