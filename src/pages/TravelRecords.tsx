import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import TravelRecordsList from "../components/travelRecords/travelRecordsList";
import { Button, Modal } from "react-bootstrap";
import TravelRecordsForms from "../components/travelRecords/travelRecordsForms";

export function TravelRecords() {
  const [show, setShow] = useState({ open: false, function: "" });

  const handleClose = () => {setShow({ open: false, function: "" }); 
                             setRefreshComponent(!refreshComponent);};
  const handleShow = () => setShow({ open: true, function: "NOVO REGISTRO DE VIAGEM" });
  const [refreshComponent, setRefreshComponent] = useState(false);
  let data:any;

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
              Adicionar no registro de Viagem
            </Button>
          </div>

          <Modal centered show={show.open} onHide={handleClose}>
            <TravelRecordsForms func={show.function} data={data} action='new' handleClose={handleClose}/>
          </Modal>

          <TravelRecordsList refreshComponent = {refreshComponent} setRefreshComponent ={setRefreshComponent}/>
        </div>
      </main>
    </div>
  );
}
