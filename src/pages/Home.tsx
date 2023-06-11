import { Sidebar } from "../components/Sidebar";
import { useAuth } from '../hooks/useAuth';
// eslint-disable-next-line
import { useEffect } from "react";

export function Home() {
    // eslint-disable-next-line
    const { user } = useAuth();

/*     useEffect(() => {
        const checkUser = async () => {
            console.log(user);
        }
        checkUser();
    }, []); */

    return(
        <div id="pages">
            <aside>
                <Sidebar/>
            </aside>
            <main className = "content">
                <h1>Aqui home</h1>
            </main>
        </div>
    );

}