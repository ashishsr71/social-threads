import axios from "axios";
import store from './state/store';





const setupInterceptors = () => {
    axios.interceptors.request.use(
      (config) => {
        const state = store.getState();
        const { token} = state.auth;
        if (accessToken) {
          config.headers.token = token;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const { config, response } = error;
        if (response) {
          if (response.status === 401) {
            try {
              await store.dispatch(refreshToken());
              const { token } = store.getState().auth;
              config.headers.token = token;
              return axios(config);
            } catch (refreshError) {
            //   store.dispatch(logout());
              return Promise.reject(refreshError);
            }
          } ;
        }
        return Promise.reject(error);
      }
    );
  };






  export default setupInterceptors;