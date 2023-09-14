import httpServices from 'services/httpServices';

export const updateUser = async (params) => {
  const { name, value, editUser, initialValues, resetForm } = params;
  try {
    const user = httpServices.getUserInfoStorage();
    await editUser({
      [name]: value,
      _id: user?.id,
    });
    httpServices.saveUserInfoStorage({ ...user, [name]: value });
    resetForm({
      values: {
        ...initialValues,
        [name]: value,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};
