import { createContext, ReactNode, useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { firebaseApp, auth, database } from '../services/firebase';
import { signInWithEmailAndPassword, User, signOut } from "firebase/auth";
import { collection, getDocs,} from "firebase/firestore";


type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  signInAction: (email: string, password: string) => Promise<boolean>;
  signOutAction: () => Promise<void>;
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
  const [cookiesUuid, setCookiesUuid] = useCookies(['uuidUser']);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        const { email, uid } = user

        if (!email || !uid) {
          throw new Error('Missing information from Google Account.');
        }

        setUser(user)
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

      setUser(user);
    }
  }

  const signInAction = async (usuario: string, password: string) => {

    const { user } = await signInWithEmailAndPassword(auth, usuario, password);
    console.log(user);

    if (user) {
      const { email, uid } = user;

      if (!uid || !email) {
        throw new Error('Missing information from Google Account.');
      }
      setUser(user);

      setCookiesUuid('uuidUser', uid, { path: '/' });
      return true;
    }

    return false;
}

async function signOutAction() {

  await signOut(auth).then(
    () => navigate('/login')
  )
  
}

  
  
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInAction, signOutAction }}>
      {props.children}
    </AuthContext.Provider>
  );
}