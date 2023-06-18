import { Button, Modal } from "react-bootstrap";
import { Sidebar } from "../components/Sidebar";
import TravelRecordsList from "../components/travelRecords/travelRecordsList";
import TravelRecorsForms from "../components/travelRecords/travelRecorsForms";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

export function TravelRecords() {
    const [show, setShow] = useState({ open: false, function: "" });

    const handleClose = () => {
        setShow({ open: false, function: "" });
        setRefreshComponent(!refreshComponent);
    };
    const handleShow = () => setShow({ open: true, function: "NOVO REGISTRO DE VIAGEM" });
    const [refreshComponent, setRefreshComponent] = useState(false);
    let data: any;

    return (
        <div id="pages">
            <aside>
                <Sidebar />
            </aside>
            <main className="content">
                <div className="flex-column d-flex justify-content-end">
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start setmarginbottom">
                        <Button
                            type="button"
                            className="btn btn-success btn-sm"
                            onClick={handleShow}
                        >
                            Adicionar um novo registro de viagem
                        </Button>
                    </div>

                    <Modal centered show={show.open} onHide={handleClose}>
                        <TravelRecorsForms func={show.function} data={data} action='new' handleClose={handleClose} />
                    </Modal>

                    <TravelRecordsList refreshComponent={refreshComponent} setRefreshComponent={setRefreshComponent} />
                </div>
            </main>
        </div >
    );
}