import { Sidebar } from "../components/sidebar"

export function Positions() {
    return(
        <div id="pages">
            <aside>
                <Sidebar id = 'cargos' />
            </aside>
            <main className = "content">
                <h1>Aqui cargos</h1>
            </main>
        </div>
    );

}