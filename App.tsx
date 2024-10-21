import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LogoutNav from './src/components/LogoutNav';
import MainPage from './src/components/MainPage';
import {SCREEN} from './src/constant/navigation';
import AddEmployee from './src/screen/AddEmployee';
import EditEmpDetails from './src/screen/EditDetails';
import Login from './src/screen/Login';
import Register from './src/screen/Register';
import EmployeeDetails from './src/screen/ViewDetails';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={SCREEN.LOGIN}
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: {backgroundColor: '#292989'},
        }}>
        <Stack.Screen name={SCREEN.LOGIN} component={Login} />
        <Stack.Screen
          name={SCREEN.REGISTRATION}
          component={Register}
          options={{
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name={SCREEN.MAIN_PAGE}
          component={MainPage}
          options={{
            headerLeft: () => null,
            gestureEnabled: false,
            headerRight: () => <LogoutNav />,
          }}
        />
        <Stack.Screen
          name={SCREEN.EMPLOYEE_DETAILS}
          component={EmployeeDetails}
        />
        <Stack.Screen name={SCREEN.EMPLOYEE_EDIT} component={EditEmpDetails} />
        <Stack.Screen name={SCREEN.EMPLOYEE_ADD} component={AddEmployee} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
