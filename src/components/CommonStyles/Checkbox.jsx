import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Checkbox as CheckBoxMUI } from '@mui/material';

const useStyles = makeStyles((theme) => {
  return {
    unchecked: {
      width: 24,
      height: 24,
      borderRadius: 6,
      border: `solid 3px ${theme.custom.colors.lightgreen}`,
    },
    checked: {
      width: 24,
      height: 24,
      borderRadius: 6,
      backgroundColor: theme.custom.colors.lightgreen,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& .checked_icon': { color: '#000', width: '16px', height: '16px' },
    },
  };
});

const Checkbox = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { field, remove, ...otherProps } = props;

  //! Function

  //! Render
  return (
    <CheckBoxMUI
      icon={<div className={classes.unchecked}></div>}
      checkedIcon={
        <div className={classes.checked}>
          {remove ? (
            <CommonIcons.Remove className="checked_icon" />
          ) : (
            <CommonIcons.CheckedWithoutCircle className="checked_icon" />
          )}
        </div>
      }
      checked={field?.value}
      {...field}
      {...otherProps}
    />
  );
};

export default Checkbox;
