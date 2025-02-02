import PATH from 'constants/path';
import { User } from 'types/index';
import { axios, axiosWithToken } from 'configs/api';

const authAPI = {
  login: async function (user: User) {
    const {
      data: { accessToken },
    } = await axios.post(PATH.REQUEST_AUTH_TOKEN, user);

    sessionStorage.setItem('accessToken', accessToken);

    return this.getUserInfo();
  },

  getUserInfo: async function () {
    const { data } = await axiosWithToken.get(PATH.REQUEST_CUSTOMER_ME);

    return data;
  },

  signup: async function (user: User) {
    await axios.post(PATH.REQUEST_CUSTOMER, user);
  },

  editUserInfo: async function (user: User) {
    await axiosWithToken.put(PATH.REQUEST_CUSTOMER_ME, user);

    return this.getUserInfo();
  },

  deleteUser: async function () {
    await axiosWithToken.delete(PATH.REQUEST_CUSTOMER_ME);

    sessionStorage.removeItem('accessToken');
  },

  checkIdDuplicated: async function (id: string) {
    const requestBody = { username: id };

    const { data } = await axios.post(
      '/customers/duplication/username',
      requestBody
    );

    return data;
  },

  checkEmailDuplicated: async function (email: string) {
    const requestBody = { email };

    const { data } = await axios.post(
      '/customers/duplication/email',
      requestBody
    );

    return data;
  },
};

export default authAPI;
