import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IconArrowAnt from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomHeaderDetails = props => {
  const {
    headerTitle = '',
    onClickBack,
    rightIconContent = null,
    onClickRightButton = null,
  } = props;

  return (
    <View style={styles.wrapHeader}>
      <View
        style={{
          justifyContent: rightIconContent ? 'space-between' : 'center',
          width: '100%',
          alignItems: 'center',
        }}
        flexDirection="row">
        <TouchableOpacity onPress={onClickBack}>
          <View style={{marginLeft: 10, marginRight: 10}}>
            <IconArrowAnt name="arrowleft" size={30} color="white" />
          </View>
        </TouchableOpacity>

        <Text style={styles.headerText}>{headerTitle}</Text>

        {rightIconContent && onClickRightButton && (
          <TouchableOpacity onPress={onClickRightButton}>
            <View style={{marginRight: 10}}>
              <Icon name={rightIconContent} size={30} color="white" />
            </View>
          </TouchableOpacity>
        )}
      </View>

      {headerTitle === 'Employee Details' && (
        <View style={styles.wrapTitle}>
          <View style={styles.wrapCountSection}>
            <View>
              <Image
                source={require('../../assets/images/profilePic.jpeg')}
                style={{
                  width: 130,
                  height: 130,
                  borderRadius: 100,
                }}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapHeader: {
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: 'center',
    backgroundColor: '#292989',
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  wrapTitle: {
    position: 'absolute',
    top: 75,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapCountSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    width: '80%',
  },
});

export default CustomHeaderDetails;
