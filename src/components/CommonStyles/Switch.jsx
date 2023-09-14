import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import { FormControlLabel, Switch } from '@mui/material';

const useStyles = makeStyles((theme) => {
  return {};
});

const Switched = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { defaultChecked, ...otherProps } = props;
  //! Function

  //! Render
  return <FormControlLabel control={<Switch defaultChecked={defaultChecked} />} />;
};

export default Switched;
