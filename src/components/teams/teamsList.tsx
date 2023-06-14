import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import TeamsForms from "./teamsForms";

const TeamsList = () => {
  const [show, setShow] = useState({ open: false, function: "" });
  const [data, setData] = useState("");
  const [response, setResponse] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClose = () => setShow({ open: false, function: "" });
  const handleShow = (e: any) => {
    setData(e);
    setShow({ open: true, function: "ATUALIZAR DADOS DA EQUIPE" });
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

  const teams = [
    {
      id: 1,
      nomeEquipe: "TI",
      descricaoEquipe: "Equipe de TI",
    },
    {
      id: 2,
      nomeEquipe: "RH",
      descricaoEquipe: "Equipe de RH",
    },
    {
      id: 3,
      nomeEquipe: "Administrador",
      descricaoEquipe: "Equipe de ADMIN",
    },
  ];

  return (
    <>
      <table className="table table-bordered table-striped mb-0">
        <thead className="sticky-top">
          <tr>
            <th scope="col"></th>
            <th scope="col">nomeEquipe</th>
            <th scope="col">descricaoEquipe</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((pos, index) => {
            return (
              <tr key={pos.id}>
                <th scope="row">{index}</th>
                <td>{pos.nomeEquipe}</td>
                <td>{pos.descricaoEquipe}</td>
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
                  </div>
                </th>
                <Modal show={show.open} onHide={handleClose}>
                  <TeamsForms func={show.function} data={data} />
                </Modal>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TeamsList;
