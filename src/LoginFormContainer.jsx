import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';

import {
  changeLoginField,
  requestLogin,
  logout,
} from './slice';

import { get } from './utils';

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  const loginFields = useSelector(get('loginFields'));
  const accessToken = useSelector(get('accessToken'));

  const handleSubmit = () => {
    dispatch(requestLogin());
  };

  const handleClickLogout = () => {
    dispatch(logout());
  };

  const handleChange = useCallback(({ name, value }) => {
    dispatch(changeLoginField({ name, value }));
  }, [dispatch]);

  return (
    <>
      {accessToken ? (
        <LogoutForm onClick={handleClickLogout} />
      ) : (
        <LoginForm
          fields={loginFields}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}
