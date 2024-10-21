import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Keychain from 'react-native-keychain';
import {SCREEN} from '../constant/navigation';

const LogoutNav = () => {
  const navigation = useNavigation();

  const onClickLogout = async () => {
    const clearKeychain = await Keychain.resetGenericPassword();

    if (clearKeychain) {
      navigation.navigate(SCREEN.LOGIN);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          onClickLogout();
        }}>
        <View style={{marginRight: 20}}>
          <Icon name="logout" size={30} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LogoutNav;
