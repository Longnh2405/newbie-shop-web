import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import useToggleDialog from 'hooks/useToggleDialog';
import { Fragment } from 'react';
import { Box } from '@mui/system';

import Edit from 'assets/IconsSVG/UserList/Edit.svg';
import Delete from 'assets/IconsSVG/UserList/Delete.svg';
import { showError, showSuccess } from 'helpers/toast';
import DialogAddCatalog from '../Dialog/DialogAddCatalog';
import { useCallback } from 'react';
import { useUpdateCatalog } from 'hooks/catalog/useUpdateCatalog';

const useStyles = makeStyles((theme) => {
  return {
    edit: {
      backgroundImage: `url(${Edit})`,
      width: '20px',
      height: '20px',
    },
    delete: {
      backgroundImage: `url(${Delete})`,
      width: '20px',
      height: '20px',
    },
    loading: {
      width: '24px !important',
      height: '24px !important',
    },
  };
});

const CellActions = ({ item, refetch }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { open: openDelete, toggle: toggleDelete, shouldRender: shouldRenderDelete } = useToggleDialog();
  const { open: openDetail, toggle: toggleDetail, shouldRender: shouldRenderDetail } = useToggleDialog();

  const { mutateAsync: updateCatalog } = useUpdateCatalog();

  //! Function

  const onDelete = useCallback(async () => {
    try {
      await updateCatalog({ id: item.id, data: { is_active: 0 } });
      toggleDelete();
      refetch();
      showSuccess('Xóa phân loại thành công');
    } catch (error) {
      showError('Có lỗi xảy ra');
    }
  }, [item]);

  //! Render
  return (
    <Fragment>
      {shouldRenderDetail && <DialogAddCatalog item={item} open={openDetail} toggle={toggleDetail} refetch={refetch} />}

      {shouldRenderDelete && (
        <CommonStyles.Modal
          open={openDelete}
          toggle={toggleDelete}
          header={'Xóa phân loại sản phẩm'}
          content={'Bạn có chắc chắn muốn xóa'}
          footer={
            <Fragment>
              <CommonStyles.Button onClick={toggleDelete} variant="outlined">
                Hủy
              </CommonStyles.Button>
              <CommonStyles.Button onClick={onDelete} style={{ width: '92px' }}>
                Xóa
              </CommonStyles.Button>
            </Fragment>
          }
        />
      )}
      <div style={{ width: '150px' }}>
        <CommonStyles.Button onClick={toggleDetail} variant="text">
          <Box className={classes.edit}></Box>
        </CommonStyles.Button>
        <CommonStyles.Button onClick={toggleDelete} variant="text">
          <Box className={classes.delete}></Box>
        </CommonStyles.Button>
      </div>
    </Fragment>
  );
};

export default CellActions;
