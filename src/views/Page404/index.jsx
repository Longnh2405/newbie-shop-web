import { makeStyles } from '@mui/styles';
import CommonStyles from 'components/CommonStyles';
import { RouteBase } from 'constants/routeUrl';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import httpServices from 'services/httpServices';

const useStyles = makeStyles((theme) => {
  return {
    container: {
      height: '100vh',
      overflow: 'hidden',
      background: 'url(https://i.pinimg.com/originals/c8/ec/cf/c8eccf05f95f95a0283ee2fef07298dd.gif)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '&:before': {
        content: '""',
        position: 'absolute',
        height: '50%',
        width: '100%',
        background: '#0c0c0d',
        bottom: '0',
        left: '0',
      },
    },
    btn: {
      position: 'absolute',
    },
    notification: {
      zIndex: 10,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: '30px',
    },
    page404: {
      fontSize: '5rem',
      color: '#fff',
      fontWeight: 'bold',
      zIndex: 10,
    },
    notificationTitle: {
      fontSize: '2.5rem',
      color: '#5f5f5f',
      fontWeight: 'bold',
      zIndex: 10,
    },
  };
});

const Page404 = (props) => {
  const classes = useStyles();
  const [countDown, setCountDown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (countDown === 0) {
      const user = httpServices.getUserInfoStorage();
      // navigateHandler(navigate, user?.userRoleDetail?.key);
      navigate(RouteBase.ProductManage);
    }
    const interval = setInterval(() => {
      setCountDown((countDown) => countDown - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [countDown]);

  return (
    <div className={classes.container}>
      <div className={classes.notification}>
        <div className={classes.page404}>Error 404 !</div>
        <div className={classes.notificationTitle}>
          Get lost ? Dont worry you will be redirected in <span style={{ color: '#fff' }}>{countDown}</span> !
        </div>
      </div>
    </div>
  );
};

export default Page404;
