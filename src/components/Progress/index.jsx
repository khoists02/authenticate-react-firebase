import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Progress.scss';

function Progress() {
  return (
    <div className="overlay">
      <CircularProgress disableShrink />
    </div>
  )
}

Progress.propTypes = {};

export default Progress;

