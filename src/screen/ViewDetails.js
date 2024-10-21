import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {deleteEmployeeById, employeeDetails} from '../api/employee';
import {SCREEN} from '../constant/navigation';
import {
  ADD_CONSTANT,
  LOGIN_CONSTANT,
  REGISTER_CONSTANT,
  VIEW_EMPLOYEE_CONSTANT,
} from '../constant/main';

export default function EmployeeDetails({route, navigation}) {
  const {id} = route.params || {};
  const [item, setItem] = useState({});

  const getEmployeeDetails = async () => {
    try {
      const data = await employeeDetails(id);
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
    <View style={styles.container}>
      <Text style={styles.title}>{`${REGISTER_CONSTANT.FIRST_NAME} :`}</Text>
      <Text style={styles.desc}> {item.firstName}</Text>

      <Text style={styles.title}>{`${REGISTER_CONSTANT.LAST_NAME} :`}</Text>
      <Text style={styles.desc}> {item.lastName}</Text>

      <Text style={styles.title}>{`${LOGIN_CONSTANT.EMAIL} :`}</Text>
      <Text style={styles.desc}> {item.email}</Text>

      <Text style={styles.title}>{`${ADD_CONSTANT.DEPARTMENT} :`}</Text>
      <Text style={styles.desc}> {item.department}</Text>

      <Text style={styles.title}>{`${ADD_CONSTANT.SALARY} :`}</Text>
      <Text style={styles.desc}> {item.salary}</Text>

      <View style={styles.wrapBtns}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(SCREEN.EMPLOYEE_EDIT, {id, item});
          }}>
          <View style={styles.wrapBtn}>
            <Text style={styles.btnText}>
              {VIEW_EMPLOYEE_CONSTANT.EDIT_DETAILS}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDeleteConfirmation}>
          <View style={styles.deleteBtn}>
            <Text style={styles.btnText}>
              {VIEW_EMPLOYEE_CONSTANT.DELETE_EMPLOYEE}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'start',
    margin: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
    marginTop: 25,
    marginBottom: 10,
  },
  desc: {
    fontSize: 20,
    marginBottom: 20,
  },
  wrapBtn: {
    marginTop: 35,
    backgroundColor: '#292989',
    borderRadius: 10,
    width: 160,
  },
  btnText: {
    padding: 14,
    textAlign: 'center',
    color: 'white',
    fontSize: 17,
  },
  wrapBtns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteBtn: {
    marginTop: 35,
    backgroundColor: '#8B0000',
    borderRadius: 14,
    width: 160,
  },
});
