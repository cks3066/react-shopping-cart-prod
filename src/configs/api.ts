import Axios from 'axios';
import { getAccessToken } from 'utils/auth';

const axios = Axios.create({
  // 차리
  baseURL:
    'http://ec2-13-125-246-80.ap-northeast-2.compute.amazonaws.com:8080/api',
});

const axiosWithToken = Axios.create({
  // 차리
  baseURL:
    'http://ec2-13-125-246-80.ap-northeast-2.compute.amazonaws.com:8080/api',
});

axiosWithToken.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (!!accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axios, axiosWithToken };
