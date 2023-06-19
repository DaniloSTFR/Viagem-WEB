import React, { useState } from "react";
import "../../styles/employees.scss";
import { Modal } from "react-bootstrap";
import EmployeesForms from "./employeesForms";

const EmployeesCard = ({ receiveData }: any) => {
  console.log(receiveData);
  const [show, setShow] = useState({ open: false, function: "" });

  const handleClose = () => setShow({ open: false, function: "" });
  const handleShow = () =>
    setShow({ open: true, function: "ATUALIZAR DADOS DE USUARIO" });
  return (
    <>
      <div
        onClick={handleShow}
        className="card"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        <div className="card-body">
          <div className="d-flex align-items-center">
            <img
              src="https://mdbootstrap.com/img/new/avatars/8.jpg"
              alt=""
              className="rounded-circle"
            />
            <div className="ms-3 card-data d-flex">
              <div>
                <p className="fw-bold mb-1">{receiveData.fullName}</p>
                <p className="text-muted mb-0">Email: {receiveData.email}</p>
                <p className="text-muted mb-0">Cpf: {receiveData.cpf}</p>
                <p className="text-muted mb-0">
                  Empresa: {receiveData.company}
                </p>
                <p className="text-muted mb-0">
                  Administrador:{" "}
                  <input
                    disabled
                    type="checkbox"
                    checked={receiveData.isAdmin}
                  ></input>{" "}
                </p>
                <p className="text-muted mb-0">cargo: {receiveData.position}</p>
                <p className="text-muted mb-0">
                  Ativo:{" "}
                  <input
                    disabled
                    type="checkbox"
                    checked={receiveData.isActive}
                  ></input>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show.open} onHide={handleClose}>
        <EmployeesForms func={show.function} data={receiveData} />
      </Modal>
    </>
  );
};

export default EmployeesCard;
