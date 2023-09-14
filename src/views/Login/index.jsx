import React, { useState, useEffect, useRef } from 'react';
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
import { showInfo } from 'helpers/toast';
import { toast } from 'react-toastify';
import { ROLE, roles } from 'constants/index';
import httpServices from 'services/httpServices';

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
      padding: '4.5rem 4rem',
      backgroundColor: '#fff',
      borderRadius: '12px',
      zIndex: '2',
      minWidth: '500px',
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
        marginTop: '4rem',
        '& .form_input_group': {
          display: 'flex',
          gap: '1.5rem',
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
      width: '100vw',
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

const LoginPage = (props) => {
  //! State
  const classes = useStyles();
  const { isLogged, login, userInfo } = useAuthentication();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const toastId = useRef(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    phone: Yup.string().required('Bạn chưa nhập số điện thoại'),
    password: Yup.string().required('Bạn chưa nhập mật khẩu'),
  });

  //! Function
  // useEffect(() => {
  //   if (toastId.current && !loading) {
  //     toast.dismiss(toastId.current);
  //   }
  // }, [loading]);

  //! Render
  if (isLogged && userInfo.role === ROLE.ADMIN) {
    return <Navigate to={RouteBase.ProductManage} replace />;
  }
  if (isLogged && userInfo.role === ROLE.USER) {
    return <Navigate to={RouteBase.Home} replace />;
  }

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        phone: '',
        password: '',
        remember: true,
      }}
      onSubmit={(values) => {
        const { phone, password, remember } = values;
        login({ phone, password });
        toastId.current = showInfo('Hey 👋, You are signin in as ' + username, { autoClose: false });
      }}
    >
      {(propsFormik) => (
        <Form className={classes.form}>
          <Box className={classes.backgroundVector}></Box>
          <Box className={classes.backgroundMain}></Box>
          <Box className={classes.loginForm}>
            <CommonStyles.Typography className="login_header" variant="h2" component="h2">
              {t('common:login')}
            </CommonStyles.Typography>
            <Box className="form_group">
              <Box className="form_input_group">
                <Field component={InputField} name="phone" placeholder="Phone number" />
                <Field component={InputField} name="password" placeholder={t('common:password')} type="password" />
              </Box>
              <Box className="form_checkbox">
                <Field component={CommonStyles.Checkbox} name="remember" />
                <CommonStyles.Typography variant="h5" component="h5">
                  {t('common:remember_login')}
                </CommonStyles.Typography>
              </Box>
              <Box className="btnGroup">
                <CommonStyles.Button variant="contained" type="submit" disabled={loading}>
                  {t('common:login')}
                </CommonStyles.Button>
                <CommonStyles.Button variant="text" color="primary" onClick={() => navigate(RouteBase.Register)}>
                  <div className="forgotPassword">Đăng ký</div>
                </CommonStyles.Button>
              </Box>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
export default LoginPage;
