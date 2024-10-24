import {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {addNewEmployee} from '../api/employee';
import CustomButton from '../components/Button';
import InputBox from '../components/InputBox';
import {SCREEN} from '../constant/navigation';
import {
  ADD_CONSTANT,
  LOGIN_CONSTANT,
  REGISTER_CONSTANT,
} from '../constant/main';

const AddEmployee = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  useEffect(() => {
    if (
      firstName.trim() &&
      lastName.trim() &&
      email.trim() &&
      department.trim() &&
      salary.trim()
    ) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [firstName, lastName, email, department, salary]);

  const onClickAdd = async () => {
    try {
      const details = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        department: department,
        salary: parseFloat(salary),
      };

      const res = await addNewEmployee(details);
      if (res.status === 200) {
        Alert.alert(ADD_CONSTANT.UPDATED, ADD_CONSTANT.NEW_EMPLOYEE_CREATED, [
          {
            text: ADD_CONSTANT.SEE_NEW_LIST,
            onPress: () => navigation.navigate(SCREEN.MAIN_PAGE),
          },
        ]);
      }
    } catch (err) {
      console.log('Error addNewEmployee', err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <InputBox
          title={REGISTER_CONSTANT.FIRST_NAME}
          inputVal={firstName}
          isTitle={true}
          setInputVal={setFirstName}
          boxTitle={`${REGISTER_CONSTANT.FIRST_NAME} :`}
        />
        <InputBox
          title={REGISTER_CONSTANT.LAST_NAME}
          inputVal={lastName}
          isTitle={true}
          setInputVal={setLastName}
          boxTitle={`${REGISTER_CONSTANT.LAST_NAME}`}
        />
        <InputBox
          title={LOGIN_CONSTANT.EMAIL}
          inputVal={email}
          isTitle={true}
          setInputVal={setEmail}
          boxTitle={`${LOGIN_CONSTANT.EMAIL}`}
        />
        <InputBox
          title={ADD_CONSTANT.DEPARTMENT_NAME}
          inputVal={department}
          isTitle={true}
          setInputVal={setDepartment}
          boxTitle={`${ADD_CONSTANT.DEPARTMENT}`}
        />
        <InputBox
          title={ADD_CONSTANT.SALARY}
          inputVal={salary}
          isTitle={true}
          setInputVal={setSalary}
          keyboardType="numeric"
          boxTitle={`${ADD_CONSTANT.SALARY}`}
        />
        <CustomButton
          title={ADD_CONSTANT.SAVE}
          isBtnDisabled={isBtnDisabled}
          btnFunction={onClickAdd}
        />
      </ScrollView>
    </View>
  );
};

export default AddEmployee;

const styles = StyleSheet.create({
  container: {
    alignItems: 'start',
    margin: 20,
    flex: 1,
  },
});
