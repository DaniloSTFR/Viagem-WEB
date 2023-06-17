import { useEffect, useState } from "react";
import "../../styles/position.scss";
import { Button, Modal } from "react-bootstrap";
import PositionsForms from "./positionsForms";
import ConfirmationModal from "../shared/confirmationModal";
import { PositionsServices } from "../../services/PositionsServices";
import { Positions } from '../../types/Positions'; 


type Props = {
  refreshComponent: boolean;
  setRefreshComponent: Function;
}

type PositionsArray = {
  arr: Positions[];
}

const PositionsList = ({refreshComponent, setRefreshComponent}: Props) => {
  const positionsServices =  new PositionsServices();
  const [show, setShow] = useState({ open: '', function: "" });
  const [positions, setPositions] = useState<PositionsArray>({arr: []});
  const [showAlert, setShowAlert] = useState({ open: '', text: '', handleFunctionAlertResponse: Function});

  useEffect(() => {
    async function getAllPositions(){
      try{
        const responsefirebase = await positionsServices.getAllPositions('YTgh3NZ82IikUEnJBr9F');
        setPositions({arr:responsefirebase});
      } catch (err: any) {
        console.log(err.message);
      }
    }
    getAllPositions();
// eslint-disable-next-line    
}, [show, refreshComponent]);

  const handleClose = () => setShow({ open: '', function: "" });
  const handleShow = (e: any) => {
    setShow({ open: e.uid, function: "ATUALIZAR DADOS DO CARGO" });
  };

  const handleCloseAlert = () => {
    setShowAlert({  open: '', text: '', handleFunctionAlertResponse: Function});
    setRefreshComponent(!refreshComponent);
  };

  const handleShowAlert = (pos:Positions, text:string, handleFunctionAlertResponse:any) => {
    setShowAlert({ open: pos.uid?pos.uid:'', text, handleFunctionAlertResponse});
  };

  const handleAlertResponseToSetPositionState = async (res: boolean,uid: string, state:boolean) => {
   
    if(res){
      try{
        await positionsServices.setIsActive(uid, !state);
      } catch (err: any) {
        console.log(err.message);
      }
    }
    handleCloseAlert();
  };

  const handleAlertResponseDeletePosition = async (res: boolean, uid: string, state:boolean) => {
    if(res){
      try{
        await positionsServices.deletePositions(uid);
      } catch (err: any) {
        console.log(err.message);
      }
    }
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
                    {!pos.isActive ? (
                      <Button
                        onClick={() => {
                          handleShowAlert(pos, 'Deseja realmente reativar o cargo?', handleAlertResponseToSetPositionState);
                        }}
                        variant="success"
                        size="sm"
                      >
                        <i className="bi bi-check-lg"></i>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          handleShowAlert(pos, 'Deseja realmente desativar o cargo?', handleAlertResponseToSetPositionState);
                        }}
                        variant="danger"
                        size="sm"
                      >
                        <i className="bi bi-x-lg"></i>
                      </Button>
                    )}

                    <Button
                      onClick={() => {
                        handleShowAlert(pos, 'Deseja realmente excluir o cargo?', handleAlertResponseDeletePosition);
                      }}
                      variant="outline-danger"
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </div>
                </th>
                <Modal show={showAlert.open === pos.uid} onHide={handleCloseAlert}>
                  <ConfirmationModal
                    handleFunctionAlertResponse={showAlert.handleFunctionAlertResponse}
                    uid={pos.uid}
                    state={pos.isActive}
                    alertText={showAlert.text}
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
