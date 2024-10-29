import {useEffect, useState} from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {registerUser} from '../api/authApi';
import CustomButton from '../components/Button';
import InputBox from '../components/InputBox';
import {LOGIN_CONSTANT, REGISTER_CONSTANT} from '../constant/main';
import {SCREEN} from '../constant/navigation';
import {setTokens} from '../store/store';
import {emailRegex, passwordRegex} from '../utils/regex';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeatPass] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [hidePass, setHidePass] = useState(true);
  const [hideRepeatPass, setHideRepeatPass] = useState(true);
  const dispatch = useDispatch();

  const navigateToLogin = () => {
    navigation.navigate(SCREEN.LOGIN);
  };

  useEffect(() => {
    if (
      firstName.trim() &&
      lastName.trim() &&
      email.trim() &&
      password.trim() &&
      repeatPass.trim()
    ) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [firstName, lastName, email, password, repeatPass]);

  const validateRepeatPass = () => {
    if (repeatPass === password) {
      return true;
    } else {
      return false;
    }
  };

  const inputValidation = () => {
    const checkEmail = emailRegex.test(email);
    const checkPassword = passwordRegex.test(password);
    const checkReEnterPass = validateRepeatPass();

    if (!checkEmail) {
      Alert.alert(
        REGISTER_CONSTANT.INVALID_EMAIL,
        REGISTER_CONSTANT.INVALID_EMAIL_DESC,
        [{text: 'Back'}],
      );
      return false;
    }
    if (!checkPassword) {
      Alert.alert(
        REGISTER_CONSTANT.INVALID_PASSWORD,
        REGISTER_CONSTANT.INVALID_PASSWORD_DESC,
        [{text: 'Back'}],
      );
      return false;
    }
    if (!checkReEnterPass) {
      Alert.alert(
        REGISTER_CONSTANT.INVALID_PASSWORD,
        REGISTER_CONSTANT.PASS_NOT_MATCH,
        [{text: 'Back'}],
      );

      return false;
    }
    return true;
  };

  const onClickRegister = async () => {
    if (inputValidation()) {
      const detail = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };

      try {
        const res = await registerUser(detail);

        dispatch(
          setTokens({
            accessToken: res.access_token,
            refreshToken: res.refresh_token,
          }),
        );
        Alert.alert(
          REGISTER_CONSTANT.REGISTERED,
          REGISTER_CONSTANT.REGISTER_SUCCESS_DESC,
          [
            {
              text: 'Home',
              onPress: () => navigation.navigate(SCREEN.MAIN_PAGE),
            },
          ],
        );
      } catch (err) {
        Alert.alert('Error', `${err.response.data.message}`, [{text: 'Ok'}]);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{backgroundColor: '#292989'}}>
        <View style={styles.container}>
          <View style={styles.wrapImg}>
            <Image
              source={require('../../assets/images/register.png')}
              style={{width: '70%', height: 200}}
            />
          </View>

          <Text style={{fontSize: 20, color: 'black', textAlign: 'center'}}>
            Register for user
          </Text>

          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <InputBox
                placeholder={REGISTER_CONSTANT.FIRST_NAME}
                inputVal={firstName}
                setInputVal={setFirstName}
                customStyle={{width: 165}}
              />

              <InputBox
                placeholder={REGISTER_CONSTANT.LAST_NAME}
                inputVal={lastName}
                setInputVal={setLastName}
                customStyle={{width: 165}}
              />
            </View>

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

            <InputBox
              placeholder={REGISTER_CONSTANT.CONFIRM_PASSWORD}
              inputVal={repeatPass}
              setInputVal={setRepeatPass}
              secureTextEntry={hideRepeatPass}
              passwordVisibleIcon={true}
              onClickVisibleIcon={() => {
                setHideRepeatPass(!hideRepeatPass);
              }}
            />

            <TouchableOpacity onPress={navigateToLogin}>
              <View>
                <Text style={{textDecorationLine: 'underline', marginTop: 10}}>
                  {REGISTER_CONSTANT.ALREADY_HAVE_ACC}
                </Text>
              </View>
            </TouchableOpacity>

            <CustomButton
              title={REGISTER_CONSTANT.REGISTER}
              isBtnDisabled={isBtnDisabled}
              btnFunction={onClickRegister}
            />
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'start',
    justifyContent: 'start',
    marginTop: 40,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 10,
    height: '100%',
    borderTopLeftRadius: 70,
  },
  wrapImg: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Register;
