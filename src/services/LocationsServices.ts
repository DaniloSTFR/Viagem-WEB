import { Locations } from '../types/Locations';
// eslint-disable-next-line
import { firebaseApp, auth, database } from './firebase';
// eslint-disable-next-line
import { addDoc, collection, doc, deleteDoc,  getDocs, getDoc, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";

export class LocationsServices {

    private locationsCollectionRef = collection(database, "Locations");

    async createLocations({ city, country, state }: Locations) {
        const newLocations = await addDoc(this.locationsCollectionRef, {
          city,
          country,
          state,
          company:'YTgh3NZ82IikUEnJBr9F',
          uid: ''
        });
        await this.updateUidLocations(newLocations.id);

        return newLocations.id;
    }

    async findLocationsByUid(uid: string) {
        const docRef = doc(this.locationsCollectionRef, uid)
        const docSnap = await getDoc(docRef);
        const locations = await docSnap.data() as Locations;
        return locations;
    }

    async getAllLocations(company: string){
        let data: Locations[] = [];

        (await getDocs(query(this.locationsCollectionRef, where('company', '==', company)))).forEach((docs: any) => {
          data.push(docs.data() as Locations);
        });
        return data;
    }

    async getLocationWithUid(uid: string){
      let data: Locations[] = [];

      (await getDocs(query(this.locationsCollectionRef, where('uid', '==', uid)))).forEach((docs: any) => {
        data.push(docs.data() as Locations);
      });
      return data[0];
  }

    //Necessario para inserir o uid na coleção, refatorado
    private async updateUidLocations(uid: string) {
      const docRef = doc(this.locationsCollectionRef, uid);
      await updateDoc(docRef, {uid});
    }
    
    //Precisa de correção dos parametros de insert de acordo com o banco
    async updateLocations(uid: string, location: Locations) {
        const docRef = doc(this.locationsCollectionRef, uid);
        await updateDoc(docRef, location);
    }

    async deleteLocations(uid: string) {
      const docRef = doc(this.locationsCollectionRef, uid);
      await deleteDoc(docRef);
    }

}
