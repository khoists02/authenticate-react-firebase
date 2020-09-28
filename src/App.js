import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Progress from './components/Progress';
import './App.scss';
import AuthDataProvider from './auth-provider';
import PrivateRoute from './PrivateRoute';
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
  const currentUser = useSelector(state => {
    return state.user?.current;
  });

  // console.log({currentUser});
  // const { loading } = useAuthDataContext();
  // console.log('loading', loading);

  return (
    <div className="main">
      <Suspense fallback={<Progress />}>
        <BrowserRouter> 
          <AuthDataProvider>
            <Header currentUser={currentUser} />
            {/* {JSON.stringify(currentUser) === "{}" && <Progress />} */}
            <div className="block-site">
              <Switch>
                <Redirect exact from="/" to={'/home'} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/login" render={()=> <Authen isAuthenticate={JSON.stringify(currentUser) !== "{}"} />} />
                <Route to="/not-found" component={()=> <h1>Not Found</h1>} />
              </Switch>
            </div>
          </AuthDataProvider>
          
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
