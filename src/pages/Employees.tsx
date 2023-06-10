import { Sidebar } from "../components/Sidebar";

export function Employees() {
    return(
        <div id="pages">
            <aside>
                <Sidebar/>
            </aside>
            <main className = "content">
                <h1>Aqui funcionarios</h1>
            </main>
        </div>
    );

}