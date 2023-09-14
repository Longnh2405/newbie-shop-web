import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';

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

const RadioField = (props) => {
  //! State
  const classes = useStyles();
  const { field, options = [], label, row = true, positionLabel, name, LabelColorPrimary, ...restProps } = props;

  //! Render
  return (
    <FormControl className={classNames(classes.rootRadio, { [classes.positionLabelUp]: positionLabel === 'up' })}>
      {!!label && (
        <label className={LabelColorPrimary ? classes.labelHeaderColorPrimary : ''} htmlFor={name}>
          {label}
        </label>
      )}
      <RadioGroup row={row} {...(field || {})} {...restProps}>
        {(options || []).map((option) => {
          return (
            <FormControlLabel
              className={classNames(classes.buttonGroup, { [classes.formMargin]: positionLabel === 'up' })}
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioField;
