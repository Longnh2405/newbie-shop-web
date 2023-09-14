import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Formik, Form, Field } from 'formik';
import InputField from 'components/CustomField/InputField';
import { Navigate, useNavigate } from 'react-router-dom';
import { RouteBase } from 'constants/routeUrl';
import { useAuthentication } from 'providers/AuthenticationProvider';
import CommonStyles from 'components/CommonStyles';
import { makeStyles } from '@mui/styles';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import i18n from 'i18n';
import { REQUIRED_FIELD } from 'helpers/messages';
import login_image from 'assets/images/login/login_image.svg';
import login_background from 'assets/images/login/login_background.svg';
import { Box } from '@mui/system';
import { showError, showInfo, showSuccess } from 'helpers/toast';
import { toast } from 'react-toastify';
import { ROLE, roles } from 'constants/index';
import httpServices from 'services/httpServices';
import CustomField from 'components/CustomField';
import { useRegister } from 'hooks/auth/useRegister';
import FieldLocation from './FieldLocation';

const useStyles = makeStyles((theme) => {
  return {
    backgroundVector: {
      backgroundImage: `url(${login_image})`,
      backgroundSize: 'cover',
      position: 'absolute',
      bottom: 0,
      right: 0,
      height: '100%',
      width: '40%',
      [theme.breakpoints.down('lg')]: {
        display: 'none',
      },
    },
    backgroundMain: {
      backgroundImage: `url(${login_background})`,
      width: '565px',
      height: '487px',
      [theme.breakpoints.down('lg')]: {
        display: 'none',
      },
    },
    loginForm: {
      padding: '3.5rem 3rem',
      backgroundColor: '#fff',
      borderRadius: '12px',
      zIndex: '2',
      minWidth: '650px',
      [theme.breakpoints.down('md')]: {
        minWidth: '350px',
      },
      '& .login_header': {
        color: theme.custom.colors.darkblue,
        fontWeight: '600 !important',
        textAlign: 'center',
      },
      '& .form_group': {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '1.5rem',
        '& .form_input_group': {
          display: 'flex',
          gap: '0.75rem',
          flexDirection: 'column',
          marginBottom: '1.5rem',
          '& .form_input': {
            padding: '12px 16px',
            color: theme.custom.colors.darkgray,
            borderRadius: '12px',
            border: `solid 1px ${theme.custom.colors.darkgray}`,
          },
        },
        '& .form_checkbox': {
          display: 'flex',
          flexDirection: 'row',
          gap: '.5rem',
          alignItems: 'center',
          color: theme.custom.colors.darkgray,
          marginBottom: '1.5rem',
        },
        '& .form_submit': {
          padding: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          backgroundColor: theme.custom.colors.darkblue,
          borderRadius: '12px',
          color: theme.custom.colors.white,
        },
        '& .btnGroup': {
          marginTop: '1rem',
          flexDirection: 'column',
          gap: '10px',
          display: 'flex',
          '& .forgotPassword': {
            color: theme.custom.colors.extra_lightblue,
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '16px',
            lineHeight: '24px',
          },
        },
      },
    },
    form: {
      // width: '100vw',
      height: '100vh',
      position: 'relative',
      display: 'flex',
      gap: '110px',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
    },
    eachRow: {
      marginBottom: theme.spacing(),
    },
  };
});

const Register = (props) => {
  //! State
  const classes = useStyles();
  const { isLogged, login, userInfo } = useAuthentication();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name là trường bắt buộc'),
    phone: Yup.string()
      .required('Phone là trường bắt buộc')
      .test('phone', 'SĐT không hợp lệ ', function () {
        const {
          parent: { phone },
        } = this;
        const isVNPhoneMobile =
          /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
        return isVNPhoneMobile.test(phone);
      }),
    addressDetail: Yup.string().required('Địa chỉ chi tiết là trường bắt buộc'),
    province: Yup.string().required('Trường bắt buộc'),
    district: Yup.string().required('Trường bắt buộc'),
    ward: Yup.string().required('Trường bắt buộc'),
    email: Yup.string()
      .required('Email là trường bắt buộc')
      .test('email', 'Email không đúng định dạng', function () {
        const {
          parent: { email },
        } = this;
        const isEmail =
          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
        return isEmail.test(email);
      }),
    password: Yup.string()
      .required(REQUIRED_FIELD(i18n.t('common:password')))
      .test('pass', 'Mật khẩu cần lớn hơn 8 kí tự, chứa kí tự đặc biệt và cả chữ thường và chữ hoa', function () {
        const {
          parent: { password },
        } = this;
        const isStrongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;
        return isStrongPassword.test(password);
      }),
    passwordConfirm: Yup.string()
      .required('Confirm password là trường bắt buộc')
      .oneOf([Yup.ref('password'), null], 'Passwords không khớp'),
  });

  const { isLoading: isLoadingRegister, mutateAsync: register } = useRegister();

  //! Function
  const handleRegister = async (value) => {
    try {
      const bodyRegister = {
        name: value.name,
        email: value.email,
        phone: value.phone,
        password: value.password,
        address: `${value.addressDetail} - ${value.ward.name} - ${value.district.name} - ${value.province.name}`,
      };
      const res = await register(bodyRegister);
      showSuccess('Đăng kí thành công');
      navigate(RouteBase.Login);
    } catch (error) {
      console.log('error: ', error);
      showError('Đăng kí thất bại');
    }
  };

  //! Render
  if (isLogged && userInfo.role === ROLE.ADMIN) {
    return <Navigate to={RouteBase.UserList} replace />;
  }
  if (isLogged && userInfo.role === ROLE.USER) {
    return <Navigate to={RouteBase.Home} replace />;
  }

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        name: '',
        email: '',
        phone: '',
        password: '',
        passwordConfirm: '',
        remember: false,
        province: '',
        district: '',
        ward: '',
        addressDetail: '',
      }}
      onSubmit={handleRegister}
    >
      {(propsFormik) => (
        <Form className={classes.form}>
          <Box className={classes.backgroundVector}></Box>
          <Box className={classes.backgroundMain}></Box>
          <Box className={classes.loginForm}>
            <CommonStyles.Typography className="login_header" variant="h2" component="h2">
              Đăng ký tài khoản
            </CommonStyles.Typography>
            <Box className="form_group">
              <Box className="form_input_group">
                <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
                  <div style={{ flex: 1 }}>
                    <Field component={CustomField.InputField} label="Name" name="name" placeholder="Name" required />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Field
                      component={CustomField.InputField}
                      label="Phone"
                      required
                      name="phone"
                      placeholder="Phone number"
                    />
                  </div>
                </div>
                <Field component={CustomField.InputField} label="Email" name="email" placeholder="Email" required />
                <FieldLocation />
                <Field
                  component={CustomField.InputField}
                  label="Địa chỉ chi tiết"
                  name="addressDetail"
                  placeholder="Địa chỉ chi tiết"
                  required
                />
                <Field
                  component={CustomField.InputField}
                  label="Password"
                  name="password"
                  placeholder={t('common:password')}
                  // type="password"
                  required
                  showHidePasswordMode
                />
                <Field
                  component={CustomField.InputField}
                  label="Confirm password"
                  name="passwordConfirm"
                  placeholder={t('common:password')}
                  type="password"
                  required
                />
              </Box>
              <Box className="btnGroup">
                <CommonStyles.Button variant="contained" type="submit" disabled={loading}>
                  Đăng ký
                </CommonStyles.Button>
              </Box>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
export default Register;
