import React, { useState } from "react";
import "../../styles/position.scss";
import { Button, Modal } from "react-bootstrap";
import PositionsForms from "./positionsForms";
import ConfirmationModal from "../shared/confirmationModal";
const PositionsList = () => {
  const [show, setShow] = useState({ open: false, function: "" });
  const [data, setData] = useState("");
  const [response, setResponse] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClose = () => setShow({ open: false, function: "" });
  const handleShow = (e: any) => {
    setData(e);
    setShow({ open: true, function: "ATUALIZAR DADOS DO CARGO" });
  };
  const handleCloseAlert = () => setShowAlert(false);
  const handleShowAlert = (isActive: boolean) => {
    setIsActive(isActive);
    setShowAlert(true);
  };

  const handleIsActive = (data: any) => {
    setIsActive(data);
  };

  const handleAlertResponse = (res: boolean) => {
    setResponse(res);
    handleCloseAlert();
  };

  const positions = [
    {
      id: 1,
      nomeCargo: "TI",
      descricaoCargo: "Cargo de TI",
      isAdmPosition: false,
      isActive: true,
    },
    {
      id: 2,
      nomeCargo: "RH",
      descricaoCargo: "Cargo de RH",
      isAdmPosition: false,
      isActive: false,
    },
    {
      id: 3,
      nomeCargo: "Administrador",
      descricaoCargo: "Cargo de ADMIN",
      isAdmPosition: true,
      isActive: true,
    },
  ];

  return (
    <>
      <table className="table table-bordered table-striped mb-0">
        <thead className="sticky-top">
          <tr>
            <th scope="col"></th>
            <th scope="col">NomeCargo</th>
            <th scope="col">DescricaoCargo</th>
            <th scope="col">Admin</th>
            <th scope="col">Ativo</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((pos, index) => {
            return (
              <tr key={pos.id}>
                <th scope="row">{index}</th>
                <td>{pos.nomeCargo}</td>
                <td>{pos.descricaoCargo}</td>
                <th>
                  <input
                    disabled
                    type="checkbox"
                    checked={pos.isAdmPosition}
                  ></input>
                </th>
                <th>
                  <input
                    disabled
                    type="checkbox"
                    checked={pos.isActive}
                  ></input>
                </th>
                <th>
                  <div className="buttons">
                    <Button
                      onClick={() => {
                        handleShow(pos);
                      }}
                      variant="warning"
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>
                    {pos.isActive ? (
                      <Button
                        onClick={() => {
                          handleShowAlert(pos.isActive);
                        }}
                        variant="success"
                        size="sm"
                      >
                        <i className="bi bi-check-lg"></i>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          handleShowAlert(pos.isActive);
                        }}
                        variant="danger"
                        size="sm"
                      >
                        <i className="bi bi-x-lg"></i>
                      </Button>
                    )}
                  </div>
                </th>
                <Modal show={showAlert} onHide={handleCloseAlert}>
                  <ConfirmationModal
                    isActive={isActive}
                    handleAlertResponse={handleAlertResponse}
                  />
                </Modal>
                <Modal show={show.open} onHide={handleClose}>
                  <PositionsForms func={show.function} data={data} />
                </Modal>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default PositionsList;
