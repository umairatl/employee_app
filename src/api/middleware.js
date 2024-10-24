import axios from 'axios';
import * as Keychain from 'react-native-keychain';

const apiWithInterceptor = axios.create({
  baseURL: 'https://disastrous-ursola-tajjgroup-5d7bcd12.koyeb.app/api/v1',
});

// Rq interceptor
apiWithInterceptor.interceptors.request.use(
  async config => {
    try {
      const getStorage = await Keychain.getGenericPassword();
      const parsedPassword = JSON.parse(getStorage.password);
      const accessToken = parsedPassword.accessToken;

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`; // Attach the token to the request headers
      }
    } catch (err) {
      console.log('Error retrieving accessToken from SecureStore', err);
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor
apiWithInterceptor.interceptors.response.use(
  response => response,

  async error => {
    const originalRequest = error.config;

    // If the error status is 403 (from backend) && original Rq is used to prevent the code from entering an infinite loop if the token refresh keeps failing
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const getStorage = await Keychain.getGenericPassword();
        const parsedPassword = JSON.parse(getStorage.password);
        const refreshToken = parsedPassword.refreshToken;
        const res = await axios.post(
          'https://disastrous-ursola-tajjgroup-5d7bcd12.koyeb.app/api/v1/auth/refresh-token',
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );

        const data = res.data;
        console.log(data);
        const tokens = {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        };

        await Keychain.setGenericPassword('tokens', JSON.stringify(tokens));
        // Update the original request with the new access token and make request again
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return axios(originalRequest);
      } catch (err) {
        console.log('Error refreshing accessToken', err);
      }
    }

    return Promise.reject(error);
  },
);

export default apiWithInterceptor;
