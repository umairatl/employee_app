import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import CustomHeader from '../components/CustomHeader';
import CustomHeaderDetails from '../components/CustomHeaderDetails';
import MainPage from '../components/MainPage';
import {SCREEN} from '../constant/navigation';
import {useAppNavigate} from '../hook/useAppNavigate';
import AddEmployee from '../screen/AddEmployee';
import EditEmpDetails from '../screen/EditDetails';
import EmployeeDetails from '../screen/ViewDetails';

const ContentStack = createStackNavigator();

const ContentNavi = () => {
  const {
    navigateToMainPage,
    navigateToEditEmployee,
    navigateToDetailsEmployee,
  } = useAppNavigate();

  return (
    <ContentStack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#292989'},
      }}>
      <ContentStack.Screen
        name={SCREEN.MAIN_PAGE}
        component={MainPage}
        options={{
          header: ({navigation}) => <CustomHeader />,
        }}
        // options={{
        //   headerLeft: () => null,
        //   gestureEnabled: false,
        //   headerRight: () => <LogoutNav />,
        // }}
      />
      <ContentStack.Screen
        name={SCREEN.EMPLOYEE_DETAILS}
        component={EmployeeDetails}
        options={{
          header: ({navigation}) => (
            <CustomHeaderDetails
              headerTitle="Employee Details"
              onClickBack={navigateToMainPage}
              rightIconContent="edit"
              onClickRightButton={navigateToEditEmployee}
            />
          ),
        }}
      />
      <ContentStack.Screen
        name={SCREEN.EMPLOYEE_EDIT}
        component={EditEmpDetails}
        options={{
          header: ({navigation}) => (
            <CustomHeaderDetails
              headerTitle="Edit Employee Details"
              onClickBack={navigateToDetailsEmployee}
            />
          ),
        }}
      />
      <ContentStack.Screen
        name={SCREEN.EMPLOYEE_ADD}
        options={{
          header: ({navigation}) => (
            <CustomHeaderDetails
              headerTitle="Add New Employee"
              onClickBack={navigateToMainPage}
            />
          ),
        }}
        component={AddEmployee}
      />
    </ContentStack.Navigator>
  );
};

export default ContentNavi;
