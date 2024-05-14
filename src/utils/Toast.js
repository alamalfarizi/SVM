import Swal from 'sweetalert2';

export const ToastStatus = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

export const toastNotif = (icon, title) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  Toast.fire({
    icon: icon || 'success',
    title: title || 'Berhasil'
  });

  Toast.fire({
    icon: icon || 'error',
    title: title || 'Gagal'
  });
};
