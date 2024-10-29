import axios from 'axios';
import {api} from '../constant/baseApi';
import * as Keychain from 'react-native-keychain';

export async function registerUser(detail) {
  try {
    const res = await axios.post(`${api}/api/v1/auth/register`, detail);
    const data = res.data;
    const tokens = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };

    await Keychain.setGenericPassword('tokens', JSON.stringify(tokens));

    return data;
  } catch (err) {
    throw err;
  }
}

export async function loginUser(credential) {
  try {
    const res = await axios.post(`${api}/api/v1/auth/authenticate`, credential);

    const data = res.data;

    const tokens = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };

    await Keychain.setGenericPassword('tokens', JSON.stringify(tokens));
    console.log(data, 'DATAA');
    return data;
  } catch (err) {
    throw err;
  }
}
