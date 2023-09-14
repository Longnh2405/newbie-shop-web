import React, { useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CustomField from 'components/CustomField';
// import { useEditUser } from 'hooks/users/useEditUser';
import { showError, showSuccess } from 'helpers/toast';
import classNames from 'classnames';
// import { updateUser } from 'helpers/profile';

const useStyles = makeStyles((theme) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'row',
      margin: '20px 0px',
      '& .inputActive': {
        '& fieldset': {
          border: '1px solid #000',
        },
      },
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
    },
    input: {
      flex: 3,
      '& input': {
        color: theme.custom.colors.darkblue,
        fontSize: '16px',
        lineHeight: '24px',
        fontWeight: '600',
      },
      '& fieldset': {
        border: '0',
      },
    },
    noEdit: {
      '& input': {
        '-webkit-text-fill-color': 'unset !important',
      },
    },
  };
});

const noEdit = ['fullname', 'dob', 'gender', 'email', 'userRole', 'userTitle'];

const ProfileField = ({ field, form }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);
  const { name, value } = field;
  const initValue = useRef(value);
  const { initialValues, errors, resetForm } = form;
  // const { isLoading: editingUser, mutateAsync: editUser } = useEditUser();

  const labels = {
    fullname: t('common:profile_fullname'),
    dob: t('common:profile_dob'),
    gender: t('common:profile_gender'),
    phoneNumber: t('common:profile_phoneNumber'),
    email: 'Email',
    userTitle: t('common:profile_userTitle'),
    userRole: t('common:profile_userRole'),
  };

  //! Function
  const handleClick = async () => {
    setEdit(!edit);
    if (errors[name]) return;
    if (edit && initValue?.current !== value) {
      // const updateUserSuccess = await updateUser({
      //   name,
      //   value,
      //   editUser,
      //   initialValues,
      //   resetForm,
      // });
      // if (updateUserSuccess) {
      //   showSuccess(t('common:profile_update_success'));
      //   setEdit(false);
      // } else {
      //   showError(t('common:profile_update_fail'));
      // }
    }
  };

  const handleCancel = () => {
    setEdit(!edit);
    resetForm(initialValues);
  };

  //! Render
  return (
    <div className={classes.container}>
      <div className={classes.label}>{labels[name]}</div>
      <div className={classNames(classes.input, { inputActive: edit })}>
        {!noEdit.includes(name) ? (
          <CustomField.InputField field={{ ...field }} form={{ ...form }} disabled={!edit} />
        ) : (
          <div className={classes.noEdit}>
            <CustomField.InputField field={{ ...field }} form={{ ...form }} disabled />
          </div>
        )}
      </div>
      {!noEdit.includes(name) ? (
        <div style={{ display: 'flex', justifyContent: 'center', flex: 1, textAlign: 'center' }}>
          <CommonStyles.Button variant="text" onClick={handleClick} loading={editingUser}>
            {edit ? t('common:profile_save') : t('common:profile_edit')}
          </CommonStyles.Button>
          {edit && (
            <CommonStyles.Button variant="text" onClick={handleCancel}>
              {t('common:cancel')}
            </CommonStyles.Button>
          )}
        </div>
      ) : (
        <div style={{ flex: 1 }}></div>
      )}
    </div>
  );
};

export default ProfileField;
