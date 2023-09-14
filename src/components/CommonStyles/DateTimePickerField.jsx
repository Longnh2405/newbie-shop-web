import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import CommonStyles from '.';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { makeStyles } from '@mui/styles';
import { vi } from 'date-fns/locale';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const useStyles = makeStyles((theme) => {
  return {
    desktopView: {
      textTransform: 'capitalize',
    },
  };
});

const DateTimePickerField = (props) => {
  const { name, onBlur, helperText, ...restProps } = props;
  const classes = useStyles();

  const formats = {
    monthAndYear: 'MM/yyyy',
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={vi} dateFormats={formats}>
      <DateTimePicker
        ampm={false}
        views={['year', 'month', 'day', 'hours', 'minutes']}
        dayOfWeekFormatter={(data) => {
          '';
        }}
        PopperProps={{
          className: classes.desktopView,
        }}
        renderInput={(props) => {
          props.inputProps.placeholder = 'MM/DD/YYYY HH:MM';
          return (
            <CommonStyles.TextField
              {...props}
              name={name}
              onBlur={onBlur}
              helperText={helperText}
              error={!!helperText}
            />
          );
        }}
        {...restProps}
      />
    </LocalizationProvider>
  );
};

export default DateTimePickerField;
