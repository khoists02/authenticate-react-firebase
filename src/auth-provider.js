import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { getMe } from './app/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';

export const AuthDataContext = createContext(null);

const initialAuthData = {};

const AuthDataProvider = props => {
  const [ authData, setAuthData ] = useState(initialAuthData);
  // const [ loading, setLoading ] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log('provider work');
    // setLoading(true);
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        // setLoading(false);
        return;
      }

      try {

        const actionResult = await dispatch(getMe());
        const current= unwrapResult(actionResult);
        setAuthData(current);
        // setLoading(false);
      } catch (error) {
        // setLoading(false);
      }
    });

    return () => unregisterAuthObserver();
  }, []);

  const onLogout = () => setAuthData(initialAuthData);

  const onLogin = newAuthData => setAuthData(newAuthData);

  const authDataValue = useMemo(()=> {
    return {...authData , onLogout, onLogin};
  }, [authData]);

  return <AuthDataContext.Provider value={authDataValue} {...props} />;
}

export const useAuthDataContext = () => useContext(AuthDataContext);

export default AuthDataProvider;