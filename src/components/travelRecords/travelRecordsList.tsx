import { useEffect, useState } from "react";
import "../../styles/position.scss";
import "../../styles/travelRecords.scss";
import { Button, Modal } from "react-bootstrap";
import ConfirmationModal from "../shared/confirmationModal";

import TravelRecordsForms from "./travelRecordsForms";
import { TravelRecordsServices } from "../../services/TravelRecordsServices";
import { TeamsServices } from "../../services/TeamsServices";
import { LocationsServices } from "../../services/LocationsServices";
import { TravelRecords } from '../../types/TravelRecords';
import moment from 'moment';


type Props = {
    refreshComponent: boolean;
    setRefreshComponent: Function;
}

type TravelRecordsArray = {
    arr: TravelRecords[];
}

const TravelRecordsList = ({ refreshComponent, setRefreshComponent }: Props) => {
    const travelRecordsServices = new TravelRecordsServices();
    const teamsServices = new TeamsServices();
    const locationsServices = new LocationsServices();

    const [show, setShow] = useState({ open: '', function: "" });
    const [travelRecords, setTravelRecords] = useState<TravelRecordsArray>({ arr: [] });
    const [showAlert, setShowAlert] = useState({ open: '', text: '', handleFunctionAlertResponse: Function });

    useEffect(() => {
        async function getAllTravelRecords() {
            try {
                const responsefirebase = await travelRecordsServices.getAllTravelRecords('YTgh3NZ82IikUEnJBr9F');
                // eslint-disable-next-line
                const responsefirebaseteamsServices = await teamsServices.getAllTeamsSimple('YTgh3NZ82IikUEnJBr9F');
                // eslint-disable-next-line
                const locationsServicesteamsServices = await locationsServices.getAllLocations('YTgh3NZ82IikUEnJBr9F');

                const tr = responsefirebase as TravelRecords[];
                setTravelRecords({ arr: tr });
            } catch (err: any) {
                console.log(err.message);
            }
        }
        getAllTravelRecords();
        // eslint-disable-next-line    
    }, [show, refreshComponent]);

    const handleClose = () => setShow({ open: '', function: "" });
    const handleShow = (e: any) => {
        setShow({ open: e.uid, function: "ATUALIZAR DADOS DA VIAGEM" });
    };

    const handleCloseAlert = () => {
        setShowAlert({ open: '', text: '', handleFunctionAlertResponse: Function });
        setRefreshComponent(!refreshComponent);
    };

    const handleShowAlert = (tr: TravelRecords, text: string, handleFunctionAlertResponse: any) => {
        setShowAlert({ open: tr.uid ? tr.uid : '', text, handleFunctionAlertResponse });
    };


    const handleAlertResponseDeleteTravelRecord = async (res: boolean, uid: string, state: boolean) => {
        if (res) {
            try {
                await travelRecordsServices.deleteTravelRecords(uid);
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
                        <th scope="col">Local</th>
                        <th scope="col">Datas</th>
                        <th scope="col">Nome da Equipe</th>
                        <th scope="col">Funcionários</th>
                    </tr>
                </thead>
                <tbody className="fontWeightTH">
                    {travelRecords.arr.map((tr, index) => {
                        return (
                            <tr key={tr.uid}>
                                <th scope="row">{index + 1}</th>
                                <th>
                                    <ul className="inlineList multipla">
                                        <li>{tr.locationData?.city} - {tr.locationData?.state}</li>
                                        <li>{tr.locationData?.country}</li>
                                    </ul>
                                </th>
                                <th>
                                    <p>{`Ida: ${moment(tr.departureDate).format("DD/MM/YYYY")}`} </p>
                                    <p>{`Volta: ${moment(tr.arrivalDate).format("DD/MM/YYYY")}`}</p>
                                </th>
                                <th>{tr.teamData?.nameTeams}</th>
                                <th>
                                    <ul className="inlineList multipla">
                                        {tr.travelEmployeesUsers?.map((it, indexVl) =>
                                            <li key={indexVl}>
                                                 <center>{ it.simpleName ?  it.simpleName : it.fullName }<br/>{`(${it.positionData?.namePosition? it.positionData?.namePosition: 'Cargo não definido'})`}</center>
                                                <hr/>
                                            </li>
                                        )}
                                    </ul>
                                </th>

                                <th>
                                    <div className="buttons">
                                        <Button
                                            onClick={() => {
                                                handleShow(tr);
                                            }}
                                            variant="warning"
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </Button>

                                        <Button
                                            onClick={() => {
                                                handleShowAlert(tr, 'Deseja realmente excluir o registro de viagem?', handleAlertResponseDeleteTravelRecord);
                                            }}
                                            variant="outline-danger"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </div>
                                </th>
                                <Modal show={showAlert.open === tr.uid} onHide={handleCloseAlert}>
                                    <ConfirmationModal
                                        handleFunctionAlertResponse={showAlert.handleFunctionAlertResponse}
                                        uid={tr.uid}
                                        state={false}
                                        alertText={showAlert.text}
                                    />
                                </Modal>
                                <Modal show={show.open === tr.uid} onHide={handleClose}>
                                    <TravelRecordsForms func={show.function} data={tr} action='update' handleClose={handleClose} />
                                </Modal>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default TravelRecordsList;
