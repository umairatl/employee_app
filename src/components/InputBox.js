import {View, Text, StyleSheet, TextInput} from 'react-native';
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
    onClickVisibleIcon,
  } = props || {};

  return (
    <View>
      {isTitle && <Text style={styles.title}>{boxTitle}</Text>}
      <View style={styles.wrapInput}>
        <TextInput
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          style={styles.detailInput}
          placeholder={title}
          onChangeText={val => {
            setInputVal(val);
          }}
          value={inputVal}
        />
        {passwordVisibleIcon && (
          <TouchableOpacity
            onPress={onClickVisibleIcon}
            style={{marginLeft: 10}}>
            <Icon
              name={secureTextEntry ? 'visibility-off' : 'visibility'}
              size={25}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
  },

  wrapInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailInput: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 8,
    shadowColor: '#000',
    flex: 1,
  },
});

export default InputBox;
