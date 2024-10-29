import {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {updateEmployeeDetails} from '../api/employee';
import CustomButton from '../components/Button';
import InputBox from '../components/InputBox';
import {SCREEN} from '../constant/navigation';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';

const EditEmpDetails = ({navigation}) => {
  const id = useSelector(state => state.employee.employeeId);
  const employeeItem = useSelector(state => state.employee.employeeItem);

  const [firstName, setFirstName] = useState(employeeItem.firstName || '');
  const [lastName, setLastName] = useState(employeeItem.lastName || '');
  const [email, setEmail] = useState(employeeItem.email || '');
  const [department, setDepartment] = useState(employeeItem.department || '');
  const [salary, setSalary] = useState(employeeItem.salary.toString() || '');
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

  const onClickUpdateDetail = async () => {
    try {
      const detail = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        department: department,
        salary: parseFloat(salary),
      };

      const res = await updateEmployeeDetails(id, detail);
      if (res.status === 200) {
        Alert.alert('Updated', 'Your details are updated', [
          {
            text: 'See details',
            onPress: () => navigation.navigate(SCREEN.EMPLOYEE_DETAILS, {id}),
          },
        ]);
      }
    } catch (err) {
      console.log('Error onClickUpdateDetail', err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.wrapForm}>
          <InputBox
            title="First Name"
            inputVal={firstName}
            isTitle={true}
            setInputVal={setFirstName}
            boxTitle="First Name :"
          />
          <InputBox
            title="Last Name"
            inputVal={lastName}
            isTitle={true}
            setInputVal={setLastName}
            boxTitle="Last Name :"
          />
          <InputBox
            title=" Email"
            inputVal={email}
            isTitle={true}
            setInputVal={setEmail}
            boxTitle="Email :"
          />
          <InputBox
            title="Department Name"
            inputVal={department}
            isTitle={true}
            setInputVal={setDepartment}
            boxTitle="Department :"
          />
          <InputBox
            title="Salary"
            inputVal={salary}
            isTitle={true}
            setInputVal={setSalary}
            keyboardType="numeric"
            boxTitle="Salary Amount ($):"
          />
          <CustomButton
            title="Save"
            isBtnDisabled={isBtnDisabled}
            btnFunction={onClickUpdateDetail}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditEmpDetails;

const styles = StyleSheet.create({
  container: {
    alignItems: 'start',
    flex: 1,
  },
  wrapForm: {
    backgroundColor: 'white',
    padding: 45,
    height: '100%',
    marginTop: 25,
    borderTopStartRadius: 100,
  },
});
