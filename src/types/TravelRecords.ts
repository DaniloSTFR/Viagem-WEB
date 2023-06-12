
import { Users } from './Users';

export type TravelRecords = {
    uid?: string,
    location: string, 
    team: string, 
    travelEmployeesUsers?: Users[],
    travelEmployees: string[];
    arrivalDate: Date,
    departureDate: Date,
}