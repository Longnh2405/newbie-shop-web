import React from 'react';
import { TextField as TextFieldMui } from '@mui/material';
import { styled } from '@mui/material';

const CustomTextField = styled(TextFieldMui)(({ theme }) => {
  return {
    '& label.Mui-focused': {},
    '& .MuiInput-underline:after': {},
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.custom.borderRadius.input_12,
      backgroundColor: theme.custom.colors.white,
      '& > input': {
        padding: theme.custom.padding.paddingInput,
      },
      '& fieldset': {},
      '&:hover fieldset': {},
      '&.Mui-focused fieldset': {},
    },
  };
});

const TextField = (props) => {
  return (
    <CustomTextField
      autoComplete="off"
      InputProps={{
        autoComplete: 'off',
      }}
      {...props}
    />
  );
};

export default React.memo(TextField);
