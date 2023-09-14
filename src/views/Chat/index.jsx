import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';

const useStyles = makeStyles((theme) => {
  return {};
});

const Chat = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  //! Function

  //! Render
  return <div style={{ fontSize: '30px' }}>Tính năng chat này Long NH đang phát triển</div>;
};

export default Chat;
