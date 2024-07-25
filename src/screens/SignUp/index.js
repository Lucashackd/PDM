import React, {useState} from 'react';
import {Body, TextInput} from './styles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {CommonActions} from '@react-navigation/native';
import MyButton from '../../components/MyButton';
import {Alert} from 'react-native';
import {COLORS} from '../../assets/colors';

const SignUp = ({navigation}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  function setUser(user) {
    firestore()
      .collection('users')
      .doc(user.uid)
      .set({
        nome: nome,
        email: email,
      })
      .then(() => {
        console.log('Usuário adicionado na base de dados.');
      })
      .catch(e => {
        console.log('SignIn: erro em setUser: ' + e);
      });
  }

  function cadastrar() {
    if (nome !== '' && email !== '' && pass !== '' && confirmPass !== '') {
      if (pass === confirmPass) {
        auth()
          .createUserWithEmailAndPassword(email, pass)
          .then(() => {
            let user = auth().currentUser;
            setUser(user);
            user
              .sendEmailVerification()
              .then(() => {
                Alert.alert(
                  'Informação',
                  'Foi enviado um email para ' + email + ' para verificação.',
                );
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'SignIn'}],
                  }),
                );
              })
              .catch(e => {
                console.log('SignUp: erro em cadastrar ' + e);
              });
          })
          .catch(e => {
            console.log('SignUp: erro em cadastrar ' + e);
            switch (e.code) {
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
        Alert.alert('ATENÇÃO', 'As senhas informadas não diferentes.');
      }
    } else {
      Alert.alert(
        'ATENÇÃO',
        'Por favor, preencha os campos EMAIL e SENHA para entrar.',
      );
    }
  }
  return (
    <Body>
      <TextInput
        placeholder="Nome Completo"
        placeholderTextColor={COLORS.grey}
        keyboardType="default"
        autoCapitalize="words"
        returnKeyType="next"
        onChangeText={t => setNome(t)}
        onSubmitEditing={() => this.emailTextInput.focus()}
        blurOnSubmit={false}
      />
      <TextInput
        ref={ref => {
          this.emailTextInput = ref;
        }}
        placeholder="Email"
        placeholderTextColor={COLORS.grey}
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="next"
        onChangeText={t => setEmail(t)}
        onSubmitEditing={() => this.passTextInput.focus()}
        blurOnSubmit={false}
      />
      <TextInput
        ref={ref => {
          this.passTextInput = ref;
        }}
        secureTextEntry={true}
        placeholder="Senha"
        placeholderTextColor={COLORS.grey}
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setPass(t)}
        onSubmitEditing={() => this.confirmPassTextInput.focus()}
        blurOnSubmit={false}
      />
      <TextInput
        ref={ref => {
          this.confirmPassTextInput = ref;
        }}
        secureTextEntry={true}
        placeholder="Confirmar Senha"
        placeholderTextColor={COLORS.grey}
        keyboardType="default"
        returnKeyType="send"
        onChangeText={t => setConfirmPass(t)}
        onSubmitEditing={() => cadastrar()}
      />
      <MyButton texto="Cadastrar" onClick={cadastrar} />
    </Body>
  );
};

export default SignUp;
