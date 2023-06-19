import EmployeesForms from "../components/employees/employeesForms";
import EmployeesList from "../components/employees/employeesList";
import { Modal, Button } from "react-bootstrap";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";

export function Employees() {
  const [show, setShow] = useState({ open: false, function: "" });
  const [refreshComponent, setRefreshComponent] = useState(false);

  const handleClose = () => {
    setShow({ open: false, function: "" });
    setRefreshComponent(!refreshComponent);
  };
  const handleShow = () => setShow({ open: true, function: "NOVO USUARIO" });
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
              Adicionar Funcionario
            </Button>
          </div>

          <Modal centered show={show.open} onHide={handleClose}>
            <EmployeesForms
              action="new"
              func={show.function}
              data={null}
              handleClose={handleClose}
              refreshComponent={refreshComponent}
              setRefreshComponent={setRefreshComponent}
            />
          </Modal>

          <EmployeesList
            refreshComponent={refreshComponent}
            setRefreshComponent={setRefreshComponent}
          />
        </div>
      </main>
    </div>
  );
}
