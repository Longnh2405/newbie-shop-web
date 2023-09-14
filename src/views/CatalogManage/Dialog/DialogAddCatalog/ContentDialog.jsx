import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Field, Form, Formik } from 'formik';
import { Box } from '@mui/material';
import CustomField from 'components/CustomField';
import { useQueryClient } from 'react-query';
import { isEmpty } from 'lodash';
import * as Yup from 'yup';
import { useAddCatalog } from 'hooks/catalog/useAddCatalog';
import { showError, showSuccess } from 'helpers/toast';
import { useUpdateCatalog } from 'hooks/catalog/useUpdateCatalog';

const useStyles = makeStyles((theme) => {
  return {
    headerPopupAddUser: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 36,
      position: 'sticky',
      top: 0,
      zIndex: 10,
      backgroundColor: theme.custom.colors.white,
      '& .label-add-user': {
        fontSize: 16,
        fontWeight: 700,
        textTransform: 'uppercase',
        lineHeight: '24px',
        paddingBottom: '15px',
        borderBottom: '2px solid #ddd',
        color: '#112957',
      },
      '& .icon-close-header-add-user': {
        height: '0%',
        padding: '15px',
        backgroundColor: '#F1F2F4',
        borderRadius: '12px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        '&:active': {
          borderRadius: '12px',
          backgroundColor: '#ccc',
        },
      },
    },
    footerPopupAddUser: {
      marginTop: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '20px',
    },
  };
});

const ContentDialog = ({ toggle, item, refetch }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const isEdit = !isEmpty(item);

  const initialValues = {
    name: item?.name || '',
    image_id: null,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Tên là trường bắt buộc'),
  });

  const { mutateAsync: addCatalog } = useAddCatalog();
  const { mutateAsync: editCatalog } = useUpdateCatalog();

  //! Function

  const handleSubmit = async (value) => {
    try {
      if (isEdit) {
        await editCatalog({ id: item.id, data: value });
        showSuccess('Cập nhât phân loại sản phẩm thành công');
      } else {
        await addCatalog(value);
        showSuccess('Thêm phân loại sản phẩm thành công');
      }
      refetch();
      toggle();
    } catch (error) {
      console.log('error: ', error);
      showError('Thêm phân loại sản phẩm thất bại');
    }
  };

  //! Render
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form style={{ minWidth: '30vw' }}>
        <div className={classes.headerPopupAddUser}>
          <div className="label-add-user">{isEdit ? 'Chỉnh sửa thông tin phân loại' : 'Thêm mới phân loại'}</div>
          <div className="icon-close-header-add-user" onClick={toggle}>
            <CommonIcons.Close sx={{ width: 20, height: 20 }} />
          </div>
        </div>

        <Field component={CustomField.InputField} name="name" label="Tên phân loại" />
        <div>
          <Box sx={{ width: 'calc(50% - 20px)' }}></Box>
        </div>

        <div className={classes.footerPopupAddUser}>
          <CommonStyles.Button type="submit" style={{ width: 160 }}>
            {t('common:save')}
          </CommonStyles.Button>
        </div>
      </Form>
    </Formik>
  );
};

export default ContentDialog;
