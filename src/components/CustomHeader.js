import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LogoutNav from './LogoutNav';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {SCREEN} from '../constant/navigation';
import {useSelector} from 'react-redux';

const CustomHeader = () => {
  const navigation = useNavigation();
  const countTotalEmployee = useSelector(
    state => state.employee.countTotalEmployee,
  );
  const countTotalPage = useSelector(state => state.employee.countTotalPage);
  const countItemInList = useSelector(state => state.employee.countItemInList);

  const onClickAddEmployee = () => {
    navigation.navigate(SCREEN.EMPLOYEE_ADD);
  };

  return (
    <View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#4c669f', '#292989', '#4c669f']}
        style={styles.wrapHeader}>
        <View
          style={{
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
          }}
          flexDirection="row">
          <TouchableOpacity onPress={onClickAddEmployee}>
            <View style={{marginLeft: 10}}>
              <Icon name="add" size={30} color="white" />
            </View>
          </TouchableOpacity>

          <Text style={styles.headerText}>Employee List</Text>
          <LogoutNav />
        </View>
      </LinearGradient>

      <View style={styles.wrapTitle}>
        <View style={styles.wrapCountSection}>
          <View>
            <Text style={styles.fontTotal}>{countTotalEmployee}</Text>
            <Text>total employees</Text>
          </View>

          <View>
            <Text style={styles.fontTotal}>{countTotalPage}</Text>
            <Text>total pages</Text>
          </View>

          <View>
            <Text style={styles.fontTotal}>{countItemInList}</Text>
            <Text>total in list </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapHeader: {
    paddingTop: 20,
    paddingBottom: 50,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  wrapTitle: {
    position: 'absolute',
    top: 65,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapCountSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '85%',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  fontTotal: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
  },
});

export default CustomHeader;
