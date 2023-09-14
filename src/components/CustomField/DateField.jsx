import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { get } from 'lodash';
import MessageError from './MessageError';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => {
  return {
    rootInput: {
      display: 'flex',
      flexDirection: 'column',

      '& > label': {
        marginBottom: 8,
        fontWeight: 600,
      },
    },
    labelHeaderColorPrimary: {
      color: `${theme.custom.colors.darkblue} !important`,
    },
  };
});

const DateField = (props) => {
  //! State
  const {
    field,
    form,
    label,
    afterOnChange,
    onAccept,
    LabelColorPrimary,
    disabled,
    maxDate,
    minDate,
    required,
    ...otherProps
  } = props;
  const { name, value, onBlur } = field || {};
  const { errors, touched } = form || {};

  const errorMsg = get(errors, name);
  const isTouched = get(touched, name);
  const isShowMsg = isTouched && !!errorMsg;

  const classes = useStyles();

  //! Function
  const handleChange = (date, keyboardInputValue) => {
    form?.setFieldValue(name, date);
    if (afterOnChange) {
      afterOnChange(date, keyboardInputValue);
    }
  };

  //! Render
  return (
    <div className={classes.rootInput}>
      {!!label && (
        <label className={LabelColorPrimary ? classes.labelHeaderColorPrimary : ''} htmlFor={name}>
          {label}
          {required && <span style={{ color: 'red' }}>*</span>}
        </label>
      )}
      <CommonStyles.DatePickerField
        disabled={disabled ? true : false}
        name={name}
        // label={label}
        value={value}
        onChange={handleChange}
        onAccept={onAccept}
        onBlur={onBlur}
        helperText={isShowMsg && <MessageError isShow={isShowMsg}>{errorMsg}</MessageError>}
        maxDate={maxDate}
        minDate={minDate}
        {...otherProps}
      />
    </div>
  );
};

export default DateField;
