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

    //Necessario para inserir o uid na coleção, refatorado
    private async updateUidTeams(uid: string) {
      const docRef = doc(this.teamsCollectionRef, uid);
      await updateDoc(docRef, {uid});
    }

    //Precisa de correção dos parametros de insert de acordo com o banco
    async updateTeams(uid: string, teams: Teams) {
        const docRef = doc(this.teamsCollectionRef, uid);
        await updateDoc(docRef, {
          nameTeams: teams.nameTeams,
          descriptionTeams: teams.descriptionTeams,
          teamEmployees: teams.teamEmployees.length > 0 ? teams.teamEmployees : [],
          company: teams.company ? teams.company : 'YTgh3NZ82IikUEnJBr9F',
          uid: uid
        });
    }

    async deleteTeams(uid: string) {
      const docRef = doc(this.teamsCollectionRef, uid);
      await deleteDoc(docRef);
    }

}
