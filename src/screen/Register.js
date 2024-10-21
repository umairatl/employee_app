import {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Keyboard,
  Alert,
} from 'react-native';
import InputBox from '../components/InputBox';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import CustomButton from '../components/Button';
import {emailRegex, passwordRegex} from '../utils/regex';
import {registerUser} from '../api/authApi';
import {SCREEN} from '../constant/navigation';
import {LOGIN_CONSTANT, REGISTER_CONSTANT} from '../constant/main';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeatPass] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [hidePass, setHidePass] = useState(true);
  const [hideRepeatPass, setHideRepeatPass] = useState(true);

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
        await registerUser(detail);

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
      <View style={styles.container}>
        <InputBox
          title={REGISTER_CONSTANT.FIRST_NAME}
          inputVal={firstName}
          setInputVal={setFirstName}
        />

        <InputBox
          title={REGISTER_CONSTANT.LAST_NAME}
          inputVal={lastName}
          setInputVal={setLastName}
        />

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

        <InputBox
          title={REGISTER_CONSTANT.CONFIRM_PASSWORD}
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
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'start',
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Register;
