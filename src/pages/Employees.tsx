import { Sidebar } from "../components/sidebar"

export function Employees() {
    return(
        <div id="pages">
            <aside>
                <Sidebar id = 'funcionarios' />
            </aside>
            <main className = "content">
                <h1>Aqui funcionarios</h1>
            </main>
        </div>
    );

}