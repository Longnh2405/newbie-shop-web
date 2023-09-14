import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';

const useStyles = makeStyles((theme) => {
  return {};
});

const Noti = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  //! Function

  //! Render
  return (
    <div style={{ flex: 1, height: '500px', fontSize: '1.2rem', paddingTop: '30px' }}>
      Chức năng thông báo đang phát triển
    </div>
  );
};

export default Noti;
