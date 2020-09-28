import React from 'react';
import { useAuthDataContext } from './auth-provider';
import { Route } from 'react-router-dom';
import Authen from './features/Authen';

const PrivateRoute = ({ component, ...options }) => {
  const { user } = useAuthDataContext();
  const finalComponent = user ? component : <Authen />;

  return <Route {...options} component={finalComponent} />;
};

export default PrivateRoute;