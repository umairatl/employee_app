import {TouchableOpacity, View} from 'react-native';
import * as Keychain from 'react-native-keychain';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {setTokens} from '../store/authSlice';

const LogoutNav = () => {
  const dispatch = useDispatch();

  const onClickLogout = async () => {
    await Keychain.resetGenericPassword();

    dispatch(
      setTokens({
        accessToken: null,
        refreshToken: null,
      }),
    );
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          onClickLogout();
        }}>
        <View style={{marginRight: 10}}>
          <Icon name="logout" size={30} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LogoutNav;
