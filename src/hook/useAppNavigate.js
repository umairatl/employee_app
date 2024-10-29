import {useNavigation} from '@react-navigation/native';
import {SCREEN} from '../constant/navigation';

export const useAppNavigate = () => {
  const navigation = useNavigation();

  const navigateToEditEmployee = () => {
    navigation.navigate(SCREEN.EMPLOYEE_EDIT);
  };

  const navigateToMainPage = () => {
    navigation.navigate(SCREEN.MAIN_PAGE);
  };

  const navigateToDetailsEmployee = () => {
    navigation.navigate(SCREEN.EMPLOYEE_DETAILS);
  };

  const navigateToLogin = () => {
    navigation.navigate(SCREEN.LOGIN);
  };

  const navigateToRegister = () => {
    navigation.navigate(SCREEN.REGISTRATION);
  };

  return {
    navigateToEditEmployee,
    navigateToMainPage,
    navigateToDetailsEmployee,
    navigateToLogin,
    navigateToRegister,
  };
};
