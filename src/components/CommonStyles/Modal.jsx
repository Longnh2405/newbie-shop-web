import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PropTypes from 'prop-types';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: theme.custom.borderRadius.modal_12,
  },
  '& .MuiDialog-paper': {
    maxWidth: '80%',
    maxHeight: '85%',
    minHeight: '15%',
  },
  '& .MuiDialogContent-root': {
    // padding: theme.spacing(2),
    // width: '500px',
  },
  '& .MuiDialogActions-root': {
    // padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  //! State
  const { children, onClose, ...other } = props;

  //! Function

  //! Render
  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
        fontWeight: 'bold',
      }}
      {...other}
    >
      {children}
    </DialogTitle>
  );
};

const propTypes = {
  id: PropTypes.string,
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  header: PropTypes.any,
  content: PropTypes.any,
  footer: PropTypes.any,
  disableClickOutside: PropTypes.bool,
};

function Modal({ id, open, toggle, header, content, footer, disableClickOutside, ...props }) {
  //! Render
  return (
    <BootstrapDialog onClose={!disableClickOutside && toggle} aria-labelledby={id} open={open} {...props}>
      <BootstrapDialogTitle onClose={toggle}>{header}</BootstrapDialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>{footer}</DialogActions>
    </BootstrapDialog>
  );
}

Modal.propTypes = propTypes;
export default Modal;
