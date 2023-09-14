import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import InfoUser from './InfoUser';
import Profile from './Profile';
import { Outlet } from 'react-router-dom';

const ProfileUser = (props) => {
  //! Render
  return (
    <div className="profile container">
      <div className="profile__left">
        <InfoUser />
      </div>
      {/* <Profile /> */}
      <Outlet />
    </div>
  );
};

export default ProfileUser;
