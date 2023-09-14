import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => {
  return {
    contentContainer: {
      padding: 24,
      background: '#fff',
      borderRadius: 8,
      marginBottom: '60px',
    },
  };
});

const Content = ({ children, className }) => {
  //! State
  const classes = useStyles();

  //! Function

  //! Render
  return <div className={classNames(classes.contentContainer, className)}>{children}</div>;
};

export default Content;
