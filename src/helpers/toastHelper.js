import { toast } from "react-toastify";

export const toastError = err => {
  let message = null;
  console.log(err);
  if (typeof err === 'object' && err.message) {
    ({ message } = err);
  }
  if (message !== null && typeof message !== 'undefined' && message !== '') {
    toast.error(message);
  }
}