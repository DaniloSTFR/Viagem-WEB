import EmployeesForms from "../components/employees/employeesForms";
import EmployeesList from "../components/employees/employeesList";
import { Modal, Button } from "react-bootstrap";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";

export function Employees() {
  const [show, setShow] = useState({open: false, function: ''});

  const handleClose = () => setShow({open: false, function: ''});
  const handleShow = () => setShow({open: true, function: 'NOVO USUARIO'});
  return (
    <div id="pages">
      <aside>
        <Sidebar/>
      </aside>
      <main className="content">
        <div className="flex-column d-flex justify-content-end">

          <div className="d-grid gap-2 d-md-flex justify-content-md-start setmarginbottom">
              <Button
                type="button"
                className="btn btn-success btn-sm"
                onClick={handleShow}
              >
                Adicionar Funcionario
              </Button>
          </div>


          <Modal show={show.open} onHide={handleClose}>
            <EmployeesForms func={show.function} data={null}/>
          </Modal>

          <EmployeesList />
        </div>
      </main>
    </div>
  );
}
