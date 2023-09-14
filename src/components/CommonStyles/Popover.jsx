import { Popover } from '@mui/material';
import React from 'react';

const PopoverMui = ({ children, open, anchorEl, handleClose, anchorOrigin, transformOrigin, ...otherProps }) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={
        anchorOrigin || {
          vertical: 'bottom',
          horizontal: 'right',
        }
      }
      transformOrigin={
        transformOrigin || {
          vertical: 'top',
          horizontal: 'right',
        }
      }
      {...otherProps}
    >
      {children}
    </Popover>
  );
};

export default PopoverMui;
