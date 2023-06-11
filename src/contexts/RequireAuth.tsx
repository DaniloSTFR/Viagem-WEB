import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'
//import { Login } from "../../pages/Login";
//import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            console.log('RequireAuth');
            if (!auth.user) {
                console.log(auth.user);
                navigate('/');
            }else{
                setLoading(false);
            }
        }
        checkUser();
         // eslint-disable-next-line
    }, [children]);

    if (loading) return <p>Carregando...</p>;

    return <>{children}</>;
}