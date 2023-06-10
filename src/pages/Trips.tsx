import { Sidebar } from "../components/Sidebar";

export function Trips() {
    return(
        <div id="pages">
            <aside>
                <Sidebar/>
            </aside>
            <main className = "content">
                <h1>Aqui Viagens</h1>
            </main>
        </div>
    );

}