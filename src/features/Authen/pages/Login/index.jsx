import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm';
import firebase from 'firebase';
import { useHistory, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Login.scss';

function LoginPage({isAuthenticate}) {
  const [ message, setMessage ] = useState('');
  const history = useHistory();

  const handleSubmit = (values) => {
    const { username, password } = values;
    firebase.auth().signInWithEmailAndPassword(username, password)
    .then(()=> {
      history.push('/home');
    })
    .catch(function(err) {
      setMessage(err.message);
    });
  };

  const initialValues = {
    username: '',
    password: '',
  };

  return (
    // https://howtofirebase.com/firebase-authentication-for-web-d58aad62cf6d
    !isAuthenticate  ? (
      <div className='login'>
        <LoginForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            error={message}
        />
      </div>
    ) : <Redirect to={{ pathname: '/home' }} />
  )
}

LoginPage.propTypes = {
  isAuthenticate: PropTypes.bool,
};

LoginPage.defaultProps = {
  isAuthenticate: false,
}

export default LoginPage;


