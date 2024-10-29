import {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {loginUser} from '../api/authApi';
import CustomButton from '../components/Button';
import InputBox from '../components/InputBox';
import {LOGIN_CONSTANT} from '../constant/main';
import {SCREEN} from '../constant/navigation';
import {setTokens} from '../store/authSlice';

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
      email: 'ahmed1@example.com',
      password: 'yourSecurePassword1',
      // email: email,
      // password: password,
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
        <View style={styles.wrapImg}>
          <Image
            source={require('../../assets/images/login.png')}
            style={{width: 300, height: 250}}
          />
        </View>

        <Text style={styles.label}>Hey, welcome back !</Text>

        <View style={styles.wrapLoginBottom}>
          <InputBox
            placeholder={LOGIN_CONSTANT.EMAIL}
            inputVal={email}
            setInputVal={setEmail}
          />

          <InputBox
            placeholder={LOGIN_CONSTANT.PASSWORD}
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
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: 'bold',
                }}>
                {LOGIN_CONSTANT.NO_ACCOUNT}
              </Text>
            </View>
          </TouchableOpacity>

          <CustomButton
            title={LOGIN_CONSTANT.SUBMIT}
            btnFunction={onClickLogin}
            isBtnDisabled={isBtnDisabled}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'start',
    backgroundColor: '#292989',
  },
  wrapLoginBottom: {
    backgroundColor: 'white',
    height: '100%',
    paddingTop: 55,
    paddingRight: 25,
    paddingLeft: 25,
    borderTopLeftRadius: 70,
  },
  wrapImg: {
    alignItems: 'center',
    marginTop: 50,
  },
  label: {
    fontSize: 20,
    textAlign: 'center',
    // marginRight: 15,
    marginTop: 20,
    marginBottom: 15,
    color: 'white',
  },
});

export default Login;
