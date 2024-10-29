import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {deleteEmployeeById, employeeDetails} from '../api/employee';
import {
  ADD_CONSTANT,
  LOGIN_CONSTANT,
  REGISTER_CONSTANT,
  VIEW_EMPLOYEE_CONSTANT,
} from '../constant/main';
import {SCREEN} from '../constant/navigation';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {setEmployeeItem} from '../store/employeeSlice';

export default function EmployeeDetails({navigation}) {
  const [item, setItem] = useState({});
  const id = useSelector(state => state.employee.employeeId);
  const dispatch = useDispatch();

  const getEmployeeDetails = async () => {
    try {
      const data = await employeeDetails(id);
      dispatch(setEmployeeItem({employeeItem: data}));
      setItem(data);
    } catch (err) {
      console.log('Error getEmployeeDetails', err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getEmployeeDetails();
    }, []),
  );

  const onClickDelete = async () => {
    try {
      const response = await deleteEmployeeById(id);
      if (response.status === 204) {
        Alert.alert(
          VIEW_EMPLOYEE_CONSTANT.DELETED,
          VIEW_EMPLOYEE_CONSTANT.EMPLOYEE_DELETED_SUCCESS,
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate(SCREEN.MAIN_PAGE),
            },
          ],
        );
      }
    } catch (err) {
      console.log('Error onClickDelete', err);
    }
  };

  const onDeleteConfirmation = () => {
    Alert.alert(
      VIEW_EMPLOYEE_CONSTANT.CONFIRMATION,
      VIEW_EMPLOYEE_CONSTANT.DELETE_CONFIRM_DESC,
      [
        {
          text: 'Yes',
          onPress: () => onClickDelete(),
        },
        {
          text: 'No',
        },
      ],
    );
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View flexDirection="row" style={styles.wrapContent}>
          <Text
            style={styles.title}>{`${REGISTER_CONSTANT.FIRST_NAME} :`}</Text>
          <Text style={styles.desc}> {item.firstName}</Text>
        </View>

        <View flexDirection="row" style={styles.wrapContent}>
          <Text style={styles.title}>{`${REGISTER_CONSTANT.LAST_NAME} :`}</Text>
          <Text style={styles.desc}> {item.lastName}</Text>
        </View>

        <View flexDirection="row" style={styles.wrapContent}>
          <Text style={styles.title}>{`${LOGIN_CONSTANT.EMAIL} :`}</Text>
          <Text style={styles.desc}> {item.email}</Text>
        </View>

        <View flexDirection="row" style={styles.wrapContent}>
          <Text style={styles.title}>{`${ADD_CONSTANT.DEPARTMENT} :`}</Text>
          <Text style={styles.desc}> {item.department}</Text>
        </View>

        <View flexDirection="row" style={styles.wrapContent}>
          <Text style={styles.title}>{`${ADD_CONSTANT.SALARY} :`}</Text>
          <Text style={styles.desc}>$ {item.salary}</Text>
        </View>
      </View>

      <View style={styles.wrapBtn}>
        <TouchableOpacity onPress={onDeleteConfirmation}>
          <View
            flexDirection="row"
            alignItems="center"
            style={styles.deleteBtn}>
            <Icon name="delete" size={40} color="white" />
            <Text style={{color: 'white', fontSize: 16}}>Delete user</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 110,
    marginRight: 15,
    marginLeft: 15,
    padding: 15,
    borderRadius: 30,
  },
  title: {
    fontSize: 16,
    color: 'black',
  },
  desc: {
    fontSize: 14,
    color: '#4A4A4A',
  },
  wrapBtn: {
    marginTop: 35,
    marginLeft: 20,
  },
  deleteBtn: {
    backgroundColor: '#8B0000',
    width: 150,
    padding: 10,
    borderRadius: 30,
    // width: 50,
    // height: 50,
  },
  background: {
    // backgroundColor: '#292989',
    height: '100%',
  },
  wrapContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingBottom: 30,
    borderBottomWidth: 0.3,
    borderBottomColor: 'grey',
  },
});
