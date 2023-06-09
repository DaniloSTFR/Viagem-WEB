import { Sidebar } from "../components/sidebar"
import { useEffect } from 'react';

export function Home() {

    useEffect(() => {
        const getUsers = async () => {
          console.log("Home process.env.REACT_APP_API_KEY");
          console.log(process.env.REACT_APP_API_KEY);
        };
        getUsers();
      }, []);

    return(
        <div id="pages">
            <aside>
                <Sidebar id = 'home' />
            </aside>
            <main className = "content">
                <h1>Aqui home</h1>
            </main>
        </div>
    );

}