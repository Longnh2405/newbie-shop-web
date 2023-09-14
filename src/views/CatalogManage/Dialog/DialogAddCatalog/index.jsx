import React from 'react';
import useToggleDialog from 'hooks/useToggleDialog';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import ContentDialog from './ContentDialog';

const DialogAddCatalog = ({ open, toggle, refetch, item }) => {
  //! State

  //! Function

  //!Render
  return (
    <CommonStyles.Modal
      open={open}
      toggle={toggle}
      content={<ContentDialog toggle={toggle} refetch={refetch} item={item} />}
    />
  );
};

export default DialogAddCatalog;
