import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import HttpService from 'services/httpServices';
import { showError, showInfo, showSuccess } from 'helpers/toast';
import { SIGNIN_URL } from 'constants/api';

const AuthenticationContext = createContext({
  token: '',
  isLogged: false,
  isLoggingOut: false,
  login: () => {},
  logout: () => {},
  userInfo: '',
});

export const useAuthentication = () => useContext(AuthenticationContext);

const AuthProvider = ({ children }) => {
  //! State

  const tokenLocalStorage = HttpService.getTokenStorage();
  const userInfoStorage = HttpService.getUserInfoStorage();
  const [isLogged, setIsLogged] = useState(tokenLocalStorage ? true : false);
  const [token, setToken] = useState(tokenLocalStorage);
  const [isLoggingOut, setLoggingOut] = useState(false);
  const [userInfo, setUserInfo] = useState(userInfoStorage || '');

  useEffect(() => {
    if (tokenLocalStorage) {
      //* Check if localstorage has token -> login with Token
      setIsLogged(true);
      HttpService.attachTokenToHeader(token);
    }
  }, []);

  //! Function

  const login = useCallback(async ({ phone, password, remember, onLoading }) => {
    //   //* Get access token
    try {
      const res = await HttpService.post(SIGNIN_URL, { phone, password });
      const { message } = res?.data;
      if (message !== 'Thành công') {
        showError(message);
      }
      const user = res?.data?.data;
      const { token } = user;
      HttpService.attachTokenToHeader(token);
      HttpService.saveTokenStorage(token);
      HttpService.saveUserInfoStorage(user);
      setUserInfo(user);
      setIsLogged(true);
      setToken(token);
      !!user ? showInfo('Xin chào 👋 ' + user.name) : showError('Có lỗi xảy ra');
    } catch (error) {
      console.log('error: ', error);
    }
  }, []);

  const logout = useCallback(() => {
    return new Promise(async (resolve, reject) => {
      try {
        setLoggingOut(true);
        HttpService.clearTokenStorage();
        HttpService.clearUserInfoStorage();
        window.location.reload();
        resolve();
      } catch (error) {
        showError(error.toString());
        setLoggingOut(false);
        reject(error);
      }
    });
  }, []);

  //! Render
  const value = useMemo(() => {
    return {
      isLogged,
      isLoggingOut,
      login,
      logout,
      token,
      userInfo,
    };
  }, [isLogged, login, logout, isLoggingOut, token, userInfo]);

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
};

export default AuthProvider;
