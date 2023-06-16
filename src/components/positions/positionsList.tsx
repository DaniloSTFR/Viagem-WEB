import React, { useEffect, useState } from "react";
import "../../styles/position.scss";
import { Button, Modal } from "react-bootstrap";
import PositionsForms from "./positionsForms";
import ConfirmationModal from "../shared/confirmationModal";
import { PositionsServices } from "../../services/PositionsServices";
import { Positions } from '../../types/Positions'; 


type Props = {
  refreshComponent: boolean;

}

type PositionsArray = {
  arr: Positions[];
}

const PositionsList = ({refreshComponent}: Props) => {
  const positionsServices =  new PositionsServices();

  const [show, setShow] = useState({ open: '', function: "" });
  const [data, setData] = useState<any>({});
  const [positions, setPositions] = useState<PositionsArray>({arr: []});
  const [response, setResponse] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    async function getAllPositions(){

      const responsefirebase = await positionsServices.getAllPositions('YTgh3NZ82IikUEnJBr9F');
      setPositions({arr:responsefirebase});
      console.log(responsefirebase);

    }
    getAllPositions();
// eslint-disable-next-line    
}, [show,refreshComponent
]);


  const handleClose = () => setShow({ open: '', function: "" });
  const handleShow = (e: any) => {
    setData(e);
    setShow({ open: e.uid, function: "ATUALIZAR DADOS DO CARGO" });
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
          {positions.arr.map((pos, index) => {
            return (
              <tr key={pos.uid}>
                <th scope="row">{index}</th>
                <td>{pos.namePosition}</td>
                <td>{pos.descriptionPosition}</td>
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
                <Modal show={show.open === pos.uid} onHide={handleClose}>
                  <PositionsForms func={show.function} data={pos} action='update' handleClose={handleClose}/>
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
