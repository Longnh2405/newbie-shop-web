import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { FormControl, MenuItem, Select } from '@mui/material';
import CommonIcons from 'components/CommonIcons';

const useStyles = makeStyles((theme) => {
  return {
    rootSelect: {
      '& .MuiSelect-select': {
        fontSize: '14px !important',
        padding: theme.custom.padding.paddingInput,
      },
      '& .MuiInputBase-root': {
        borderRadius: 8,
        // paddingRight: '10px',
      },
    },
  };
});

const SelectInput = ({ options, disabled, onChange, value }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();

  //! Function

  //! Render
  return (
    <FormControl fullWidth className={classes.rootSelect}>
      {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
      <Select IconComponent={CommonIcons.Dropdown} disabled={disabled} value={value} onChange={onChange}>
        {(options || []).map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
