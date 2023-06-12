import { Teams } from '../types/Teams';
import { Users } from '../types/Users';
import { UsersServices } from "../services/UsersServices"; 
// eslint-disable-next-line
import { firebaseApp, auth, database } from './firebase';
// eslint-disable-next-line
import { addDoc, collection, doc, deleteDoc,  getDocs, getDoc, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";

export class TeamsServices {

    private teamsCollectionRef = collection(database, "Teams");
    private usersServices =  new UsersServices();

    async createTeams({ nameTeams, descriptionTeams, teamEmployees=[], company}: Teams) {
        const newTeams = await addDoc(this.teamsCollectionRef, {
          nameTeams,
          descriptionTeams,
          teamEmployees: teamEmployees.length > 0 ? teamEmployees : [],
          company: company ? company : 'YTgh3NZ82IikUEnJBr9F',
          uid: ''
        });
        await this.updateUidTeams(newTeams.id);

        return newTeams.id;
    }

    async findTeamsByUid(uid: string) {
        const docRef = doc(this.teamsCollectionRef, uid)
        const docSnap = await getDoc(docRef);
        const teams = docSnap.data() as Teams;

        let dataArrUsers: Users[] = [];
        teams.teamEmployees.forEach(async (employees: any) => { 
          let useremployees = await this.usersServices.findUserByUid(employees);
          dataArrUsers.push(useremployees);
        });
        teams.teamEmployeesUsers = dataArrUsers;

        return teams as Teams;
    }

    async getAllTeams(company: string){
        let data: any[] = [];
      
        (await getDocs(query(this.teamsCollectionRef, where('company', '==', company)))).forEach((docs: any) => {
          data.push(docs.data() as any);
        });

        data.forEach( async (docs: any) => {
          let dataArrUsers: Users[] = [];
          docs.teamEmployees.forEach(async (employees: any) => { 
            let useremployees = await this.usersServices.findUserByUid(employees);
            dataArrUsers.push(useremployees);
          });
          docs.teamEmployeesUsers = dataArrUsers;
        });

        return data as Teams[];
    }

    private async updateUidTeams(uid: string) {
      const docRef = doc(this.teamsCollectionRef, uid);
      await updateDoc(docRef, {uid});
    }

    async updateTeams(uid: string, position: Teams) {
        const docRef = doc(this.teamsCollectionRef, uid);
        await updateDoc(docRef, position);
    }

    async deleteTeams(uid: string) {
      const docRef = doc(this.teamsCollectionRef, uid);
      await deleteDoc(docRef);
    }

}
