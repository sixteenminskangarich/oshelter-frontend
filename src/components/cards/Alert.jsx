import Swal from 'sweetalert2';
import pop from '../../assets/gifs/pop.gif'

const showCustomAlert = ({ title, message, confirmText, cancelText = null, onConfirm, onCancel }) => {
  Swal.fire({
    // title: ` `,
    html: `
      <div class="p-2" >
        <img src="${pop}" class="h-20 w-20 rounded-full" />
        <h3 class="text-xl text-left mt-0 font-bold">${title}</h3>
        <div class="custom-alert-container mt-2">
          <p class="text-gray-700 text-left">${message}</p>
        </div>
      </div>
      <hr />
    `,
    showCancelButton: cancelText ? true : false,
    confirmButtonText: confirmText || 'Confirm',
    cancelButtonText: cancelText || 'Cancel',
    customClass: {
      popup: 'custom-popup-class',
      confirmButton: 'custom-confirm-button',
      cancelButton: 'custom-cancel-button',
      footer: 'swal2-actions'
    },
  }).then((result) => {
    if (result.isConfirmed && onConfirm) {
      onConfirm();
    } else if (result.isDismissed && onCancel) {
      onCancel();
    }
  });
};

export default showCustomAlert;