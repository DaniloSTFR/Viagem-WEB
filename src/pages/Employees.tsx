import EmployeesForms from "../components/employees/employeesForms";
import EmployeesList from "../components/employees/employeesList";
import { Modal, Button } from "react-bootstrap";
import { Sidebar } from "../components/sidebar";
import { useState } from "react";

export function Employees() {
  const [show, setShow] = useState({open: false, function: ''});

  const handleClose = () => setShow({open: false, function: ''});
  const handleShow = () => setShow({open: true, function: 'NOVO USUARIO'});
  return (
    <div id="pages">
      <aside>
        <Sidebar id="funcionarios" />
      </aside>
      <main className="content">
        <div className="flex-column d-flex justify-content-end">
          <Button
            type="button"
            className="btn btn-success"
            onClick={handleShow}
          >
            Adicionar Funcionario
          </Button>

          <Modal show={show.open} onHide={handleClose}>
            <EmployeesForms func={show.function} data={null}/>
          </Modal>

          <EmployeesList />
        </div>
      </main>
    </div>
  );
}
