import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const InputBox = props => {
  const {
    isTitle = false,
    boxTitle,
    title,
    inputVal,
    setInputVal,
    secureTextEntry = false,
    keyboardType = 'default',
    passwordVisibleIcon = false,
    placeholder = '',
    onClickVisibleIcon,
    customStyle = {},
  } = props || {};

  return (
    <View>
      {isTitle && <Text style={styles.title}>{boxTitle}</Text>}
      <TextInput
        label={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={[styles.detailInput, customStyle]}
        placeholder={title}
        onChangeText={val => {
          setInputVal(val);
        }}
        value={inputVal}
        right={
          passwordVisibleIcon && (
            <TextInput.Icon
              icon={secureTextEntry ? 'eye-off' : 'eye'}
              onPress={onClickVisibleIcon}
            />
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
  },
  detailInput: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    borderColor: '#292989',
    borderWidth: 0.8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
  },
});

export default InputBox;
