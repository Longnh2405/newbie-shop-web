import { toast, ToastContainer } from 'react-toastify';

const toastOptions = {
  position: 'top-right',
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  progress: undefined,
};

export const showError = (msg, customToast = {}) => {
  return toast.error(msg, { ...toastOptions, ...customToast });
};

export const showSuccess = (msg, customToast = {}) => {
  return toast.success(msg, { ...toastOptions, ...customToast });
};

export const showInfo = (msg, customToast = {}) => {
  return toast(msg, { ...toastOptions, ...customToast });
};
