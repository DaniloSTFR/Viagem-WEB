import { Sidebar } from "../components/sidebar"

export function Teams() {
    return(
        <div id="pages">
            <aside>
                <Sidebar id = 'equipes' />
            </aside>
            <main className = "content">
                <h1>Aqui Equipes</h1>
            </main>
        </div>
    );

}