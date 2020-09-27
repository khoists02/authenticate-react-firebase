import React from 'react';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../app/userSlice';
import firebase from 'firebase';
import './Header.scss';


function Header({currentUser }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    firebase.auth().signOut()
    .then(()=> {
      const action = logout();
      dispatch(action);
      history && history.push('/login');
    })
    .catch(function (err) {
      console.log('err', err);
    });
  }

  return (
    <div className="header">
      <div className="block-site header">
        <div className="header__left"></div>
        <div className="header__right">
          <span>
            {currentUser?.email}
          </span>
          {JSON.stringify(currentUser) !== "{}" && <Button onClick={handleLogout}>Log out</Button>}
          {JSON.stringify(currentUser) === "{}" && <span><Link to="/login">Sign In</Link></span> }
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
}

export default Header;

