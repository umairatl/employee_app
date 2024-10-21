import {Text, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomButton from './Button';

const Pagination = props => {
  const {btnFunction, title, isBtnDisabled = false} = props || {};

  return <CustomButton title="prev" />;
};

const styles = StyleSheet.create({
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

export default Pagination;
