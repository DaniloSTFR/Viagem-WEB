import { useEffect, useState } from "react";
//import "../../styles/position.scss";
import { Button, Modal } from "react-bootstrap";
import TeamsForms from "./teamsForms";
import ConfirmationModal from "../shared/confirmationModal";
import { TeamsServices } from "../../services/TeamsServices";
import { Teams } from '../../types/Teams';

type Props = {
  refreshComponent: boolean;
  setRefreshComponent: Function;
}

type TeamsArray = {
  arr: Teams[];
}

const TeamsList = ({ refreshComponent, setRefreshComponent }: Props) => {
  const teamsServices = new TeamsServices();
  const [show, setShow] = useState({ open: '', function: "" });
  const [teams, setTeams] = useState<TeamsArray>({ arr: [] });
  const [showAlert, setShowAlert] = useState({ open: '', text: '', handleFunctionAlertResponse: Function });

  useEffect(() => {
    async function getAllTeams() {
      try {
        const responsefirebase = await teamsServices.getAllTeams('YTgh3NZ82IikUEnJBr9F');
        setTeams({ arr: responsefirebase });
      } catch (err: any) {
        console.log(err.message);
      }
    }
    getAllTeams();
    // eslint-disable-next-line    
  }, [show, refreshComponent]);

  const handleClose = () => setShow({ open: '', function: "" });
  const handleShow = (e: any) => {
    setShow({ open: e.uid, function: "ATUALIZAR DADOS DA EQUIPE" });
  };

  const handleCloseAlert = () => {
    setShowAlert({ open: '', text: '', handleFunctionAlertResponse: Function });
    setRefreshComponent(!refreshComponent);
  };

  const handleShowAlert = (tm: Teams, text: string, handleFunctionAlertResponse: any) => {
    setShowAlert({ open: tm.uid ? tm.uid : '', text, handleFunctionAlertResponse });
  };

  const handleAlertResponseToSetTeamState = async (res: boolean, uid: string, state: boolean) => {

    if (res) {
      try {
        await teamsServices.setIsActive(uid, !state);
      } catch (err: any) {
        console.log(err.message);
      }
    }
    handleCloseAlert();
  };

  const handleAlertResponseDeleteTeam = async (res: boolean, uid: string, state: boolean) => {
    if (res) {
      try {
        await teamsServices.deleteTeams(uid);
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
            <th scope="col">Nome da Equipe</th>
            <th scope="col">Descricao da Equipe</th>
            <th scope="col">Ativo</th>
          </tr>
        </thead>
        <tbody>
          {teams.arr.map((tm, index) => {
            return (
              <tr key={tm.uid}>
                <th scope="row">{index+1}</th>
                <td>{tm.nameTeams}</td>
                <td>{tm.descriptionTeams}</td>
                <th>
                  <input
                    disabled
                    type="checkbox"
                    checked={tm.isActive}
                  ></input>
                </th>
                <th>
                  <div className="buttons">
                    <Button
                      onClick={() => {
                        handleShow(tm);
                      }}
                      variant="warning"
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>
                    {!tm.isActive ? (
                      <Button
                        onClick={() => {
                          handleShowAlert(tm, 'Deseja realmente reativar a equipe?', handleAlertResponseToSetTeamState);
                        }}
                        variant="success"
                        size="sm"
                      >
                        <i className="bi bi-check-lg"></i>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          handleShowAlert(tm, 'Deseja realmente desativar a equipe?', handleAlertResponseToSetTeamState);
                        }}
                        variant="danger"
                        size="sm"
                      >
                        <i className="bi bi-x-lg"></i>
                      </Button>
                    )}

                    <Button
                      onClick={() => {
                        handleShowAlert(tm, 'Deseja realmente excluir a equipe?', handleAlertResponseDeleteTeam);
                      }}
                      variant="outline-danger"
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </div>
                </th>
                <Modal show={showAlert.open === tm.uid} onHide={handleCloseAlert}>
                  <ConfirmationModal
                    handleFunctionAlertResponse={showAlert.handleFunctionAlertResponse}
                    uid={tm.uid}
                    state={tm.isActive}
                    alertText={showAlert.text}
                  />
                </Modal>
                <Modal show={show.open === tm.uid} onHide={handleClose}>
                  <TeamsForms func={show.function} data={tm} action='update' handleClose={handleClose} />
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
