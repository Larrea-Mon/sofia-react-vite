import axios from "axios";
import config from "../config.jsx";
import { decodeToken } from "react-jwt";
import { toast } from "react-toastify";
import Errors from "../components/FormItems/error/errors.jsx";
import { mockUser } from "./authMockData.js";

export const AUTH_FAILURE = 'AUTH_FAILURE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const RESET_REQUEST = 'RESET_REQUEST';
export const RESET_SUCCESS = 'RESET_SUCCESS';
export const PASSWORD_RESET_EMAIL_REQUEST = 'PASSWORD_RESET_EMAIL_REQUEST';
export const PASSWORD_RESET_EMAIL_SUCCESS = 'PASSWORD_RESET_EMAIL_SUCCESS';
export const AUTH_INIT_SUCCESS = 'AUTH_INIT_SUCCESS';
export const AUTH_INIT_ERROR = 'AUTH_INIT_ERROR';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

async function findMe() {
  if (config.isBackend) {
    const response = await axios.get('/auth/me');
    return response.data;
  } else {
    return mockUser;
  }
}

export function authError(payload) {
  return {
    type: AUTH_FAILURE,
    payload,
  };
}

export function doInit() {
  return async (dispatch) => {
    let currentUser = null;
    if (!config.isBackend) {
      currentUser = mockUser;
      dispatch({
        type: AUTH_INIT_SUCCESS,
        payload: {
          currentUser,
        },
      });
    } else {
      try {
        let token = localStorage.getItem('token');
        if (token) {
          currentUser = await findMe();
        }
        dispatch({
          type: AUTH_INIT_SUCCESS,
          payload: {
            currentUser,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: AUTH_INIT_ERROR,
          payload: error,
        });
      }
    }
  }
}

export function logoutUser(navigate) {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    axios.defaults.headers.common['Authorization'] = "";
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    navigate('/login');
  };
}

export function receiveToken(token, navigate) {
  return (dispatch) => {
    let user;

    if (config.isBackend) {
      user = decodeToken(token)
    } else {
      user = {
        email: config.auth.email,
        user: {
          id: 'default_no_connection_id_444'
        }
      }
    }

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    dispatch({
      type: LOGIN_SUCCESS
    });
    navigate('/app');
  }
}

export function loginUser(creds, navigate) {
  return (dispatch) => {
    // init UI state settings:
    // localStorage.setItem('dashboardTheme', 'dark')
    if (!config.isBackend) {
      dispatch(receiveToken('token', navigate));
      dispatch(doInit());
      navigate('/template');
    } else {
      dispatch({
        type: LOGIN_REQUEST,
      });
      if (creds.social) {
        window.location.href = config.baseURLApi + "/auth/signin/" + creds.social + "?template=" + config.redirectUrl;
      } else if (creds.email.length > 0 && creds.password.length > 0) {
        axios.post("/auth/signin/local", creds).then(res => {
          const token = res.data;
          dispatch(receiveToken(token, navigate));
          dispatch(doInit());
          navigate('/template');
        }).catch(err => {
          dispatch(authError(err.response.data));
        })
      } else {
        dispatch(authError('Something was wrong. Try again'));
      }
    }
  };
}

export function verifyEmail(token, navigate) {
  return(dispatch) => {
    if (!config.isBackend) {
      navigate('/login');
    } else {
      axios.put('/auth/verify-email', {token}).then(verified => {
        if (verified) {
          toast.success("Your email was verified");
        }
      }).catch(err => {
        toast.error(err.response.data);
      }).finally(() => {
        navigate('/login');
      })
    }
  }
}

export function resetPassword(token, password, navigate) {
  return (dispatch) => {
    if (!config.isBackend) {
      navigate('/login');
    } else {
      dispatch({
        type: RESET_REQUEST,
      });
      axios.put('/auth/password-reset', { token, password }).then(res => {
        dispatch({
          type: RESET_SUCCESS,
        });
        toast.success('Password has been updated');
        navigate('/login');
      }).catch(err => {
        dispatch(authError(err.response.data));
      })
    }
  }
}

export function sendPasswordResetEmail(email, navigate) {
  return (dispatch) => {
    if (!config.isBackend) {
      navigate('/login');
    } else {
      dispatch({
        type: PASSWORD_RESET_EMAIL_REQUEST,
      });
      axios.post('/auth/send-password-reset-email', {email}).then(res => {
        dispatch({
          type: PASSWORD_RESET_EMAIL_SUCCESS,
        });
        toast.success('Email with resetting instructions has been sent');
        navigate('/login');
      }).catch(err => {
        dispatch(authError(err.response.data));
      })
    }
  }
}

export function registerUser(creds, navigate) {
  return (dispatch) => {
    if (!config.isBackend) {
      navigate('/user/profile');
    } else {
      dispatch({
        type: REGISTER_REQUEST,
      });

      if (creds.email.length > 0 && creds.password.length > 0) {
        axios.post('/auth/signup', creds).then(res => {
          dispatch({
            type: REGISTER_SUCCESS
          });
          toast.success("You've been registered successfully. Please check your email for verification link");
          navigate('/user/profile');
        }).catch(err => {
          dispatch(authError(err.response.data));
        })

      } else {
        dispatch(authError('Something was wrong. Try again'));
      }
    }
  };
}


