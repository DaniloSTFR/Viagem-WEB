import { Sidebar } from "../components/Sidebar";
import { useAuth } from '../hooks/useAuth';
import { useEffect } from "react";

export function Home() {
    const { user } = useAuth();

    useEffect(() => {
        const checkUser = async () => {
            console.log(user);
        }
        checkUser();
    }, []);

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