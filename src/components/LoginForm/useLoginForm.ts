import authAPI from 'apis/auth';
import cartAPI from 'apis/cart';
import { USER_MESSAGE } from 'constants/message';
import PATH from 'constants/path';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cartActions, userActions } from 'redux/actions';
import { snackBarActions } from 'redux/reducers/snackBar';
import { createInputValueGetter } from 'utils/dom';

const useLoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;

    const formElement = e.target.elements;
    const getInputValue = createInputValueGetter(formElement);
    const user = {
      username: getInputValue('id'),
      password: getInputValue('password'),
    };

    try {
      const userInfo = await authAPI.login(user);
      const cartList = await cartAPI.getCartItemList();
      dispatch(cartActions.setCartItemList(cartList));
      dispatch(snackBarActions.show('로그인에 성공했습니다 😀'));
      dispatch(userActions.setUser(userInfo));
      navigate(PATH.BASE);
    } catch (error) {
      if (error instanceof Error) {
        alert(USER_MESSAGE.FAIL_LOGIN);
      }
    }
  };

  return { handleSubmit };
};

export default useLoginForm;
