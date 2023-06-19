import { TravelRecords } from '../types/TravelRecords';
import { Users } from '../types/Users';
import { UsersServices } from './UsersServices';
import { TeamsServices } from './TeamsServices';
import { LocationsServices } from './LocationsServices';
import { ConvertDate } from '../utils/ConvertDate';

// eslint-disable-next-line
import { firebaseApp, auth, database } from './firebase';
// eslint-disable-next-line
import { addDoc, collection, doc, deleteDoc, Timestamp, getDocs, getDoc, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";

export class TravelRecordsServices {

    private travelRecordsCollectionRef = collection(database, "TravelRecords");
    private usersServices =  new UsersServices();
    private teamsServices =  new TeamsServices();
    private locationsServices =  new LocationsServices();
    private convertDate =  new ConvertDate();

    async createTravelRecords({ location, team, travelEmployees, arrivalDate, departureDate, company = 'YTgh3NZ82IikUEnJBr9F' }: TravelRecords) {
        const newTravelRecords = await addDoc(this.travelRecordsCollectionRef, {
          location,
          departureDate: Timestamp.fromDate(departureDate),
          arrivalDate: Timestamp.fromDate(arrivalDate),
          team: team ?  team  : '',
          travelEmployees,
          company:'YTgh3NZ82IikUEnJBr9F',
          uid: ''
        });
        await this.updateUidTravelRecords(newTravelRecords.id);

        return newTravelRecords.id;
    }

    async findTravelRecordsByUid(uid: string) {
        const docRef = doc(this.travelRecordsCollectionRef, uid)
        const docSnap = await getDoc(docRef);
        const travelRecords = docSnap.data() as TravelRecords;

        travelRecords.locationData = await this.locationsServices.findLocationsByUid(travelRecords.location);
        travelRecords.teamData = await this.teamsServices.findTeamsByUid(travelRecords.team);
        travelRecords.travelEmployeesUsers = await this.getUsersTravelArray(travelRecords.travelEmployees);

        return travelRecords;
    }

    private async getUsersTravelArray( travelEmployees:string[]){
      const dataArrUsers: Users[] = [];
      travelEmployees.forEach(async (employees: any) => { 
        const useremployees = await this.usersServices.findUserByUid(employees);
        dataArrUsers.push(useremployees);
      });

      return dataArrUsers;
    }

    async getAllTravelRecords(company: string){
        let data: TravelRecords[] = [];
      try {

        (await getDocs(query(this.travelRecordsCollectionRef, where('company', '==', company)))).forEach((docs: any) => {
          data.push(docs.data() as TravelRecords);
        });

        data.forEach(async (docs: any) => {
          docs.arrivalDate = docs.arrivalDate.toDate();
          docs.departureDate = docs.departureDate.toDate();

          docs.travelEmployeesUsers = await this.getUsersTravelArray(docs.travelEmployees);
          //docs.locationData = await this.locationsServices.getLocationWithUid(docs.location);
          //docs.teamData = await this.teamsServices.getTeamsUid(docs.team);
          docs.teamData = await this.teamsServices.findTeamsByUid(docs.team);
          docs.locationData = await this.locationsServices.findLocationsByUid(docs.location);

        });
      } catch (err: any) {
        console.log(err.message);
      }

        return data;
    }// TODO: corrigir as conversões de data

    //Necessario para inserir o uid na coleção, refatorado
    private async updateUidTravelRecords(uid: string) {
      const docRef = doc(this.travelRecordsCollectionRef, uid);
      await updateDoc(docRef, {uid});
    }
    
    //Precisa de correção dos parametros de insert de acordo com o banco
    async updateTravelRecords(uid: string = '' , travelRecords: TravelRecords) {
        const docRef = doc(this.travelRecordsCollectionRef, uid);
        await updateDoc(docRef, {
          location: travelRecords.location ,
          departureDate: Timestamp.fromDate(travelRecords.departureDate),
          arrivalDate: Timestamp.fromDate(travelRecords.arrivalDate),
          team: travelRecords.team ?  travelRecords.team : '',
          travelEmployees: travelRecords.travelEmployees,
          company:travelRecords.company,
          uid: uid,
        });
    }

    async deleteTravelRecords(uid: string) {
      const docRef = doc(this.travelRecordsCollectionRef, uid);
      await deleteDoc(docRef);
    }

}
