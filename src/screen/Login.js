import {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import InputBox from '../components/InputBox';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import CustomButton from '../components/Button';
import {loginUser} from '../api/authApi';
import {LOGIN_CONSTANT} from '../constant/main';
import {SCREEN} from '../constant/navigation';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [hidePass, setHidePass] = useState(true);

  const navigateToRegister = async () => {
    navigation.navigate(SCREEN.REGISTRATION);
  };

  useEffect(() => {
    if (email.trim() && password.trim()) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [email, password]);

  const onClickLogin = async () => {
    const credential = {
      email: 'ahmed1@example.com',
      password: 'yourSecurePassword1',
      // email: email,
      // password: password,
    };

    try {
      await loginUser(credential);
      navigation.navigate(SCREEN.MAIN_PAGE);
    } catch (err) {
      Alert.alert('Error', `${err.response.data.message}`, [{text: 'Ok'}]);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <InputBox
          title={LOGIN_CONSTANT.EMAIL}
          inputVal={email}
          setInputVal={setEmail}
        />

        <InputBox
          title={LOGIN_CONSTANT.PASSWORD}
          inputVal={password}
          setInputVal={setPassword}
          secureTextEntry={hidePass}
          passwordVisibleIcon={true}
          onClickVisibleIcon={() => {
            setHidePass(!hidePass);
          }}
        />

        <TouchableOpacity onPress={navigateToRegister}>
          <View>
            <Text style={{marginTop: 10}}>{LOGIN_CONSTANT.NO_ACCOUNT}</Text>
          </View>
        </TouchableOpacity>
      </TouchableWithoutFeedback>

      <CustomButton
        title={LOGIN_CONSTANT.SUBMIT}
        btnFunction={onClickLogin}
        isBtnDisabled={isBtnDisabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'start',
    margin: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
    marginTop: 25,
    marginBottom: 10,
  },
  detailInput: {
    fontSize: 15,
    backgroundColor: '#fff',
    padding: 13,
    borderRadius: 8,
    shadowColor: '#000',
  },
  wrapBtn: {
    marginTop: 35,
    borderRadius: 8,
  },
  btnText: {
    padding: 14,
    textAlign: 'center',
    color: 'white',
    fontSize: 17,
  },
});

export default Login;
