import React, {useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MyButton from '../components/MyButton';
import {COLORS} from '../assets/colors';
import app from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { CommonActions } from '@react-navigation/native';
import Home from './Home';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState();

  const recuperarSenha = () => {
    Alert.alert('Recupearar Senha', 'Digite a nova senha');
  };

  const entrar = () => {
    if (email !== '' && pass != ''){
      auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
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
      Alert.alert(
        'ERRO',
        'Por favor, preencha os campos EMAIL e SENHA para entrar.',
      );
    }
  };

  const cadastrar = () => {
    Alert.alert('Realizar cadastro', 'SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.divSuperior}>
          <Image
            style={styles.image}
            source={require('../assets/images/logo.png')}
            accessibilityLabel="logo do app"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="blue"
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
            style={styles.input}
            secureTextEntry={true}
            placeholder="Senha"
            placeholderTextColor="blue"
            keyboardType="default"
            returnKeyType="go"
            onChangeText={t => setPass(t)}
          />
          <Text style={styles.textEsqueceuSenha} onPress={recuperarSenha}>
            Esqueceu sua senha?
          </Text>
          <MyButton texto="ENTRAR" onClick={entrar} />
        </View>
        <View style={styles.divInferior}>
          <View style={styles.divOuHr}>
            <View style={styles.divHr} />
            <Text style={styles.textOu}>OU</Text>
            <View style={styles.divHr} />
          </View>
          <View style={styles.divCadastrarSe}>
            <Text style={styles.textNormal}>Não tem uma conta?</Text>
            <Text style={styles.textCadastrarSe} onPress={cadastrar}>
              Cadastre-se
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  divSuperior: {
    flex: 5,
    alignItems: 'center',
  },
  divInferior: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
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
  },
  textEsqueceuSenha: {
    fontSize: 15,
    color: COLORS.accentSecundary,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  divOuHr: {
    flex: 1,
    width: '100%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divHr: {
    width: '30%',
    height: 1,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 2,
  },
  textOu: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
    color: COLORS.grey,
  },
  divCadastrarSe: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textNormal: {
    fontSize: 18,
    color: COLORS.black,
  },
  textCadastrarSe: {
    fontSize: 16,
    color: COLORS.accentSecundary,
    marginLeft: 5,
  },
});
