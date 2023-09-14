import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import CommonStyles from 'components/CommonStyles';
import { useState } from 'react';
import { useCallback } from 'react';

const useStyles = makeStyles((theme) => {
  return {
    rootRadio: {
      display: 'flex',
      flexDirection: 'row !important',
      alignItems: 'center',
      gap: 30,

      '& > label': {
        fontWeight: 600,
      },
      '& .MuiButtonBase-root.Mui-checked ': {
        color: theme.custom.colors.lightgreen,
      },
    },
    positionLabelUp: {
      display: 'block !important',
    },
    formMargin: {
      marginTop: '10px',
    },
    buttonGroup: {
      color: theme.custom.colors.darkgray,
    },
    labelHeaderColorPrimary: {
      color: `${theme.custom.colors.darkblue} !important`,
    },
  };
});

const CheckboxField = (props) => {
  //! State
  const classes = useStyles();
  const { field, form, afterOnChange, label, positionLabel, LabelColorPrimary, ...restProps } = props;

  const { onChange, value, name, onBlur } = field;

  //! Function
  const handleCheck = React.useCallback(() => {
    setCheck((prevCheck) => !prevCheck);
  }, []);

  //! Render
  return (
    <FormControl className={classNames(classes.rootRadio, { [classes.positionLabelUp]: positionLabel === 'up' })}>
      {!!label && (
        <label className={LabelColorPrimary ? classes.labelHeaderColorPrimary : ''} htmlFor={name}>
          {label}
        </label>
      )}
      <CommonStyles.Checkbox checked={value} onChange={onChange} {...restProps} name={name} onBlur={onBlur} />
    </FormControl>
  );
};

export default CheckboxField;
