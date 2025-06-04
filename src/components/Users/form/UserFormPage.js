

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import actions from "../../../actions/usersFormActions";
import UsersForm from "./UsersForm";
import { Alert } from 'reactstrap';
import cx from 'classnames';
import s from "../Users.module.scss";


const UserFormPage = (props) => {
  const [dispatched, setDispatched] = useState(false);
  const [promoAlert, setPromoAlert] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const {
    dispatch,
    saveLoading,
    findLoading,
    record,
    currentUser
  } = props;

  const showPromoAlert = () => {
    setPromoAlert(true);
  };

  const isEditing = () => {
    return !!params.id;
  };

  const isProfile = () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const currentUserId = currentUser?.id || currentUser?.user?.id;
    if (params.id === currentUserId) {
      return true;
    }
    return location.pathname === '/template/edit_profile';
  };

  const doSubmit = (id, data) => {
    if (isEditing() || isProfile()) {
      dispatch(actions.doUpdate(id, data, isProfile()));
    } else {
      dispatch(actions.doCreate(data));
    }
  };

  useEffect(() => {
    if (isEditing()) {
      dispatch(actions.doFind(params.id));
    } else {
      if (isProfile()) {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const currentUserId = currentUser?.id || currentUser?.user?.id;
        dispatch(actions.doFind(currentUserId));
      } else {
        dispatch(actions.doNew());
      }
    }
    setDispatched(true);
    setTimeout(() => {
      showPromoAlert();
    }, 100);
    // eslint-disable-next-line
  }, [dispatch, location.pathname, params.id]);

  return (
    <React.Fragment>
      <div className="page-top-line">
        <h2 className="page-title">Edit Profile</h2>
        <Alert
          color="primary"
          className={cx(s.promoAlert, {[s.showAlert]: promoAlert})}
        >
          This page is only available in <a className="text-white font-weight-bold" rel="noreferrer noopener" href="https://flatlogic.com" target="_blank">Sofia React App with Node.js</a> integration!
        </Alert>
      </div>
      {dispatched && (
        <UsersForm
          saveLoading={saveLoading}
          findLoading={findLoading}
          currentUser={currentUser}
          record={
            (isEditing() || isProfile()) ? record : {}
          }
          isEditing={isEditing()}
          isProfile={isProfile()}
          onSubmit={doSubmit}
          onCancel={() => navigate('/admin/users')}
        />
      )}
    </React.Fragment>
  );
}

function mapStateToProps(store) {
  return {
    findLoading: store.users.form.findLoading,
    saveLoading: store.users.form.saveLoading,
    record: store.users.form.record,
    currentUser: store.auth.currentUser,
  };
}

export default connect(mapStateToProps)(UserFormPage);


