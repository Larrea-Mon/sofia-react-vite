import axios from "axios";
import Errors from "../components/FormItems/error/errors";
// Removed: import { push } from "connected-react-router";
import { doInit } from "./auth";
import { toast } from "react-toastify";
import config from "../config";
import { mockUser } from "./authMockData";

const actions = {
  doNew: () => {
    return {
      type: 'USERS_FORM_RESET',
    };
  },

  doFind: (id, navigate) => async (dispatch) => {
    if (!config.isBackend) {
      dispatch({
        type: 'USERS_FORM_FIND_SUCCESS',
        payload: mockUser,
      });
    } else {
      try {
        dispatch({
          type: 'USERS_FORM_FIND_STARTED',
        });

        axios.get(`/users/${id}`).then(res => {
          const record = res.data;

          dispatch({
            type: 'USERS_FORM_FIND_SUCCESS',
            payload: record,
          });
        })
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: 'USERS_FORM_FIND_ERROR',
        });

        if (navigate) navigate('/admin/users');
      }
    }
  },

  doCreate: (values, navigate) => async (dispatch) => {
    try {
      dispatch({
        type: 'USERS_FORM_CREATE_STARTED',
      });

      axios.post('/users', { data: values }).then(res => {
        dispatch({
          type: 'USERS_FORM_CREATE_SUCCESS',
        });

        toast.success('User created');
        if (navigate) navigate('/admin/users');
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'USERS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile, navigate) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'USERS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/users/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'USERS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        toast.success('Profile updated');
      } else {
        toast.success('User updated');
        if (navigate) navigate('/admin/users');
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'USERS_FORM_UPDATE_ERROR',
      });
    }
  },

  doChangePassword: ({newPassword, currentPassword}, navigate) => async (dispatch) => {
    try {
      dispatch({
        type: 'USERS_FORM_CREATE_STARTED',
      });
      await axios.put('/auth/password-update', {newPassword, currentPassword})
      dispatch({
        type: 'USERS_PASSWORD_UPDATE_SUCCESS',
      });

      toast.success('Password has been updated');
      if (navigate) navigate('/admin/users');

    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'USERS_FORM_CREATE_ERROR',
      });
    }
  },
};

export default actions;
