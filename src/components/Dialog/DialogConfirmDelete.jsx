import React from 'react';
import { makeStyles } from '@mui/styles';
import CommonStyles from 'components/CommonStyles';

const DialogConfirmDelete = ({ open, toggle, onSubmit, header, content, textSubmit }) => {
  //! State

  //! Function

  //!Render
  return (
    <CommonStyles.Modal
      open={open}
      toggle={toggle}
      header={header}
      content={<div>{content}</div>}
      footer={
        <React.Fragment>
          <CommonStyles.Button variant="outlined" onClick={toggle}>
            Huỷ
          </CommonStyles.Button>
          <CommonStyles.Button onClick={onSubmit}>{textSubmit}</CommonStyles.Button>
        </React.Fragment>
      }
    />
  );
};

export default DialogConfirmDelete;
