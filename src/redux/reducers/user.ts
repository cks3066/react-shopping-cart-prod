import { User, UserAction } from 'types/index';

import { userTypes } from 'redux/actions';

const initialState: User = {
  username: '',
  email: '',
  address: '',
  phoneNumber: '',
};

const user = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case userTypes.SET_USER: {
      return { ...state, ...action.payload };
    }
    case userTypes.RESET_USER: {
      return initialState;
    }
    default:
      return state;
  }
};

export default user;
