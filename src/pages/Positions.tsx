import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import PositionsList from "../components/positions/positionsList";
import { Button, Modal } from "react-bootstrap";
import PositionsForms from "../components/positions/positionsForms";

export function Positions() {
  const [show, setShow] = useState({ open: false, function: "" });

  const handleClose = () => {setShow({ open: false, function: "" }); 
                             setRefreshComponent(!refreshComponent);};
  const handleShow = () => setShow({ open: true, function: "NOVO CARGO" });
  const [data, setData] = useState<any>({});
  const [refreshComponent, setRefreshComponent] = useState(false);

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
              Adicionar Cargo
            </Button>
          </div>

          <Modal centered show={show.open} onHide={handleClose}>
            <PositionsForms func={show.function} data={data} action='new' handleClose={handleClose}/>
          </Modal>

          <PositionsList refreshComponent = {refreshComponent}/>
        </div>
      </main>
    </div>
  );
}
