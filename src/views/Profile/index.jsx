import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import { Field, Form, Formik } from 'formik';
import { isObject } from 'lodash';
import ProfileField from './ProfileField';
import Avatar from './Avatar';
import httpServices from 'services/httpServices';
// import { checkDobFormat, checkHeadNumber } from 'helpers/validation';
import * as Yup from 'yup';
import CustomField from 'components/CustomField';
// import { useChangePassword } from 'hooks/auth/useChangePassword';
import { showError, showSuccess } from 'helpers/toast';
import moment from 'moment/moment';

const useStyles = makeStyles((theme) => {
  return {
    container: {
      display: 'flex',
      gap: '83px',
    },
    userAction: {
      flex: 1 / 3,
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',

      '& .userTitle': {
        color: '#92A4B3',
        marginTop: '10px',
        fontSize: '16px',
        lineHeight: '24px',
        fontWeight: '400',
      },
      '& .btnGroup': {
        display: 'flex',
        gap: '12px',
        flexDirection: 'column',
        marginTop: '38px',
      },
    },
    information: {
      flex: 2 / 3,
    },
    changePassWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      marginTop: '26px',
      paddingRight: '26px',
      '& .field': {
        display: 'flex',
        alignItems: 'center',
        '& .left': {
          flex: 2,
          color: theme.custom.colors.blue,
          fontWeight: 500,
        },
        '& .right': {
          flex: 3,
        },
      },
      '& .btnSubmit': {
        display: 'flex',
        justifyContent: 'flex-end',
      },
    },
  };
});

const gender = {
  0: 'Nam',
  1: 'Nữ',
};

const Profile = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const [isUpdate, setIsUpdate] = useState(true);

  const user = httpServices.getUserInfoStorage();
  // const { isLoading: loadingChangePass, mutateAsync: changePassword } = useChangePassword();

  const initialValues = {
    fullname: user?.fullname || '',
    dob: moment(user?.dob).format('DD/MM/YYYY') || moment(new Date()).format('DD/MM/YYYY'),
    gender: gender[user?.gender] || 'Nam',
    phoneNumber: user?.phoneNumber || '',
    email: user?.email || '',
    userTitle: user?.userTitle || '',
    userRole: user?.userRoleDetail?.key || '',
    _id: user?.id || '',
  };

  const validationUpdate = Yup.object().shape({
    fullname: Yup.string()
      .required(t('common:is_required_field', { key: t('common:profile_fullname') }))
      .max(20, t('common:userlist_fullNameLength')),
    dob: Yup.string().required(t('common:is_required_field', { key: t('common:profile_dob') })),
    // .test('dobFormat', 'Ngày sinh không đúng định dạng', async (value) => checkDobFormat(value))
    gender: Yup.string().required(t('common:is_required_field', { key: t('common:profile_gender') })),
    phoneNumber: Yup.string()
      .required(t('common:is_required_field', { key: t('common:profile_phoneNumber') }))
      // .test('startNumber', `${t('common:userlist_phoneNumberStart')}`, async (val) => checkHeadNumber(val))
      .min(10, t('common:userlist_phoneNumberLength')),
  });

  const validationChangePassword = Yup.object().shape({
    currentPassword: Yup.string().required(t('common:is_required_field', { key: t('common:profile_enterOldPass') })),
    newPassword: Yup.string().required(t('common:is_required_field', { key: t('common:profile_enterNewPass') })),
    newPassAgain: Yup.string()
      .required(t('common:is_required_field', { key: t('common:profile_enterNewPassAgain') }))
      .oneOf([Yup.ref('newPassword'), null], t('common:profile_passwordsMustmatch')),
  });

  //! Function

  const handleSelectUpdate = (resetForm) => {
    setIsUpdate(true);
    resetForm({
      values: initialValues,
    });
  };
  const handleSelectChangePass = (resetForm) => {
    setIsUpdate(false);
    resetForm({
      values: {
        fullname: initialValues.fullname,
        userTitle: initialValues.userTitle,
        currentPassword: '',
        newPassword: '',
        newPassAgain: '',
      },
    });
  };

  const handleChangePassword = async (values, { resetForm }) => {
    const valueChangePass = {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    };
    try {
      // const res = await changePassword(valueChangePass);
      showSuccess(t('common:profile_changePassSuccess'));
      resetForm();
    } catch (error) {
      showError(error?.response.data.messages[0]);
    }
  };

  //! Render
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={isUpdate ? validationUpdate : validationChangePassword}
      onSubmit={handleChangePassword}
    >
      {({ initialValues, values, resetForm }) => {
        return (
          <CommonStyles.Content className={classes.container}>
            <div className={classes.userAction}>
              <Avatar item={user?.avatar} id={initialValues?._id} />

              <CommonStyles.Typography variant="h4" sx={{ color: '#0B518F' }}>
                {values.fullname}
              </CommonStyles.Typography>

              <div className="userTitle">{values?.userTitle}</div>

              <div className="btnGroup">
                <CommonStyles.Button
                  variant={isUpdate ? 'contained' : 'outlined'}
                  color="primary"
                  sx={{ width: '100%', height: '50px' }}
                  onClick={() => handleSelectUpdate(resetForm)}
                >
                  {t('common:profile_update')}
                </CommonStyles.Button>
                <CommonStyles.Button
                  variant={!isUpdate ? 'contained' : 'outlined'}
                  color="primary"
                  sx={{ width: '100%', height: '50px' }}
                  onClick={() => handleSelectChangePass(resetForm)}
                >
                  {t('common:profile_changePass')}
                </CommonStyles.Button>
              </div>
            </div>

            {isUpdate ? (
              <div className={classes.information}>
                <CommonStyles.Typography variant="h4" component="h4" sx={{ color: '#0B518F' }}>
                  {t('common:profile_title')}
                </CommonStyles.Typography>

                <Form>
                  {isObject(initialValues) &&
                    Object.keys(initialValues).map((item, index) => {
                      if (item !== '_id') {
                        return <Field key={index} name={item} component={ProfileField} />;
                      } else return null;
                    })}
                </Form>
              </div>
            ) : (
              <div className={classes.information}>
                <CommonStyles.Typography variant="h4" component="h4" sx={{ color: '#0B518F' }}>
                  {t('common:profile_changePass')}
                </CommonStyles.Typography>

                <Form>
                  <div className={classes.changePassWrapper}>
                    <div className="field">
                      <div className="left">{t('common:profile_enterOldPass')}</div>
                      <div className="right">
                        <Field
                          name="currentPassword"
                          placeholder={t('common:profile_enterOldPass')}
                          component={CustomField.InputField}
                          type="password"
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="left">{t('common:profile_enterNewPass')}</div>
                      <div className="right">
                        <Field
                          name="newPassword"
                          placeholder={t('common:profile_enterNewPass')}
                          component={CustomField.InputField}
                          type="password"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="left">{t('common:profile_enterNewPassAgain')}</div>
                      <div className="right">
                        <Field
                          name="newPassAgain"
                          placeholder={t('common:profile_enterNewPassAgain')}
                          component={CustomField.InputField}
                          type="password"
                        />
                      </div>
                    </div>
                    <div className="btnSubmit">
                      <CommonStyles.Button style={{ width: 120 }} type="submit">
                        {t('common:save')}
                      </CommonStyles.Button>
                    </div>
                  </div>
                </Form>
              </div>
            )}
          </CommonStyles.Content>
        );
      }}
    </Formik>
  );
};

export default Profile;
