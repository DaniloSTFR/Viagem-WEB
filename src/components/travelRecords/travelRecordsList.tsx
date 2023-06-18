import { useEffect, useState } from "react";
//import "../../styles/position.scss";
import { Button, Modal } from "react-bootstrap";
import TravelRecorsForms from "./travelRecorsForms";
import ConfirmationModal from "../shared/confirmationModal";
import { TravelRecordsServices } from "../../services/TravelRecordsServices";
import { TravelRecords } from '../../types/TravelRecords';

type Props = {
    refreshComponent: boolean;
    setRefreshComponent: Function;
}

type TravelRecordsArray = {
    arr: TravelRecords[];
}

const TravelRecordsList = ({ refreshComponent, setRefreshComponent }: Props) => {
    const travelRecordsServices = new TravelRecordsServices();
    const [show, setShow] = useState({ open: '', function: "" });
    const [travelRecords, setTravelRecords] = useState<TravelRecordsArray>({ arr: [] });
    const [showAlert, setShowAlert] = useState({ open: '', text: '', handleFunctionAlertResponse: Function });

    useEffect(() => {
        async function getAllSetTravelRecords() {
            try {
                const responsefirebase = await travelRecordsServices.getAllTravelRecords('YTgh3NZ82IikUEnJBr9F');
                setTravelRecords({ arr: responsefirebase });
            } catch (err: any) {
                console.log(err.message);
            }
        }
        getAllSetTravelRecords();
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

    const handleShowAlert = (tm: TravelRecords, text: string, handleFunctionAlertResponse: any) => {
        setShowAlert({ open: tm.uid ? tm.uid : '', text, handleFunctionAlertResponse });
    };

    //REMOVE --->
    const handleAlertResponseToSetTeamState = async (res: boolean, uid: string, state: boolean) => {

        if (res) {
            try {
                //await travelRecordsServices.setIsActive(uid, !state);
            } catch (err: any) {
                console.log(err.message);
            }
        }
        handleCloseAlert();
    };//<--- REMOVE

    const handleAlertResponseDeleteTeam = async (res: boolean, uid: string, state: boolean) => {
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
                <tbody>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Local</th>
                        <th scope="col">Datas</th>
                        <td scope="col">Nome da Equipe</td>
                        <td scope="col">Funcionários</td>
                        <th>
                            <div className="buttons">
                            </div>
                        </th>
                    </tr>
                </tbody>
            </table>
        </>
    );
};
export default TravelRecordsList;