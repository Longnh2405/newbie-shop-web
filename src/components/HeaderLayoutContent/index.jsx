import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import CommonStyles from 'components/CommonStyles';
import { Badge, Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import LogoutConfirm from './LogoutConfirm';
import { useNavigate } from 'react-router-dom';
import { RouteBase } from 'constants/routeUrl';
import { BASE_IMAGE } from 'constants/api';
// import { useGetCountNoti } from 'hooks/notifications/useGetCountNoti';
// import Notification from './Notification';
// import io from 'socket.io-client';
import httpServices from 'services/httpServices';
// import { useGetListAuthProject } from 'hooks/project/useGetListAuthProject';
import { useAuthentication } from 'providers/AuthenticationProvider';

const useStyles = makeStyles((theme) => {
  return {
    footer: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '40px',
    },
    headerNameUser: {
      fontWeight: 600,
      color: '#434D56',
    },
    left: {
      '& .name-folder': {
        fontWeight: 600,
        fontSize: '22px',
        lineHeight: '32px',
        color: '#034B5E',
      },
      '& .title-folder': {
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '21px',
        color: '#919499',
      },
    },
    right: {
      color: theme.custom.colors.black,
      '& .user-info': {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',

        fontWeight: 'bold',
        '& .img': {
          width: 36,
          height: 36,
          borderRadius: '50%',
          objectFit: 'cover',
        },
      },
      '& .btn-icon': {
        padding: 0,
        fontSize: 20,
        backgroundColor: theme.custom.colors.gray,
        color: theme.custom.colors.black,
        marginRight: '6px',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: '#d9d9d9 ',
          boxShadow: 'none',
        },
      },
      '& .btn-active': {
        backgroundColor: '#d9d9d9 ',
      },
    },
  };
});

const HeaderLayoutContent = (props) => {
  //! State
  const { header, title, sx, sxHeader, headerNameUser } = props;
  const navigate = useNavigate();
  const classes = useStyles();
  const [contentPopper, setContentPopper] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openPopper = Boolean(anchorEl);
  const imgUser = 'https://i.stack.imgur.com/l60Hf.png';
  // const { data: dataCountNoti, refetch } = useGetCountNoti();
  // const countNotiUnRead = dataCountNoti?.data?.data?.totalUnRead;
  // const { data: listAuthProject, isLoading: isLoadingGetAuthProject } = useGetListAuthProject();
  // const projectsAuth = listAuthProject?.data?.data || [];
  // const projectKey = httpServices.getUserInfoStorage();
  // const roleKey = projectKey?.userRoleDetail?.key || '';
  // const checkedProfile =
  //   projectsAuth.length === 0 || projectsAuth.length === 1 || roleKey === 'MASTER_ADMIN' || roleKey === 'ADMIN';

  const { token } = useAuthentication();

  //! Function
  const handleOpenPopper = (event, value) => {
    setContentPopper(value);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setContentPopper();
    setAnchorEl(null);
  };

  const btnHeader = [
    {
      name: 'noti',
      children: (
        <Badge
          // badgeContent={countNotiUnRead}
          badgeContent={0}
          color="primary"
        >
          <CommonIcons.Bell />
        </Badge>
      ),
      onClick: (e) => {
        handleOpenPopper(e, 'noti');
      },
    },
  ];

  const renderContentPopper = () => {
    switch (contentPopper) {
      case 'noti':
        // return <Notification />;
        return <div style={{ padding: '20px' }}>Không có thông báo (Tính năng đang phát triển)</div>;
      case 'user':
        return (
          <Box
            sx={{
              width: 200,
            }}
          >
            <List>
              {/* <ListItem disablePadding>
                <ListItemButton
                // onClick={() => navigate(RouteBase.Profile)}
                >
                  <ListItemIcon>
                    <CommonIcons.User />
                  </ListItemIcon>
                  <ListItemText primary="Trang cá nhân" />
                </ListItemButton>
              </ListItem> */}

              <ListItem disablePadding>
                <LogoutConfirm />
              </ListItem>
            </List>
          </Box>
        );
    }
  };

  // useEffect(() => {
  //   const socket = io.connect(process.env.REACT_APP_SOCKET_URL, { query: `access_token=${token}` });
  //   socket.on('NEW_NOTIFICATION', (data) => {
  //     refetch();
  //   });
  //   return () => {
  //     socket.off('NEW_NOTIFICATION');
  //   };
  // }, []);

  //! Render
  return (
    <div className={classes.footer} style={sx}>
      <div className={classes.left}>
        <div className="name-folder" style={sxHeader}>
          {header}
          <span className={classes.headerNameUser}>{headerNameUser}</span>
        </div>
        <div className="title-folder">{title}</div>
      </div>
      <div className={classes.right}>
        {btnHeader.map((item) => (
          <CommonStyles.Button
            className={`btn-icon ${contentPopper === item.name ? 'btn-active' : ''}`}
            key={item.name}
            onClick={item.onClick}
          >
            {item.children}
          </CommonStyles.Button>
        ))}
        <CommonStyles.Button
          variant="outline"
          className={` ${contentPopper === 'user' ? 'btn-active' : ''}`}
          onClick={(e) => {
            handleOpenPopper(e, 'user');
          }}
        >
          <div className="user-info">
            <img className="img" src={imgUser} alt="" />
          </div>
        </CommonStyles.Button>
      </div>
      <CommonStyles.PopoverMui open={openPopper} anchorEl={anchorEl} handleClose={handleClose}>
        {renderContentPopper()}
      </CommonStyles.PopoverMui>
    </div>
  );
};

export default HeaderLayoutContent;
