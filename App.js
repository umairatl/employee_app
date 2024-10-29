import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useSelector} from 'react-redux';
import AuthNavi from './src/navigation/authNavi';
import ContentNavi from './src/navigation/contentNavi';

const App = () => {
  const userToken = useSelector(state => state.tokens.accessToken);

  return (
    <NavigationContainer>
      {userToken ? <ContentNavi /> : <AuthNavi />}
    </NavigationContainer>
  );
};

export default App;
