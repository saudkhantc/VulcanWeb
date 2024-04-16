import { toast } from 'react-toastify';

export const ShowSuccessToast = (message, options) => {
    toast.success(message, {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      bodyClassName: 'blue-toast-body',
      progressClassName: 'blue-progress-bar',
      ...options,
    });
  };

export const ShowErrorToast = (message, options) => {
    toast.error(message, {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      ...options,
    });
  };
  

