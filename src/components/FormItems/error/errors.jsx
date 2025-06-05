import { toast } from 'react-toastify';

const DEFAULT_ERROR_MESSAGE = 'Error';

function selectErrorMessage(error) {
  if (error && error.response && error.response.data) {
    const data = error.response.data;

    if (data.error && data.error.message) {
      return data.error.message;
    }

    return String(data);
  }

  return error.message || DEFAULT_ERROR_MESSAGE;
}

function selectErrorCode(error) {
  if (error && error.response && error.response.status) {
    return error.response.status;
  }

  return 500;
}

let injectedStore = null;
export function setErrorStore(store) {
  injectedStore = store;
}

export default class Errors {
  static handle(error, navigate) {
    if (process.env.NODE_ENV !== 'test') {
      console.error(selectErrorMessage(error));
      console.error(error);
    }

    if (selectErrorCode(error) === 403) {
      if (navigate) {
        navigate('/403');
      } else if (injectedStore) {
        injectedStore.dispatch({ type: 'NAVIGATE', payload: '/403' });
      } else {
        window.location.href = '/403';
      }
      return;
    }

    if (selectErrorCode(error) === 400) {
      toast.error(selectErrorMessage(error));
      return;
    }

    if (navigate) {
      navigate('/500');
    } else if (injectedStore) {
      injectedStore.dispatch({ type: 'NAVIGATE', payload: '/500' });
    } else {
      window.location.href = '/500';
    }
  }

  static errorCode(error) {
    return selectErrorCode(error);
  }

  static selectMessage(error) {
    return selectErrorMessage(error);
  }

  static showMessage(error) {
    toast.error(selectErrorMessage(error));
  }
}
