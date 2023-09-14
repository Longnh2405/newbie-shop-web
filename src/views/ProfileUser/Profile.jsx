import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Field, Form, Formik } from 'formik';
import { Box, Button } from '@mui/material';
import CustomField from 'components/CustomField';
import { useAuthentication } from 'providers/AuthenticationProvider';
import FieldLocation from 'views/Register/FieldLocation';
import * as Yup from 'yup';
import { useUpdateUserInfo } from 'hooks/user/useUpdateUserInfo';
import { showError, showSuccess } from 'helpers/toast';
import { useRef } from 'react';
import { useGetUserDetail } from 'hooks/user/useGetUserDetail';
import { REQUIRED_FIELD } from 'helpers/messages';
import i18n from 'i18n';
import { useChangePassword } from 'hooks/user/useChangePassword';

const Profile = () => {
  //! State
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState(false);
  const [isChangePass, setIsChangePass] = useState(false);

  const formikRef = useRef(null);

  const { data: resUserInfo, refetch, isLoading } = useGetUserDetail();
  const userInfo = resUserInfo?.data?.data;

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
    address: Yup.string().required('Địa chỉ chi tiết là trường bắt buộc'),
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
  });
  const validationPass = Yup.object().shape({
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

  const { mutateAsync: updateUserInfo } = useUpdateUserInfo();
  const { mutateAsync: changePassword } = useChangePassword();

  //! Function

  const handleSubmitEdit = async (value) => {
    try {
      const bodyUserInfo = {
        name: value.name,
        email: value.email,
        phone: value.phone,
        password: value.password,
        address: `${value.address} - ${value.ward.name} - ${value.district.name} - ${value.province.name}`,
      };
      await updateUserInfo(bodyUserInfo);
      showSuccess('Sửa thông tin thành công');
      refetch();
      setIsEdit(false);
    } catch (error) {
      console.log('error: ', error);
      showError('Có lỗi xảy ra');
    }
  };

  const handleSubmitPass = async (value) => {
    try {
      await changePassword({ new_password: value.password });
      showSuccess('Thay đổi mật khẩu thành công');
      setIsChangePass(false);
    } catch (error) {
      console.log('error: ', error);
      showError('Có lỗi xảy ra');
    }
  };
  return (
    <div className="profile__right">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="profile__right__user">
          <div className="profile__right__user__title" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ margin: '0' }}>Thông tin cá nhân</h4>
              <span>Quản lý thông tin cá nhân để bảo mật tài khoản</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {!isEdit && (
                <Button
                  variant={isChangePass ? 'contained' : 'outlined'}
                  color={isChangePass ? 'error' : 'primary'}
                  onClick={() => setIsChangePass(!isChangePass)}
                >
                  {isChangePass ? 'Hủy' : 'Đổi mật khẩu'}
                </Button>
              )}
              {!isChangePass && (
                <Button
                  variant={isEdit ? 'contained' : 'outlined'}
                  color={isEdit ? 'error' : 'primary'}
                  onClick={() =>
                    setIsEdit((prev) => {
                      if (prev) {
                        formikRef.current.resetForm();
                      }
                      return !prev;
                    })
                  }
                >
                  {isEdit ? 'Hủy' : 'Chỉnh sửa thông tin'}
                </Button>
              )}
            </div>
          </div>
          <div style={{ padding: '30px 20px' }}>
            {!isChangePass && (
              <Formik
                validationSchema={validationSchema}
                initialValues={{
                  name: userInfo?.name,
                  email: userInfo?.email,
                  phone: userInfo?.phone,
                  address: userInfo?.address,
                  province: '',
                  district: '',
                  ward: '',
                }}
                onSubmit={handleSubmitEdit}
                innerRef={formikRef}
                enableReinitialize
              >
                {({ values }) => {
                  return (
                    <Form>
                      <Box style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
                          <div style={{ flex: 1 }}>
                            <Field
                              disabled={!isEdit}
                              component={CustomField.InputField}
                              label="Name"
                              name="name"
                              placeholder="Name"
                              required
                            />
                          </div>
                          <div style={{ flex: 1 }}>
                            <Field
                              disabled={!isEdit}
                              component={CustomField.InputField}
                              label="Phone"
                              required
                              name="phone"
                              placeholder="Phone number"
                            />
                          </div>
                        </div>
                        <Field
                          disabled
                          component={CustomField.InputField}
                          label="Email"
                          name="email"
                          placeholder="Email"
                          required
                        />
                        {isEdit && <FieldLocation />}
                        <Field
                          disabled={!isEdit}
                          component={CustomField.InputField}
                          name="address"
                          label={isEdit ? 'Địa chỉ chi tiết' : 'Địa chỉ'}
                          required
                        />

                        {isEdit && <CommonStyles.Button type="submit">Lưu chỉnh sửa</CommonStyles.Button>}
                      </Box>
                    </Form>
                  );
                }}
              </Formik>
            )}
            {isChangePass && (
              <Formik
                validationSchema={validationPass}
                initialValues={{
                  password: '',
                  passwordConfirm: '',
                }}
                onSubmit={handleSubmitPass}
              >
                {(propsFormik) => (
                  <Form>
                    <Box style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <Field
                        component={CustomField.InputField}
                        label="Password"
                        name="password"
                        placeholder={t('common:password')}
                        type="password"
                        required
                      />
                      <Field
                        component={CustomField.InputField}
                        label="Confirm password"
                        name="passwordConfirm"
                        placeholder={t('common:password')}
                        type="password"
                        required
                      />
                      {isChangePass && <CommonStyles.Button type="submit">Lưu chỉnh sửa</CommonStyles.Button>}
                    </Box>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;
