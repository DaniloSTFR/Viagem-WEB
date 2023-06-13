import { Company } from '../types/Company';
// eslint-disable-next-line
import { firebaseApp, auth, database } from './firebase';
// eslint-disable-next-line
import { addDoc, collection, doc, deleteDoc,  getDocs, getDoc, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";

export class CompanyServices {

    private companyCollectionRef = collection(database, "Company");

    async createCompany({ acronym, cnpj, size, social_name, createAt, updatedAt}: Company) {
        const newCompany = await addDoc(this.companyCollectionRef, {
            acronym, 
            cnpj, 
            size, 
            social_name,
            createAt, 
            updatedAt
        });

        return newCompany.id;
    }


    async findCompanyByUid(uid: string) {
        const docRef = doc(this.companyCollectionRef, uid)
        const docSnap = await getDoc(docRef);
        const company = docSnap.data() as Company;
        company.uid = docSnap.id;
        return company;
    }

    //Necessario para inserir o uid na coleção, refatorado
    private async updateUidCompany(uid: string) {
      const docRef = doc(this.companyCollectionRef, uid);
      await updateDoc(docRef, {uid});
    }
    
    //Precisa de correção dos parametros de insert de acordo com o banco
    async updateCompany(uid: string, company: Company) {
        const docRef = doc(this.companyCollectionRef, uid);
        await updateDoc(docRef, company);
    }

    async deleteCompany(uid: string) {
      const docRef = doc(this.companyCollectionRef, uid);
      await deleteDoc(docRef);
    }

}
