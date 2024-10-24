import {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {loginUser} from '../api/authApi';
import CustomButton from '../components/Button';
import InputBox from '../components/InputBox';
import {LOGIN_CONSTANT} from '../constant/main';
import {SCREEN} from '../constant/navigation';
import {setTokens} from '../store/store';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [hidePass, setHidePass] = useState(true);
  const dispatch = useDispatch();

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
      email: email,
      password: password,
    };

    try {
      const res = await loginUser(credential);
      dispatch(
        setTokens({
          accessToken: res.access_token,
          refreshToken: res.refresh_token,
        }),
      );
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
