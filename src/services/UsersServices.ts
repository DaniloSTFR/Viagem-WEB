import { Users } from '../types/Users';
// eslint-disable-next-line
import { firebaseApp, auth, database } from '../services/firebase';
// eslint-disable-next-line
import { User, createUserWithEmailAndPassword } from "firebase/auth";
// eslint-disable-next-line
import { addDoc, collection, doc, DocumentReference, Firestore, getDocs, getDoc, getFirestore, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";

export class UsersServices {

    private usersCollectionRef = collection(database, "Users");

    async createUser({ email, password, cpf, fullName, isAdmin, isActive, position, teams, companies }: Users) {
        const defaultPass = String(cpf).slice(0, 8);
        const newUser = await createUserWithEmailAndPassword(auth, email, password ? password : defaultPass);

        await setDoc(doc(this.usersCollectionRef, newUser.user.uid), {
            cpf,
            email,
            fullName,
            isAdmin: isAdmin ? isAdmin : false,
            isActive: isActive,
            position: position ? position : '',
            teams: teams ? teams : '',
            companies: companies ? companies : 'YTgh3NZ82IikUEnJBr9F',
            uid: newUser.user.uid
        }); // TODO: pegar o valor do companies do banco

        return newUser.user.uid;
    }

    async isActive(uid: string, isActive: boolean) {
        const docRef = doc(this.usersCollectionRef, uid);
        await updateDoc(docRef, {isActive: isActive});
      }

    async findUserByUid(codUsersUid: string) {
        const docRef = doc(this.usersCollectionRef, codUsersUid)
        const docSnap = await getDoc(docRef);
        const user = docSnap.data() as Users;
        return user;
    }

    async getAllUser(company: string){
        let data: any[] = [];

        (await getDocs(query(this.usersCollectionRef, where('companies', '==', company)))).forEach((docs: any) => {
          data.push(docs.data() as Users);
        });
        return data;
    }

    async updateUser(id: string, user: Users) {
        const docRef = doc(this.usersCollectionRef, id);
        await updateDoc(docRef, user);
      }

    async findUserbyCPFOrEmail(User: string) {

    }
}
