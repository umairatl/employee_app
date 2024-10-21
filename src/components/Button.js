import {Text, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CustomButton = props => {
  const {btnFunction, title, isBtnDisabled = false} = props || {};

  return (
    <TouchableOpacity disabled={isBtnDisabled} onPress={btnFunction}>
      <View
        style={[
          styles.wrapBtn,
          {backgroundColor: isBtnDisabled ? 'grey' : '#292989'},
        ]}>
        <Text style={styles.btnText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
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

export default CustomButton;
