import React, { useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { useEditUser } from 'hooks/users/useEditUser';
import { showError, showSuccess } from 'helpers/toast';
import { updateUser } from 'helpers/profile';

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
    datepicker: {
      flex: 3,
      '& fieldset': {
        border: '0 !important',
      },
    },
  };
});

const ProfileDob = ({ field, form }) => {
  //! State
  const classes = useStyles();
  const [edit, setEdit] = useState(false);
  const { t } = useTranslation();
  const { name, value } = field;
  const { setFieldValue, errors, initialValues, resetForm } = form;
  const initValue = useRef(initialValues?.dob);

  const { isLoading: editingUser, mutateAsync: editUser } = useEditUser();

  //! Function
  const handleClickDatePicker = async () => {
    if (errors?.dob) {
      showError(errors?.dob);
      return;
    }
    !edit && setEdit(true);
    if (edit) {
      const isSame = moment(value).format('DD/MM/YYYY') === moment(initValue?.current).format('DD/MM/YYYY');
      if (!isSame && !errors?.dob) {
        const updateUserSuccess = await updateUser({
          name: 'dob',
          value,
          editUser,
          initialValues,
          resetForm,
        });
        if (updateUserSuccess) {
          showSuccess(t('common:profile_update_success'));
          setEdit(false);
        } else {
          showError(t('common:profile_update_fail'));
        }
      }
    }
  };

  const handleDateChange = (date) => {
    setFieldValue(name, date?.$d);
  };

  //! Render
  return (
    <div className={classes.container}>
      <div className={classes.label}>{t('common:profile_dob')}</div>
      <div className={classes.datepicker}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={value}
            renderInput={(params) => <TextField {...params} fullWidth className="input" />}
            components={{
              OpenPickerIcon: () => <div></div>,
            }}
            onOpen={() => setEdit(true)}
            onClose={() => setEdit(false)}
            disabled={!edit}
            onChange={handleDateChange}
            open={edit}
          />
        </LocalizationProvider>
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <CommonStyles.Button variant="text" onClick={handleClickDatePicker} loading={editingUser}>
          {edit ? t('common:profile_save') : t('common:profile_edit')}
        </CommonStyles.Button>
      </div>
    </div>
  );
};

export default ProfileDob;
