import { Positions } from '../types/Positions';
// eslint-disable-next-line
import { firebaseApp, auth, database } from './firebase';
// eslint-disable-next-line
import { addDoc, collection, doc, deleteDoc,  getDocs, getDoc, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";

export class PositionsServices {

    private positionsCollectionRef = collection(database, "Positions");

    async createPositions({ namePosition, descriptionPosition, isAdmPosition, company}: Positions) {
        const newPositions = await addDoc(this.positionsCollectionRef, {
          namePosition,
          descriptionPosition,
          isAdmPosition,
          company: company ? company : 'YTgh3NZ82IikUEnJBr9F',
          uid: ''
        });
        await this.updateUidPositions(newPositions.id);

        return newPositions.id;
    }

    async setIsAdmPosition(uid: string, isAdmPosition: boolean) {
        const docRef = doc(this.positionsCollectionRef, uid);
        await updateDoc(docRef, {isAdmPosition: isAdmPosition});
      }

    async findPositionsByUid(uid: string) {
        const docRef = doc(this.positionsCollectionRef, uid)
        const docSnap = await getDoc(docRef);
        const positions = docSnap.data() as Positions;
        return positions;
    }

    async getAllPositions(company: string){
        let data: Positions[] = [];

        (await getDocs(query(this.positionsCollectionRef, where('company', '==', company)))).forEach((docs: any) => {
          data.push(docs.data() as Positions);
        });
        return data;
    }

    //Necessario para inserir o uid na coleção, refatorado
    private async updateUidPositions(uid: string) {
      const docRef = doc(this.positionsCollectionRef, uid);
      await updateDoc(docRef, {uid});
    }
    
    //Precisa de correção dos parametros de insert de acordo com o banco
    async updatePositions(uid: string, position: Positions) {
        const docRef = doc(this.positionsCollectionRef, uid);
        await updateDoc(docRef, position);
    }

    async deletePositions(uid: string) {
      const docRef = doc(this.positionsCollectionRef, uid);
      await deleteDoc(docRef);
    }

}
