import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SCREEN} from '../constant/navigation';
import Login from '../screen/Login';
import Register from '../screen/Register';

const AuthStack = createStackNavigator();

const AuthNavi = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={SCREEN.LOGIN} component={Login} />
      <AuthStack.Screen name={SCREEN.REGISTRATION} component={Register} />
    </AuthStack.Navigator>
  );
};

export default AuthNavi;
