import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebaseApp } from "../services/firebase";
import { useCookies } from 'react-cookie';

type User = {
  id: string;
  name: string;
  email: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  signInAction: (email: string, password: string) => Promise<boolean>;
}
interface tokenAuth {
  token: string;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();
  const [cookies, setCookie] = useCookies(['token']);
  const [cookiesUuid, setCookiesUuid] = useCookies(['uuidUser']);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }

        setUser({
          id: uid,
          name: displayName,
          email: photoURL
        })
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  async function signInWithGoogle() {
    //const provider = new firebaseApp.auth.GoogleAuthProvider();

    //const result = await auth.firebaseApp(provider);

    const result = {
      user:{
        uid: 'uuid080808080',
        photoURL: 'danilo-ferreira',
        displayName: 'a lenda de ang'
      }
    }

    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.');
      }

      setUser({
        id: uid,
        name: displayName,
        email: photoURL
      })
    }
  }

  const signInAction = async (usuario: string, password: string) => {

    const result = {
      user:{
        uuid: 'uuid080808080',
        nomeUsuario: 'danilo ferreira',
        displayName: 'a lenda de ang'
      }
    }

    if (usuario === 'danilo' && password === '123456') {
      const { displayName, nomeUsuario, uuid } = result.user

      if (!displayName || !nomeUsuario) {
        throw new Error('Missing information from Google Account.');
      }

      setUser({
        id: uuid,
        name: nomeUsuario,
        email: usuario
      })

      setCookiesUuid('uuidUser', uuid, { path: '/' });
      return true;
    }

    return false;
}

  
  
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInAction }}>
      {props.children}
    </AuthContext.Provider>
  );
}