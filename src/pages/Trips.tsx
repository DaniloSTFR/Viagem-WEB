import { Sidebar } from "../components/sidebar"

export function Trips() {
    return(
        <div id="pages">
            <aside>
                <Sidebar id = 'viagens' />
            </aside>
            <main className = "content">
                <h1>Aqui Viagens</h1>
            </main>
        </div>
    );

}