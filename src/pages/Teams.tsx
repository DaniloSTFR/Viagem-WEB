import { Button, Modal } from "react-bootstrap";
import { Sidebar } from "../components/Sidebar";
import TeamsList from "../components/teams/teamsList";
import TeamsForms from "../components/teams/teamsForms";
import { useState } from "react";

export function Teams() {
  const [show, setShow] = useState({ open: false, function: "" });

  const handleClose = () => {setShow({ open: false, function: "" }); 
                             setRefreshComponent(!refreshComponent);};
  const handleShow = () => setShow({ open: true, function: "NOVA EQUIPE" });
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
              Adicionar equipe
            </Button>
          </div>

          <Modal centered show={show.open} onHide={handleClose}>
            <TeamsForms func={show.function} data={data} action='new' handleClose={handleClose}/>
          </Modal>
          
          <TeamsList refreshComponent = {refreshComponent} setRefreshComponent ={setRefreshComponent}/>
        </div>
      </main>
    </div>
  );
}
