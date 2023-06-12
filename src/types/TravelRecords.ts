
import { Users } from './Users';
import { Teams } from './Teams';

export type TravelRecords = {
    uid?: string,
    location: string, 
    team: Teams, 
    travelEmployeesUsers?: Users[],
    travelEmployees: string[];
    arrivalDate: Date,
    departureDate: Date,
}