import EmployeesForms from "../components/employees/employeesForms";
import EmployeesList from "../components/employees/employeesList";
import { Sidebar } from "../components/sidebar"

export function Employees() {
    return (
        <div id="pages">
            <aside>
                <Sidebar id='funcionarios' />
            </aside>
            <main className="content">
                <div className="flex-column d-flex justify-content-end">
                    <button type="button" className="btn btn-success">Adicionar Funcionario</button>
                    <EmployeesList />
                </div>

            </main>
        </div>
    );

}