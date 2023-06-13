
import { Users } from './Users';
import { Teams } from './Teams';
import { Locations } from './Locations';

export type TravelRecords = {
    uid?: string,
    location: string, 
    locationData?: Locations,
    team: string, 
    teamData?: Teams, 
    travelEmployeesUsers?: Users[],
    travelEmployees: string[];
    arrivalDate: Date,
    departureDate: Date,
    company?: ' YTgh3NZ82IikUEnJBr9F',
}