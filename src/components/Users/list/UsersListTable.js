
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as dataFormat from "./UsersDataFormatters";
import actions from "../../../actions/usersListActions";
import Widget from "../../Widget/Widget";
import s from "../Users.module.scss";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input,
} from 'reactstrap';

const UsersListTable = (props) => {
  const { rows, dispatch, loading, idToDelete, modalOpen } = props;
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows);

  useEffect(() => {
    dispatch(actions.doFetch({}))
  }, [dispatch]);

  useEffect(() => {
    if (!search) {
      setFilteredRows(rows);
    } else {
      setFilteredRows(
        rows.filter(row =>
          Object.values(row).some(val =>
            String(val).toLowerCase().includes(search.toLowerCase())
          )
        )
      );
    }
  }, [search, rows]);

  const handleDelete = () => {
    dispatch(actions.doDelete(idToDelete));
  };
  const openModal = (id) => {
    dispatch(actions.doOpenConfirm(id));
  };
  const closeModal = () => {
    dispatch(actions.doCloseConfirm());
  };

  return (
    <div>
      <Widget className="widget-p-md">
        <p className="headline-2">Users</p>
        <div className="mb-3">
          <Input
            type="search"
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-100"
          />
        </div>
        <Table responsive striped hover className="mt-4">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>E-mail</th>
              <th>Role</th>
              <th>Disabled</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map(row => (
              <tr key={row.id}>
                <td>{dataFormat.imageFormatter ? dataFormat.imageFormatter(row.avatars) : row.avatars}</td>
                <td>{row.firstName}</td>
                <td>{row.lastName}</td>
                <td>{row.phoneNumber}</td>
                <td>{row.email}</td>
                <td>{row.role}</td>
                <td>{dataFormat.booleanFormatter ? dataFormat.booleanFormatter(row.disabled) : String(row.disabled)}</td>
                <td>
                  <div className="d-flex justify-content-between">
                    <Button
                      className={s.controlBtn}
                      color="info"
                      size="sm"
                      onClick={() => navigate(`/admin/users/${row.id}`)}
                    >
                      View
                    </Button>
                    <Button
                      className={`${s.controlBtn} mx-2`}
                      color="success"
                      size="sm"
                      onClick={() => navigate(`/admin/users/${row.id}/edit`)}
                    >
                      Edit
                    </Button>
                    <Button
                      className={s.controlBtn}
                      color="danger"
                      size="sm"
                      onClick={() => openModal(row.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Widget>
      <Modal size="sm" isOpen={modalOpen} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>Confirm delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this item?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeModal}>Cancel</Button>
          <Button color="primary" onClick={handleDelete}>Delete</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

function mapStateToProps(store) {
  return {
    loading: store.users.list.loading,
    rows: store.users.list.rows,
    modalOpen: store.users.list.modalOpen,
    idToDelete: store.users.list.idToDelete,
  };
}

export default connect(mapStateToProps)(UsersListTable);
