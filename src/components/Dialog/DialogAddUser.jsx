import React from 'react';
import useToggleDialog from 'hooks/useToggleDialog';
import CommonStyles from '../CommonStyles';
import CommonIcons from '../CommonIcons';
import { Grid } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomField from '../CustomField';
import StyledButton from '../CommonStyles/Button';
import Modal from 'components/CommonStyles/Modal';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => {
  return {
    headerPopupAddUser: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 36,
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
    },
  };
});

const optionsDataPosition = [
  {
    value: 'Tư vấn viên',
    label: 'Tư vấn viên',
  },
  {
    value: 'Trưởng phòng',
    label: 'Trưởng phòng',
  },
];

const optionsDataTitle = [
  {
    value: 'Admin',
    label: 'Admin',
  },
  {
    value: 'User',
    label: 'User',
  },
];

const DialogAddUser = ({ open, toggle, onSubmit, id }) => {
  //! State
  const classes = useStyles();

  //! Function

  const ContentPopupAddUser = () => {
    return (
      <Formik
        initialValues={{
          userCode: '',
          fullName: '',
          phoneNumber: '',
          email: '',
          position: 'Trưởng phòng',
          title: 'Admin',
        }}
        validationSchema={Yup.object({
          userCode: Yup.string().max(15, 'Must be 15 characters or less').required('Mã nhân viên không được để trống'),
          fullName: Yup.string().max(20, 'Must be 20 characters or less').required('Họ tên không được để trống'),
          phoneNumber: Yup.number().required('Số điện thoại không được để trống'),
          email: Yup.string().email('Invalid email address').required('Email không được để trống'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className={classes.headerPopupAddUser}>
              <div className="label-add-user">Thêm sản phẩm mới</div>
              <div className="icon-close-header-add-user" onClick={toggle}>
                <CommonIcons.Close sx={{ width: 20, height: 20 }} />
              </div>
            </div>
            <div>
              <Grid container>
                <Grid container spacing={4} item md={12}>
                  <Grid item md={6} sm={12} xs={12}>
                    <Field label="Mã nhân viên" LabelColorPrimary name="userCode" component={CustomField.InputField} />
                  </Grid>

                  <Grid item md={6} sm={12} xs={12}>
                    <Field label="Họ tên" name="fullName" LabelColorPrimary component={CustomField.InputField} />
                  </Grid>
                </Grid>

                <Grid container spacing={4} item md={12} sx={{ marginTop: 0 }}>
                  <Grid item md={6} sm={12} xs={12}>
                    <Field
                      label="Số điện thoại"
                      LabelColorPrimary
                      name="phoneNumber"
                      component={CustomField.InputField}
                    />
                  </Grid>

                  <Grid item md={6} sm={12} xs={12}>
                    <Field label="Email" LabelColorPrimary name="email" component={CustomField.InputField} />
                  </Grid>
                </Grid>

                <Grid container spacing={4} item md={12} sx={{ marginTop: 0 }}>
                  <Grid item md={6} sm={12} xs={12}>
                    <Field
                      name="position"
                      LabelColorPrimary
                      label="Chức vụ"
                      options={optionsDataPosition}
                      component={CustomField.SelectField}
                    />
                  </Grid>

                  <Grid item md={6} sm={12} xs={12}>
                    <Field
                      name="title"
                      LabelColorPrimary
                      label="Chức danh"
                      options={optionsDataTitle}
                      component={CustomField.SelectField}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={4} item md={12} sx={{ marginTop: 0 }}>
                  <Grid item md={6} sm={12} xs={12}>
                    <Field labelFolder="Dự án" LabelColorPrimary component={CustomField.ListProjField} />
                  </Grid>
                </Grid>

                <Grid container spacing={4} item md={12} sx={{ marginTop: 0 }}>
                  <Grid item md={6} sm={12} xs={12}>
                    <Field component={CustomField.CustomizedTabsField} />
                  </Grid>
                </Grid>
              </Grid>
            </div>

            <div className={classes.footerPopupAddUser}>
              <StyledButton type="submit" style={{ width: 160 }}>
                Lưu
              </StyledButton>
            </div>
          </form>
        )}
      </Formik>
    );
  };
  //!Render
  return <CommonStyles.Modal id={id} open={open} toggle={toggle} disableClickOutside content={ContentPopupAddUser()} />;
};
export default DialogAddUser;
