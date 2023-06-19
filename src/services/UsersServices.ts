import { Users } from '../types/Users';
// eslint-disable-next-line
import { firebaseApp, auth, database } from '../services/firebase';
// eslint-disable-next-line
import { User, createUserWithEmailAndPassword } from "firebase/auth";
// eslint-disable-next-line
import { addDoc, collection, doc, deleteDoc, Firestore, getDocs, getDoc, getFirestore, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { PositionsServices } from "./PositionsServices";

export class UsersServices {

    private usersCollectionRef = collection(database, "Users");
    private positionsServices =  new PositionsServices();

    async createUser({ email, password, cpf, fullName, isAdmin, isActive, position, teams, company }: Users) {
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
            company: company ? company : 'YTgh3NZ82IikUEnJBr9F',
            uid: newUser.user.uid
        }); // TODO: pegar o valor do companies do banco

        return newUser.user.uid;
    }

    async isActive(uid: string, isActive: boolean) {
        const docRef = doc(this.usersCollectionRef, uid);
        await updateDoc(docRef, {isActive: isActive});
    }

    async findUserByUid(uid: string) {
        const docRef = doc(this.usersCollectionRef, uid)
        const docSnap = await getDoc(docRef);
        const user = docSnap.data() as Users;
        const simpleName = user.fullName.split(" ");
        user.simpleName = `${simpleName[0]} ${simpleName[simpleName.length-1]}`;

        if(user.position!==''){
            user.positionData = await this.positionsServices.findPositionsByUid(user.position);
        }
        return user;
    }

    async getAllUser(company: string){
        let data: Users[] = [];

        (await getDocs(query(this.usersCollectionRef, where('company', '==', company)))).forEach(async (docs: any) => {
            const user = docs.data() as Users;
            if(user.position!==''){
                user.positionData = await this.positionsServices.findPositionsByUid(user.position);
            }
          data.push(user);
        });
        return data;
    }

    //Precisa de correção dos parametros de insert de acordo com o banco
    async updateUser(uid: string, user: Users) {
        const docRef = doc(this.usersCollectionRef, uid);
        await updateDoc(docRef, user);
      }

    async findUserbyCPFOrEmail(User: string) {

    }
}
