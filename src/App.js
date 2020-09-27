import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { getMe } from './app/userSlice';
import Header from './components/Header';
import CircularProgress from '@material-ui/core/CircularProgress';
import './App.scss';

// LAZY MODULES
const Authen = React.lazy(() => import('./features/Authen'));
const Home = React.lazy(() => import('./features/Home'));

// CONFIG FIREBASE.
const config = {
  apiKey: 'AIzaSyDG5oRVMc3x3LNMJheur0L6YC9d37TATXU',
  authDomain: 'https://realchat-like-slack.firebaseapp.com',
};

// INITIALIZE APP FIREBASE
firebase.initializeApp(config);

function App() {
  const [ loading, setLoading ] = useState(true);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => {
    return state.user?.current;
  });


  useEffect(() => {
    setLoading(true);
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {

        const actionResult = await dispatch(getMe());
        // eslint-disable-next-line
        const current= unwrapResult(actionResult);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    });

    return () => unregisterAuthObserver();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="main">
      <Suspense fallback={<div>loading...</div>}>
        <BrowserRouter> 
          {!loading && <Header currentUser={currentUser} />}
          
          {loading && <div className="overlay">
            <CircularProgress disableShrink />
          </div>}

          <div className="block-site" style={{ display: loading ? 'none': '' }}>
            <Switch>
              <Redirect exact from="/" to={'/home'} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/login" render={()=> <Authen isAuthenticate={loading && JSON.stringify(currentUser) === "{}"} />} />
              <Route to="/not-found" component={()=> <h1>Not Found</h1>} />
            </Switch>
          </div>
        
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
