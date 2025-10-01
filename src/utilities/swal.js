import Swal from "sweetalert2";
export const showAlert = async ({
  type = "info",
  title,
  text = "",
  confirmation = false,
  confirmText = "OK",
  cancelText = "Cancel",
  timer = null,
}) => {
  const config = {
    icon: type,
    title,
    text,
    showCancelButton: confirmation,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
    customClass: {
      confirmButton: "swal2-confirm custom-swal-btn",
      cancelButton: "swal2-cancel custom-swal-btn",
       title: "swal2-title-sm",  
    popup: "swal2-popup-sm",   
    htmlContainer: "swal2-text-sm", 
    },
    buttonsStyling: false,
  };

  if (timer) {
    config.showConfirmButton = false;
    config.timer = timer;
  }

  const result = await Swal.fire(config);
  return result.isConfirmed ?? false;
};
