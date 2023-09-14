import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { BiUser, BiNotepad, BiBell } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const InfoUser = () => {
  const profileInfos = [
    {
      title: 'Tài khoản của tôi',
      icon: <BiUser style={{ color: '#4267b2' }} />,
      path: '/user/profile',
    },
    {
      title: 'Đơn mua ',
      icon: <BiNotepad style={{ color: '#4267b2' }} />,
      path: '/user/orders',
    },
    {
      title: 'Thông báo',
      icon: <BiBell style={{ color: 'red' }} />,
      path: '/user/noti',
    },
  ];
  const { pathname } = useLocation();
  const activeNav = profileInfos.findIndex((e) => e.path === pathname);
  const navigate = useNavigate();
  return (
    <div className="profile__left__info">
      <div className="info-user">
        {profileInfos.map((info, index) => (
          <div onClick={() => navigate(info.path)} key={index} style={{ cursor: 'pointer' }}>
            <div className={`info-user__item ${index === activeNav ? 'active' : ''}`}>
              <i>{info.icon}</i>
              <span className="title"> {info.title} </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoUser;
