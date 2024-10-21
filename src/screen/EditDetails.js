import {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {updateEmployeeDetails} from '../api/employee';
import CustomButton from '../components/Button';
import InputBox from '../components/InputBox';
import {SCREEN} from '../constant/navigation';

const EditEmpDetails = ({route, navigation}) => {
  const {item, id} = route.params || {};
  const [firstName, setFirstName] = useState(item?.firstName);
  const [lastName, setLastName] = useState(item?.lastName);
  const [email, setEmail] = useState(item?.email);
  const [department, setDepartment] = useState(item?.department);
  const [salary, setSalary] = useState(item?.salary.toString());
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
            onPress: () => navigation.navigate(SCREEN.EMPLOYEE_DETAILS),
          },
        ]);
      }
    } catch (err) {
      console.log('Error onClickUpdateDetail', err);
    }
  };

  return (
    <View style={styles.container}>
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
        boxTitle="Salary :"
      />
      <CustomButton
        title="Save"
        isBtnDisabled={isBtnDisabled}
        btnFunction={onClickUpdateDetail}
      />
    </View>
  );
};

export default EditEmpDetails;

const styles = StyleSheet.create({
  container: {
    alignItems: 'start',
    margin: 20,
  },
});
