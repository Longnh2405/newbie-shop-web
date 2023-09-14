import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CustomField from 'components/CustomField';
import { useEditUser } from 'hooks/users/useEditUser';
import { updateUser } from 'helpers/profile';
import { showError, showSuccess } from 'helpers/toast';

const useStyles = makeStyles((theme) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'row',
      margin: '20px 0px',
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
    },
    options: {
      flex: 3,
      display: 'flex',
      height: '56px',
      alignItems: 'center',
      '& fieldset': {
        border: '0 !important',
      },
    },
  };
});

const options = [
  {
    value: '0',
    label: 'Nam',
  },
  {
    value: '1',
    label: 'Nữ',
  },
];

const ProfileGender = ({ field, form }) => {
  //! State
  const classes = useStyles();
  const [edit, setEdit] = useState(false);
  const { value } = field;
  const { initialValues, resetForm } = form;
  const { t } = useTranslation();
  const { isLoading: editingUser, mutateAsync: editUser } = useEditUser();

  //! Function
  const handleOpen = () => {
    setEdit(true);
  };

  const handleClose = () => {
    setEdit(false);
  };

  const handleChange = async (e) => {
    const updateUserSuccess = await updateUser({
      name: 'gender',
      value: e.target.value,
      editUser,
      initialValues,
      resetForm,
    });
    updateUserSuccess ? showSuccess(t('common:profile_update_success')) : showError(t('common:profile_update_fail'));
  };

  //! Render
  return (
    <div className={classes.container}>
      <div className={classes.label}>{t('common:profile_gender')} </div>
      <div className={classes.options}>
        <CustomField.SelectField
          options={options}
          value={value}
          field={field}
          form={form}
          IconComponent={() => <div></div>}
          open={edit}
          onOpen={handleOpen}
          onClose={handleClose}
          disabled={!edit}
          sx={{ height: '32px' }}
          onChange={handleChange}
        />
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <CommonStyles.Button variant="text" onClick={handleOpen} loading={editingUser}>
          {edit ? t('common:profile_save') : t('common:profile_edit')}
        </CommonStyles.Button>
      </div>
    </div>
  );
};

export default ProfileGender;
